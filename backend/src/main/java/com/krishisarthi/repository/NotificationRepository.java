package com.krishisarthi.repository;

import com.krishisarthi.entity.Notification;
import com.krishisarthi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrderByCreatedAtDesc(User user);
    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);
    long countByUserAndIsReadFalse(User user);
    long countByUserIdAndIsReadFalse(Long userId);
}
