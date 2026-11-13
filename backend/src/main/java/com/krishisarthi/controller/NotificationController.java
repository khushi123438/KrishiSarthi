package com.krishisarthi.controller;

import com.krishisarthi.dto.NotificationDtos.NotificationListResponse;
import com.krishisarthi.security.SecurityUtils;
import com.krishisarthi.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/notifications")
@Tag(name = "Notifications", description = "In-app alerts and notifications drawer")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    @Operation(summary = "Get user notifications and unread count")
    public ResponseEntity<NotificationListResponse> getNotifications() {
        Long userId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(notificationService.getUserNotifications(userId));
    }

    @PostMapping("/{notification_id}/read")
    @Operation(summary = "Mark specific notification as read")
    public ResponseEntity<Map<String, Object>> markAsRead(@PathVariable("notification_id") Long notificationId) {
        Long userId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        notificationService.markAsRead(userId, notificationId);
        return ResponseEntity.ok(Map.of("status", "success"));
    }
}
