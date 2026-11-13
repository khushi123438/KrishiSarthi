package com.krishisarthi.dto;

public class AdminDtos {

    public static class DashboardMetricsResponse {
        private long farmers_count;
        private long buyers_count;
        private long transporters_count;
        private long active_listings;
        private long active_orders;
        private long completed_orders;
        private long pending_kyc;
        private long pending_disputes;
        private double gmv;
        private double revenue;

        public long getFarmers_count() { return farmers_count; }
        public void setFarmers_count(long farmers_count) { this.farmers_count = farmers_count; }
        public long getBuyers_count() { return buyers_count; }
        public void setBuyers_count(long buyers_count) { this.buyers_count = buyers_count; }
        public long getTransporters_count() { return transporters_count; }
        public void setTransporters_count(long transporters_count) { this.transporters_count = transporters_count; }
        public long getActive_listings() { return active_listings; }
        public void setActive_listings(long active_listings) { this.active_listings = active_listings; }
        public long getActive_orders() { return active_orders; }
        public void setActive_orders(long active_orders) { this.active_orders = active_orders; }
        public long getCompleted_orders() { return completed_orders; }
        public void setCompleted_orders(long completed_orders) { this.completed_orders = completed_orders; }
        public long getPending_kyc() { return pending_kyc; }
        public void setPending_kyc(long pending_kyc) { this.pending_kyc = pending_kyc; }
        public long getPending_disputes() { return pending_disputes; }
        public void setPending_disputes(long pending_disputes) { this.pending_disputes = pending_disputes; }
        public double getGmv() { return gmv; }
        public void setGmv(double gmv) { this.gmv = gmv; }
        public double getRevenue() { return revenue; }
        public void setRevenue(double revenue) { this.revenue = revenue; }
    }

    public static class UserAdminResponse {
        private Long id;
        private String full_name;
        private String email;
        private String mobile;
        private String role;
        private Boolean is_verified;
        private Boolean is_active;
        private String created_at;

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
        public Boolean getIs_verified() { return is_verified; }
        public void setIs_verified(Boolean is_verified) { this.is_verified = is_verified; }
        public Boolean getIs_active() { return is_active; }
        public void setIs_active(Boolean is_active) { this.is_active = is_active; }
        public String getCreated_at() { return created_at; }
        public void setCreated_at(String created_at) { this.created_at = created_at; }
    }

    public static class KYCReviewRequest {
        private Boolean approve;
        private String reason;

        public Boolean getApprove() { return approve; }
        public void setApprove(Boolean approve) { this.approve = approve; }
        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
    }

    public static class KYCQueueItemResponse {
        private Long id;
        private Long user_id;
        private String user_name;
        private String user_role;
        private String document_type;
        private String document_number;
        private String document_image_url;
        private String status;
        private String created_at;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getUser_id() { return user_id; }
        public void setUser_id(Long user_id) { this.user_id = user_id; }
        public String getUser_name() { return user_name; }
        public void setUser_name(String user_name) { this.user_name = user_name; }
        public String getUser_role() { return user_role; }
        public void setUser_role(String user_role) { this.user_role = user_role; }
        public String getDocument_type() { return document_type; }
        public void setDocument_type(String document_type) { this.document_type = document_type; }
        public String getDocument_number() { return document_number; }
        public void setDocument_number(String document_number) { this.document_number = document_number; }
        public String getDocument_image_url() { return document_image_url; }
        public void setDocument_image_url(String document_image_url) { this.document_image_url = document_image_url; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getCreated_at() { return created_at; }
        public void setCreated_at(String created_at) { this.created_at = created_at; }
    }

    public static class ResolveDisputeRequest {
        private String status;
        private String resolution_notes;

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getResolution_notes() { return resolution_notes; }
        public void setResolution_notes(String resolution_notes) { this.resolution_notes = resolution_notes; }
    }

    public static class DisputeResponse {
        private Long id;
        private String dispute_number;
        private String order_number;
        private String raised_by;
        private String reason;
        private String description;
        private String status;
        private String resolution_notes;
        private String created_at;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getDispute_number() { return dispute_number; }
        public void setDispute_number(String dispute_number) { this.dispute_number = dispute_number; }
        public String getOrder_number() { return order_number; }
        public void setOrder_number(String order_number) { this.order_number = order_number; }
        public String getRaised_by() { return raised_by; }
        public void setRaised_by(String raised_by) { this.raised_by = raised_by; }
        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getResolution_notes() { return resolution_notes; }
        public void setResolution_notes(String resolution_notes) { this.resolution_notes = resolution_notes; }
        public String getCreated_at() { return created_at; }
        public void setCreated_at(String created_at) { this.created_at = created_at; }
    }

    public static class AuditLogResponse {
        private Long id;
        private String user_name;
        private String action;
        private String entity_type;
        private Long entity_id;
        private String details;
        private String created_at;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getUser_name() { return user_name; }
        public void setUser_name(String user_name) { this.user_name = user_name; }
        public String getAction() { return action; }
        public void setAction(String action) { this.action = action; }
        public String getEntityType() { return entity_type; }
        public void setEntityType(String entity_type) { this.entity_type = entity_type; }
        public Long getEntityId() { return entity_id; }
        public void setEntityId(Long entity_id) { this.entity_id = entity_id; }
        public String getDetails() { return details; }
        public void setDetails(String details) { this.details = details; }
        public String getCreated_at() { return created_at; }
        public void setCreated_at(String created_at) { this.created_at = created_at; }
    }
}
