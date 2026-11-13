package com.krishisarthi.controller;

import com.krishisarthi.dto.AdminDtos.*;
import com.krishisarthi.exception.ApiResponse;
import com.krishisarthi.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@Tag(name = "Admin Operations", description = "Platform Owner Dashboard, User Management, KYC & Audit Trail")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/dashboard")
    @Operation(summary = "Get aggregated platform metrics: Total Farmers, Buyers, Transporters, Listings, GMV, and 2% Revenue")
    public ResponseEntity<DashboardMetricsResponse> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboardMetrics());
    }

    @GetMapping("/users")
    @Operation(summary = "Get all users registered on the platform with optional role filter")
    public ResponseEntity<List<UserAdminResponse>> getUsers(@RequestParam(value = "role", required = false) String role) {
        return ResponseEntity.ok(adminService.getAllUsers(role));
    }

    @PostMapping("/users/{user_id}/verify")
    @Operation(summary = "Set user KYC verification status (verified true/false)")
    public ResponseEntity<Map<String, Object>> toggleVerify(
            @PathVariable("user_id") Long userId,
            @RequestParam(value = "verify", defaultValue = "true") boolean verify
    ) {
        adminService.toggleUserVerification(userId, verify);
        return ResponseEntity.ok(Map.of("message", "User verification status set to: " + verify));
    }

    @PostMapping("/users/{user_id}/status")
    @Operation(summary = "Activate or suspend user account")
    public ResponseEntity<Map<String, Object>> toggleStatus(
            @PathVariable("user_id") Long userId,
            @RequestParam(value = "is_active", defaultValue = "true") boolean isActive
    ) {
        adminService.toggleUserActiveStatus(userId, isActive);
        return ResponseEntity.ok(Map.of("message", "User active status set to: " + isActive));
    }

    @GetMapping("/kyc")
    @Operation(summary = "Get KYC verification documents queue")
    public ResponseEntity<List<KYCQueueItemResponse>> getKycQueue() {
        return ResponseEntity.ok(adminService.getKycQueue());
    }

    @PostMapping("/kyc/{kyc_id}/review")
    @Operation(summary = "Approve or Reject KYC document verification")
    public ResponseEntity<Map<String, Object>> reviewKyc(
            @PathVariable("kyc_id") Long kycId,
            @RequestBody KYCReviewRequest request
    ) {
        adminService.reviewKyc(kycId, request);
        return ResponseEntity.ok(Map.of("message", "KYC " + (Boolean.TRUE.equals(request.getApprove()) ? "Approved" : "Rejected") + " successfully."));
    }

    @GetMapping("/disputes")
    @Operation(summary = "Get all reported disputes")
    public ResponseEntity<List<DisputeResponse>> getDisputes() {
        return ResponseEntity.ok(adminService.getDisputes());
    }

    @PostMapping("/disputes/{dispute_id}/resolve")
    @Operation(summary = "Resolve dispute with resolution notes")
    public ResponseEntity<Map<String, Object>> resolveDispute(
            @PathVariable("dispute_id") Long disputeId,
            @RequestBody ResolveDisputeRequest request
    ) {
        adminService.resolveDispute(disputeId, request);
        return ResponseEntity.ok(Map.of("message", "Dispute resolved successfully."));
    }

    @GetMapping("/audit-logs")
    @Operation(summary = "Get system audit logging trail")
    public ResponseEntity<List<AuditLogResponse>> getAuditLogs() {
        return ResponseEntity.ok(adminService.getAuditLogs());
    }
}
