package com.krishisarthi.service;

import com.krishisarthi.dto.AuthDtos.*;
import com.krishisarthi.entity.*;
import com.krishisarthi.exception.BadRequestException;
import com.krishisarthi.exception.ResourceNotFoundException;
import com.krishisarthi.exception.UnauthorizedException;
import com.krishisarthi.repository.*;
import com.krishisarthi.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final FarmerProfileRepository farmerProfileRepository;
    private final BuyerProfileRepository buyerProfileRepository;
    private final TransporterProfileRepository transporterProfileRepository;
    private final KYCRecordRepository kycRecordRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final OtpService otpService;

    public AuthService(UserRepository userRepository,
                       FarmerProfileRepository farmerProfileRepository,
                       BuyerProfileRepository buyerProfileRepository,
                       TransporterProfileRepository transporterProfileRepository,
                       KYCRecordRepository kycRecordRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider,
                       OtpService otpService) {
        this.userRepository = userRepository;
        this.farmerProfileRepository = farmerProfileRepository;
        this.buyerProfileRepository = buyerProfileRepository;
        this.transporterProfileRepository = transporterProfileRepository;
        this.kycRecordRepository = kycRecordRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.otpService = otpService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if ("admin".equalsIgnoreCase(request.getRole())) {
            throw new BadRequestException("Admin registration is not permitted via public registration.");
        }

        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new BadRequestException("Email is already registered. Please login.");
        }

        if (userRepository.existsByMobile(request.getMobile().trim())) {
            throw new BadRequestException("Mobile number is already registered. Please login.");
        }

        UserRole role = UserRole.fromString(request.getRole());
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getFull_name().trim(),
                request.getEmail().trim().toLowerCase(),
                request.getMobile().trim(),
                encodedPassword,
                role
        );
        user.setPreferredLanguage(request.getPreferred_language() != null ? request.getPreferred_language() : "hi");
        user.setIsActive(true);
        user.setIsVerified(false);
        user = userRepository.save(user);

        // Create specific profile
        if (role == UserRole.FARMER) {
            FarmerProfile fp = new FarmerProfile();
            fp.setUser(user);
            fp.setVillage(request.getVillage_or_city());
            fp.setDistrict(request.getDistrict());
            fp.setState(request.getState());
            farmerProfileRepository.save(fp);
        } else if (role == UserRole.BUYER) {
            BuyerProfile bp = new BuyerProfile();
            bp.setUser(user);
            bp.setCompanyName(request.getAgency_or_company());
            bp.setCity(request.getVillage_or_city());
            bp.setState(request.getState());
            buyerProfileRepository.save(bp);
        } else if (role == UserRole.TRANSPORTER) {
            TransporterProfile tp = new TransporterProfile();
            tp.setUser(user);
            tp.setAgencyName(request.getAgency_or_company());
            tp.setVehicleType(request.getVehicle_type());
            transporterProfileRepository.save(tp);
        }

        String token = tokenProvider.generateTokenForUser(user.getId(), user.getRole().name(), user.getEmail(), user.getFullName());
        return new AuthResponse(token, user.getRole().name(), user.getId(), user.getFullName());
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String identifier = request.getUsername().trim();
        User user = userRepository.findByEmail(identifier.toLowerCase())
                .or(() -> userRepository.findByMobile(identifier))
                .orElseThrow(() -> new UnauthorizedException("Invalid username, mobile, or password."));

        if (!Boolean.TRUE.equals(user.getIsActive())) {
            throw new UnauthorizedException("Account has been suspended by administration. Contact support.");
        }

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getHashedPassword());
        if (!passwordMatches) {
            // Check legacy PBKDF2 salt$hash fallback
            if (user.getHashedPassword().contains("$")) {
                passwordMatches = verifyLegacyPassword(request.getPassword(), user.getHashedPassword());
            }
        }

        if (!passwordMatches) {
            throw new UnauthorizedException("Invalid username, mobile, or password.");
        }

        String token = tokenProvider.generateTokenForUser(user.getId(), user.getRole().name(), user.getEmail(), user.getFullName());
        return new AuthResponse(token, user.getRole().name(), user.getId(), user.getFullName());
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getCurrentUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        UserProfileResponse res = new UserProfileResponse();
        res.setId(user.getId());
        res.setFull_name(user.getFullName());
        res.setEmail(user.getEmail());
        res.setMobile(user.getMobile());
        res.setRole(user.getRole().name().toLowerCase());
        res.setPreferred_language(user.getPreferredLanguage());
        res.setIs_active(user.getIsActive());
        res.setIs_verified(user.getIsVerified());

        Map<String, Object> profileData = new HashMap<>();
        if (user.getRole() == UserRole.FARMER) {
            farmerProfileRepository.findByUser(user).ifPresent(fp -> {
                profileData.put("village", fp.getVillage());
                profileData.put("district", fp.getDistrict());
                profileData.put("state", fp.getState());
                profileData.put("rating", fp.getRating());
                profileData.put("sales_count", fp.getTotalSalesCount());
            });
        } else if (user.getRole() == UserRole.BUYER) {
            buyerProfileRepository.findByUser(user).ifPresent(bp -> {
                profileData.put("company_name", bp.getCompanyName());
                profileData.put("city", bp.getCity());
                profileData.put("state", bp.getState());
                profileData.put("rating", bp.getRating());
                profileData.put("purchases_count", bp.getTotalPurchasesCount());
            });
        } else if (user.getRole() == UserRole.TRANSPORTER) {
            transporterProfileRepository.findByUser(user).ifPresent(tp -> {
                profileData.put("agency_name", tp.getAgencyName());
                profileData.put("vehicle_type", tp.getVehicleType());
                profileData.put("vehicle_number", tp.getVehicleNumber());
                profileData.put("rating", tp.getRating());
                profileData.put("deliveries_count", tp.getTotalDeliveriesCount());
            });
        }
        res.setProfile(profileData);
        return res;
    }

    public Map<String, Object> requestPasswordReset(String identifier) {
        User user = userRepository.findByEmail(identifier.trim().toLowerCase())
                .or(() -> userRepository.findByMobile(identifier.trim()))
                .orElseThrow(() -> new ResourceNotFoundException("No user found with mobile or email: " + identifier));

        String otp = otpService.generateOtp(identifier.trim());
        return otpService.sendOtp(identifier.trim(), otp, user.getFullName());
    }

    @Transactional
    public Map<String, Object> resetPassword(ResetPasswordRequest request) {
        String identifier = request.getMobile_or_email().trim();
        boolean validOtp = otpService.verifyOtp(identifier, request.getOtp());
        if (!validOtp) {
            throw new BadRequestException("Invalid or expired OTP. Please request a new one.");
        }

        User user = userRepository.findByEmail(identifier.toLowerCase())
                .or(() -> userRepository.findByMobile(identifier))
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + identifier));

        user.setHashedPassword(passwordEncoder.encode(request.getNew_password()));
        userRepository.save(user);

        Map<String, Object> res = new HashMap<>();
        res.put("status", "success");
        res.put("message", "Password has been successfully reset! You can now login.");
        return res;
    }

    @Transactional
    public Map<String, Object> submitKyc(Long userId, String documentType, String documentNumber, String documentImageUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        KYCRecord record = new KYCRecord(user, documentType, documentNumber, documentImageUrl);
        record.setStatus(KYCStatus.PENDING);
        kycRecordRepository.save(record);

        Map<String, Object> res = new HashMap<>();
        res.put("status", "success");
        res.put("message", "KYC documents submitted successfully. Admin review is pending.");
        return res;
    }

    private boolean verifyLegacyPassword(String plainPassword, String stored) {
        try {
            String[] parts = stored.split("\\$", 2);
            if (parts.length != 2) return false;
            String salt = parts[0];
            String originalHash = parts[1];

            javax.crypto.SecretKeyFactory skf = javax.crypto.SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            javax.crypto.spec.PBEKeySpec spec = new javax.crypto.spec.PBEKeySpec(plainPassword.toCharArray(), salt.getBytes(java.nio.charset.StandardCharsets.UTF_8), 100000, 256);
            byte[] hash = skf.generateSecret(spec).getEncoded();
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString().equals(originalHash);
        } catch (Exception e) {
            return false;
        }
    }
}
