package com.krishisarthi.service;

import com.krishisarthi.config.ApplicationProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private static final Logger logger = LoggerFactory.getLogger(OtpService.class);

    private final ApplicationProperties properties;
    private final JavaMailSender mailSender;
    private final RestTemplate restTemplate = new RestTemplate();

    private final Map<String, OtpEntry> otpStore = new ConcurrentHashMap<>();

    public OtpService(ApplicationProperties properties, JavaMailSender mailSender) {
        this.properties = properties;
        this.mailSender = mailSender;
    }

    public static class OtpEntry {
        private final String otp;
        private final LocalDateTime expiresAt;

        public OtpEntry(String otp, LocalDateTime expiresAt) {
            this.otp = otp;
            this.expiresAt = expiresAt;
        }

        public String getOtp() { return otp; }
        public LocalDateTime getExpiresAt() { return expiresAt; }
    }

    public String generateOtp(String identity) {
        String otp = String.format("%06d", new Random().nextInt(1000000));
        otpStore.put(identity, new OtpEntry(otp, LocalDateTime.now().plusMinutes(5)));
        return otp;
    }

    public boolean verifyOtp(String identity, String userOtp) {
        OtpEntry entry = otpStore.get(identity);
        if (entry == null) return false;

        if (LocalDateTime.now().isAfter(entry.getExpiresAt())) {
            otpStore.remove(identity);
            return false;
        }

        if (entry.getOtp().equals(userOtp.trim())) {
            otpStore.remove(identity);
            return true;
        }

        return false;
    }

    public Map<String, Object> sendOtp(String identity, String otp, String fullName) {
        boolean isEmail = identity.contains("@");
        boolean smsSent = false;
        boolean emailSent = false;
        String apiError = "";

        // 1. Fast2SMS Indian SMS Gateway
        String fast2smsKey = properties.getIntegrations().getSms().getFast2smsApiKey();
        if (!isEmail && fast2smsKey != null && !fast2smsKey.isBlank()) {
            try {
                String url = "https://www.fast2sms.com/dev/bulkV2";
                HttpHeaders headers = new HttpHeaders();
                headers.set("authorization", fast2smsKey);
                headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

                MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
                map.add("message", "Your KrishiSarthi OTP code is " + otp + ". Valid for 5 mins.");
                map.add("language", "english");
                map.add("route", "q");
                map.add("numbers", identity.replace("+91", "").trim());

                HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
                ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
                if (response.getStatusCode() == HttpStatus.OK && Boolean.TRUE.equals(response.getBody().get("return"))) {
                    smsSent = true;
                    logger.info("[Fast2SMS] Delivered OTP to: {}", identity);
                } else {
                    apiError = "Fast2SMS requires wallet recharge.";
                }
            } catch (Exception e) {
                apiError = e.getMessage();
                logger.warn("[Fast2SMS Exception] {}", e.getMessage());
            }
        }

        // 2. SMTP Email OTP
        if (isEmail) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(identity);
                message.setSubject("KrishiSarthi Verification OTP: " + otp);
                message.setText("Namaste " + fullName + ",\n\n" +
                        "Aapka KrishiSarthi OTP code hai: " + otp + "\n" +
                        "Yeh code 5 minute tak valid hai.\n\n" +
                        "Dhanyavaad,\nKrishiSarthi Team");
                mailSender.send(message);
                emailSent = true;
                logger.info("[SMTP Email] Delivered OTP to: {}", identity);
            } catch (Exception e) {
                logger.warn("[SMTP Email] {}", e.getMessage());
            }
        }

        String statusMsg = "Real OTP generated.";
        if (smsSent) {
            statusMsg = "Real SMS OTP sent to mobile phone!";
        } else if (emailSent) {
            statusMsg = "Real Email OTP sent to inbox!";
        } else if (!apiError.isBlank()) {
            statusMsg = "OTP generated. Gateway Note: " + apiError;
        }

        Map<String, Object> result = new HashMap<>();
        result.put("status", "success");
        result.put("message", statusMsg);
        result.put("is_real_delivered", (smsSent || emailSent));
        result.put("api_error", apiError);
        result.put("otp_demo", otp);
        return result;
    }
}
