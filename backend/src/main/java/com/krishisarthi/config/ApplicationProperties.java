package com.krishisarthi.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "krishisarthi")
public class ApplicationProperties {

    private App app = new App();
    private Security security = new Security();
    private Integrations integrations = new Integrations();
    private Storage storage = new Storage();

    public App getApp() { return app; }
    public void setApp(App app) { this.app = app; }

    public Security getSecurity() { return security; }
    public void setSecurity(Security security) { this.security = security; }

    public Integrations getIntegrations() { return integrations; }
    public void setIntegrations(Integrations integrations) { this.integrations = integrations; }

    public Storage getStorage() { return storage; }
    public void setStorage(Storage storage) { this.storage = storage; }

    public static class App {
        private String name = "KrishiSarthi";
        private String version = "2.0.0";
        private String clientUrl = "http://localhost:5173";

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getVersion() { return version; }
        public void setVersion(String version) { this.version = version; }
        public String getClientUrl() { return clientUrl; }
        public void setClientUrl(String clientUrl) { this.clientUrl = clientUrl; }
    }

    public static class Security {
        private String jwtSecret = "farmlink_super_secret_jwt_key_2026_indian_agri_secure_key_at_least_256_bits_length";
        private long jwtExpirationMs = 604800000L;
        private String adminEmail = "admin@farmlink.in";
        private String adminPassword = "admin123";
        private String adminName = "Farmlink Admin Owner";

        public String getJwtSecret() { return jwtSecret; }
        public void setJwtSecret(String jwtSecret) { this.jwtSecret = jwtSecret; }
        public long getJwtExpirationMs() { return jwtExpirationMs; }
        public void setJwtExpirationMs(long jwtExpirationMs) { this.jwtExpirationMs = jwtExpirationMs; }
        public String getAdminEmail() { return adminEmail; }
        public void setAdminEmail(String adminEmail) { this.adminEmail = adminEmail; }
        public String getAdminPassword() { return adminPassword; }
        public void setAdminPassword(String adminPassword) { this.adminPassword = adminPassword; }
        public String getAdminName() { return adminName; }
        public void setAdminName(String adminName) { this.adminName = adminName; }
    }

    public static class Integrations {
        private Gemini gemini = new Gemini();
        private Razorpay razorpay = new Razorpay();
        private Weather weather = new Weather();
        private Sms sms = new Sms();

        public Gemini getGemini() { return gemini; }
        public void setGemini(Gemini gemini) { this.gemini = gemini; }
        public Razorpay getRazorpay() { return razorpay; }
        public void setRazorpay(Razorpay razorpay) { this.razorpay = razorpay; }
        public Weather getWeather() { return weather; }
        public void setWeather(Weather weather) { this.weather = weather; }
        public Sms getSms() { return sms; }
        public void setSms(Sms sms) { this.sms = sms; }

        public static class Gemini {
            private String apiKey = "";
            private String model = "gemini-2.5-flash";
            public String getApiKey() { return apiKey; }
            public void setApiKey(String apiKey) { this.apiKey = apiKey; }
            public String getModel() { return model; }
            public void setModel(String model) { this.model = model; }
        }

        public static class Razorpay {
            private String keyId = "rzp_test_farmlink_dummy_id";
            private String keySecret = "rzp_test_farmlink_dummy_secret";
            public String getKeyId() { return keyId; }
            public void setKeyId(String keyId) { this.keyId = keyId; }
            public String getKeySecret() { return keySecret; }
            public void setKeySecret(String keySecret) { this.keySecret = keySecret; }
        }

        public static class Weather {
            private String apiKey = "";
            public String getApiKey() { return apiKey; }
            public void setApiKey(String apiKey) { this.apiKey = apiKey; }
        }

        public static class Sms {
            private String fast2smsApiKey = "";
            private String twilioSid = "";
            private String twilioAuthToken = "";
            private String twilioPhone = "";
            public String getFast2smsApiKey() { return fast2smsApiKey; }
            public void setFast2smsApiKey(String fast2smsApiKey) { this.fast2smsApiKey = fast2smsApiKey; }
            public String getTwilioSid() { return twilioSid; }
            public void setTwilioSid(String twilioSid) { this.twilioSid = twilioSid; }
            public String getTwilioAuthToken() { return twilioAuthToken; }
            public void setTwilioAuthToken(String twilioAuthToken) { this.twilioAuthToken = twilioAuthToken; }
            public String getTwilioPhone() { return twilioPhone; }
            public void setTwilioPhone(String twilioPhone) { this.twilioPhone = twilioPhone; }
        }
    }

    public static class Storage {
        private String uploadDir = "uploads";
        public String getUploadDir() { return uploadDir; }
        public void setUploadDir(String uploadDir) { this.uploadDir = uploadDir; }
    }
}
