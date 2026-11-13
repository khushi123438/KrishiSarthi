package com.krishisarthi.controller;

import com.krishisarthi.dto.AuthDtos.*;
import com.krishisarthi.security.SecurityUtils;
import com.krishisarthi.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication", description = "User registration, login, profile, and password reset APIs")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new Farmer, Buyer, or Transporter")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Login using JSON payload")
    public ResponseEntity<AuthResponse> loginJson(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @Operation(summary = "Login using Form-Data / OAuth2 standard")
    public ResponseEntity<AuthResponse> loginForm(@RequestParam("username") String username,
                                                  @RequestParam("password") String password) {
        LoginRequest req = new LoginRequest();
        req.setUsername(username);
        req.setPassword(password);
        return ResponseEntity.ok(authService.login(req));
    }

    @PostMapping(value = "/login", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Login using Multipart Form-Data")
    public ResponseEntity<AuthResponse> loginMultipart(@RequestParam("username") String username,
                                                       @RequestParam("password") String password) {
        LoginRequest req = new LoginRequest();
        req.setUsername(username);
        req.setPassword(password);
        return ResponseEntity.ok(authService.login(req));
    }

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user profile")
    public ResponseEntity<UserProfileResponse> getCurrentUser() {
        Long userId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized: Authentication token required"));
        return ResponseEntity.ok(authService.getCurrentUserProfile(userId));
    }

    @PostMapping("/forgot-password-request")
    @Operation(summary = "Dispatch OTP for password reset via Fast2SMS / Twilio or SMTP")
    public ResponseEntity<Map<String, Object>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        return ResponseEntity.ok(authService.requestPasswordReset(request.getMobile_or_email()));
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Verify OTP and reset account password")
    public ResponseEntity<Map<String, Object>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        return ResponseEntity.ok(authService.resetPassword(request));
    }

    @PostMapping("/kyc")
    @Operation(summary = "Submit KYC verification document (Aadhaar, GST, RC, Driving License)")
    public ResponseEntity<Map<String, Object>> submitKyc(@RequestParam("document_type") String documentType,
                                                         @RequestParam("document_number") String documentNumber,
                                                         @RequestParam(value = "document_image_url", required = false) String documentImageUrl) {
        Long userId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(authService.submitKyc(userId, documentType, documentNumber, documentImageUrl));
    }
}
