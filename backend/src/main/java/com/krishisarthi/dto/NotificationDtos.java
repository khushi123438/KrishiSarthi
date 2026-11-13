package com.krishisarthi.dto;

import java.util.List;

public class NotificationDtos {

    public static class NotificationListResponse {
        private long unread_count;
        private List<NotificationItemDto> notifications;

        public NotificationListResponse(long unread_count, List<NotificationItemDto> notifications) {
            this.unread_count = unread_count;
            this.notifications = notifications;
        }

        public long getUnread_count() { return unread_count; }
        public void setUnread_count(long unread_count) { this.unread_count = unread_count; }
        public List<NotificationItemDto> getNotifications() { return notifications; }
        public void setNotifications(List<NotificationItemDto> notifications) { this.notifications = notifications; }
    }

    public static class NotificationItemDto {
        private Long id;
        private String title;
        private String message;
        private String type;
        private Boolean is_read;
        private String created_at;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public Boolean getIs_read() { return is_read; }
        public void setIs_read(Boolean is_read) { this.is_read = is_read; }
        public String getCreated_at() { return created_at; }
        public void setCreated_at(String created_at) { this.created_at = created_at; }
    }
}
