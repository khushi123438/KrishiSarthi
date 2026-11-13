package com.krishisarthi.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDtos {

    public static class RegisterRequest {
        @NotBlank(message = "Full name is required")
        private String full_name;

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Mobile number is required")
        private String mobile;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;

        @NotBlank(message = "Role is required (farmer, buyer, transporter)")
        private String role;

        private String preferred_language = "hi";
        private String village_or_city;
        private String district;
        private String state;
        private String agency_or_company;
        private String vehicle_type;

        public String getFull_name() { return full_name; }
        public void setFull_name(String full_name) { this.full_name = full_name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getMobile() { return mobile; }
        public void setMobile(String mobile) { this.mobile = mobile; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getPreferred_language() { return preferred_language; }
        public void setPreferred_language(String preferred_language) { this.preferred_language = preferred_language; }
        public String getVillage_or_city() { return village_or_city; }
        public void setVillage_or_city(String village_or_city) { this.village_or_city = village_or_city; }
        public String getDistrict() { return district; }
        public void setDistrict(String district) { this.district = district; }
        public String getState() { return state; }
        public void setState(String state) { this.state = state; }
        public String getAgency_or_company() { return agency_or_company; }
        public void setAgency_or_company(String agency_or_company) { this.agency_or_company = agency_or_company; }
        public String getVehicle_type() { return vehicle_type; }
        public void setVehicle_type(String vehicle_type) { this.vehicle_type = vehicle_type; }
    }

    public static class LoginRequest {
        @NotBlank(message = "Username/email/mobile is required")
        private String username;

        @NotBlank(message = "Password is required")
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class AuthResponse {
        private String access_token;
        private String token_type = "bearer";
        private String role;
        private Long user_id;
        private String full_name;

        public AuthResponse(String access_token, String role, Long user_id, String full_name) {
            this.access_token = access_token;
            this.role = role.toLowerCase();
            this.user_id = user_id;
            this.full_name = full_name;
        }

        public String getAccess_token() { return access_token; }
        public String getToken_type() { return token_type; }
        public String getRole() { return role; }
        public Long getUser_id() { return user_id; }
        public String getFull_name() { return full_name; }
    }

    public static class UserProfileResponse {
        private Long id;
        private String full_name;
        private String email;
        private String mobile;
        private String role;
        private String preferred_language;
        private Boolean is_active;
        private Boolean is_verified;
        private Object profile;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getFull_name() { return full_name; }
        public void setFull_name(String full_name) { this.full_name = full_name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getMobile() { return mobile; }
        public void setMobile(String mobile) { this.mobile = mobile; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getPreferred_language() { return preferred_language; }
        public void setPreferred_language(String preferred_language) { this.preferred_language = preferred_language; }
        public Boolean getIs_active() { return is_active; }
        public void setIs_active(Boolean is_active) { this.is_active = is_active; }
        public Boolean getIs_verified() { return is_verified; }
        public void setIs_verified(Boolean is_verified) { this.is_verified = is_verified; }
        public Object getProfile() { return profile; }
        public void setProfile(Object profile) { this.profile = profile; }
    }

    public static class ForgotPasswordRequest {
        @NotBlank(message = "Mobile or email is required")
        private String mobile_or_email;

        public String getMobile_or_email() { return mobile_or_email; }
        public void setMobile_or_email(String mobile_or_email) { this.mobile_or_email = mobile_or_email; }
    }

    public static class ResetPasswordRequest {
        @NotBlank(message = "Mobile or email is required")
        private String mobile_or_email;

        @NotBlank(message = "OTP code is required")
        private String otp;

        @NotBlank(message = "New password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String new_password;

        public String getMobile_or_email() { return mobile_or_email; }
        public void setMobile_or_email(String mobile_or_email) { this.mobile_or_email = mobile_or_email; }
        public String getOtp() { return otp; }
        public void setOtp(String otp) { this.otp = otp; }
        public String getNew_password() { return new_password; }
        public void setNew_password(String new_password) { this.new_password = new_password; }
    }
}
