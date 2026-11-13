package com.krishisarthi.service;

import com.krishisarthi.dto.NotificationDtos.*;
import com.krishisarthi.entity.Notification;
import com.krishisarthi.entity.User;
import com.krishisarthi.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Transactional(readOnly = true)
    public NotificationListResponse getUserNotifications(Long userId) {
        List<Notification> notifs = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
        long unreadCount = notificationRepository.countByUserIdAndIsReadFalse(userId);

        List<NotificationItemDto> items = new ArrayList<>();
        for (Notification n : notifs) {
            NotificationItemDto item = new NotificationItemDto();
            item.setId(n.getId());
            item.setTitle(n.getTitle());
            item.setMessage(n.getMessage());
            item.setType(n.getType());
            item.setIs_read(n.getIsRead());
            item.setCreated_at(n.getCreatedAt().format(formatter));
            items.add(item);
        }

        return new NotificationListResponse(unreadCount, items);
    }

    @Transactional
    public void markAsRead(Long userId, Long notificationId) {
        notificationRepository.findById(notificationId).ifPresent(n -> {
            if (n.getUser().getId().equals(userId)) {
                n.setIsRead(true);
                notificationRepository.save(n);
            }
        });
    }

    @Transactional
    public Notification createNotification(User user, String title, String message, String type) {
        Notification notif = new Notification(user, title, message, type);
        return notificationRepository.save(notif);
    }
}
