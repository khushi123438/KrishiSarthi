package com.krishisarthi.service;

import com.krishisarthi.dto.AdminDtos.*;
import com.krishisarthi.entity.*;
import com.krishisarthi.exception.BadRequestException;
import com.krishisarthi.exception.ResourceNotFoundException;
import com.krishisarthi.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final CropListingRepository cropListingRepository;
    private final OrderRepository orderRepository;
    private final KYCRecordRepository kycRecordRepository;
    private final DisputeRepository disputeRepository;
    private final AuditLogRepository auditLogRepository;
    private final NotificationRepository notificationRepository;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
    private final DateTimeFormatter auditFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public AdminService(UserRepository userRepository,
                        CropListingRepository cropListingRepository,
                        OrderRepository orderRepository,
                        KYCRecordRepository kycRecordRepository,
                        DisputeRepository disputeRepository,
                        AuditLogRepository auditLogRepository,
                        NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.cropListingRepository = cropListingRepository;
        this.orderRepository = orderRepository;
        this.kycRecordRepository = kycRecordRepository;
        this.disputeRepository = disputeRepository;
        this.auditLogRepository = auditLogRepository;
        this.notificationRepository = notificationRepository;
    }

    @Transactional(readOnly = true)
    public DashboardMetricsResponse getDashboardMetrics() {
        DashboardMetricsResponse res = new DashboardMetricsResponse();
        res.setFarmers_count(userRepository.countByRole(UserRole.FARMER));
        res.setBuyers_count(userRepository.countByRole(UserRole.BUYER));
        res.setTransporters_count(userRepository.countByRole(UserRole.TRANSPORTER));

        res.setActive_listings(cropListingRepository.countByStatus(CropListingStatus.PUBLISHED));

        res.setActive_orders(orderRepository.countByStatusIn(Arrays.asList(
                OrderStatus.CONFIRMED, OrderStatus.PAID, OrderStatus.TRANSPORT_ASSIGNED, OrderStatus.IN_TRANSIT
        )));
        res.setCompleted_orders(orderRepository.countByStatusIn(Arrays.asList(
                OrderStatus.DELIVERED, OrderStatus.COMPLETED
        )));

        res.setPending_kyc(kycRecordRepository.countByStatus(KYCStatus.PENDING));
        res.setPending_disputes(disputeRepository.countByStatusIn(Arrays.asList(
                DisputeStatus.OPEN, DisputeStatus.UNDER_REVIEW
        )));

        Double gmv = orderRepository.calculateGrossMerchandiseValue();
        if (gmv == null) gmv = 0.0;
        res.setGmv(Math.round(gmv * 100.0) / 100.0);
        res.setRevenue(Math.round(gmv * 0.02 * 100.0) / 100.0);

        return res;
    }

    @Transactional(readOnly = true)
    public List<UserAdminResponse> getAllUsers(String roleFilter) {
        List<User> users;
        if (roleFilter != null && !roleFilter.isBlank()) {
            UserRole role = UserRole.fromString(roleFilter);
            users = userRepository.findByRoleOrderByCreatedAtDesc(role);
        } else {
            users = userRepository.findAllByOrderByCreatedAtDesc();
        }

        List<UserAdminResponse> res = new ArrayList<>();
        for (User u : users) {
            UserAdminResponse dto = new UserAdminResponse();
            dto.setId(u.getId());
            dto.setFull_name(u.getFullName());
            dto.setEmail(u.getEmail());
            dto.setMobile(u.getMobile());
            dto.setRole(u.getRole().name().toLowerCase());
            dto.setIs_verified(Boolean.TRUE.equals(u.getIsVerified()));
            dto.setIs_active(Boolean.TRUE.equals(u.getIsActive()));
            dto.setCreated_at(u.getCreatedAt().format(formatter));
            res.add(dto);
        }
        return res;
    }

    @Transactional
    public void toggleUserVerification(Long userId, boolean verify) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        user.setIsVerified(verify);
        userRepository.save(user);
    }

    @Transactional
    public void toggleUserActiveStatus(Long userId, boolean isActive) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        if (user.getRole() == UserRole.ADMIN) {
            throw new BadRequestException("Cannot suspend Admin owner account.");
        }

        user.setIsActive(isActive);
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<KYCQueueItemResponse> getKycQueue() {
        List<KYCRecord> records = kycRecordRepository.findAllByOrderByCreatedAtDesc();
        List<KYCQueueItemResponse> res = new ArrayList<>();
        for (KYCRecord r : records) {
            KYCQueueItemResponse dto = new KYCQueueItemResponse();
            dto.setId(r.getId());
            dto.setUser_id(r.getUser().getId());
            dto.setUser_name(r.getUser().getFullName());
            dto.setUser_role(r.getUser().getRole().name());
            dto.setDocument_type(r.getDocumentType());
            dto.setDocument_number(r.getDocumentNumber());
            dto.setDocument_image_url(r.getDocumentImageUrl());
            dto.setStatus(r.getStatus().name());
            dto.setCreated_at(r.getCreatedAt().format(formatter));
            res.add(dto);
        }
        return res;
    }

    @Transactional
    public void reviewKyc(Long kycId, KYCReviewRequest request) {
        KYCRecord record = kycRecordRepository.findById(kycId)
                .orElseThrow(() -> new ResourceNotFoundException("KYC record not found: " + kycId));

        if (Boolean.TRUE.equals(request.getApprove())) {
            record.setStatus(KYCStatus.APPROVED);
            if (record.getUser() != null) {
                record.getUser().setIsVerified(true);
                userRepository.save(record.getUser());
            }
        } else {
            record.setStatus(KYCStatus.REJECTED);
            record.setRejectionReason(request.getReason() != null ? request.getReason() : "Document details could not be verified.");
        }

        record.setReviewedAt(LocalDateTime.now());
        kycRecordRepository.save(record);

        if (record.getUser() != null) {
            Notification notif = new Notification(
                    record.getUser(),
                    "🆔 KYC Status Update",
                    "Aapka KYC " + (Boolean.TRUE.equals(request.getApprove()) ? "Swikaar (Approved)" : "Aswikaar (Rejected)") + " ho gaya hai.",
                    "kyc"
            );
            notificationRepository.save(notif);
        }
    }

    @Transactional(readOnly = true)
    public List<DisputeResponse> getDisputes() {
        List<Dispute> disputes = disputeRepository.findAllByOrderByCreatedAtDesc();
        List<DisputeResponse> res = new ArrayList<>();
        for (Dispute d : disputes) {
            DisputeResponse dto = new DisputeResponse();
            dto.setId(d.getId());
            dto.setDispute_number(d.getDisputeNumber());
            dto.setOrder_number(d.getOrder() != null ? d.getOrder().getOrderNumber() : "N/A");
            dto.setRaised_by(d.getRaisedBy() != null ? d.getRaisedBy().getFullName() : "User");
            dto.setReason(d.getReason());
            dto.setDescription(d.getDescription());
            dto.setStatus(d.getStatus().name());
            dto.setResolution_notes(d.getResolutionNotes());
            dto.setCreated_at(d.getCreatedAt().format(formatter));
            res.add(dto);
        }
        return res;
    }

    @Transactional
    public void resolveDispute(Long disputeId, ResolveDisputeRequest request) {
        Dispute dispute = disputeRepository.findById(disputeId)
                .orElseThrow(() -> new ResourceNotFoundException("Dispute not found: " + disputeId));

        try {
            dispute.setStatus(DisputeStatus.valueOf(request.getStatus().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid dispute status: " + request.getStatus());
        }

        dispute.setResolutionNotes(request.getResolution_notes());
        dispute.setResolvedAt(LocalDateTime.now());
        disputeRepository.save(dispute);
    }

    @Transactional(readOnly = true)
    public List<AuditLogResponse> getAuditLogs() {
        List<AuditLog> logs = auditLogRepository.findTop100ByOrderByCreatedAtDesc();
        List<AuditLogResponse> res = new ArrayList<>();
        for (AuditLog l : logs) {
            AuditLogResponse dto = new AuditLogResponse();
            dto.setId(l.getId());
            dto.setUser_name(l.getUser() != null ? l.getUser().getFullName() : "System");
            dto.setAction(l.getAction());
            dto.setEntityType(l.getEntityType());
            dto.setEntityId(l.getEntityId());
            dto.setDetails(l.getDetails());
            dto.setCreated_at(l.getCreatedAt().format(auditFormatter));
            res.add(dto);
        }
        return res;
    }
}
