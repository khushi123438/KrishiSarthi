package com.krishisarthi.dto;

import java.util.List;

public class FarmerDtos {

    public static class CropListingRequest {
        private String crop_name;
        private String variety;
        private Double quantity;
        private String unit = "kg";
        private Double expected_price_per_unit;
        private String quality_grade = "Grade A";
        private String location_district;
        private String location_state;
        private String description;

        public String getCrop_name() { return crop_name; }
        public void setCrop_name(String crop_name) { this.crop_name = crop_name; }
        public String getVariety() { return variety; }
        public void setVariety(String variety) { this.variety = variety; }
        public Double getQuantity() { return quantity; }
        public void setQuantity(Double quantity) { this.quantity = quantity; }
        public String getUnit() { return unit; }
        public void setUnit(String unit) { this.unit = unit; }
        public Double getExpected_price_per_unit() { return expected_price_per_unit; }
        public void setExpected_price_per_unit(Double expected_price_per_unit) { this.expected_price_per_unit = expected_price_per_unit; }
        public String getQuality_grade() { return quality_grade; }
        public void setQuality_grade(String quality_grade) { this.quality_grade = quality_grade; }
        public String getLocation_district() { return location_district; }
        public void setLocation_district(String location_district) { this.location_district = location_district; }
        public String getLocation_state() { return location_state; }
        public void setLocation_state(String location_state) { this.location_state = location_state; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    public static class CropListingResponse {
        private Long id;
        private String crop_name;
        private String variety;
        private Double quantity;
        private String unit;
        private Double expected_price;
        private String quality_grade;
        private String location;
        private String status;
        private List<String> images;
        private int offers_count;
        private String batch_code;
        private String created_at;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getCrop_name() { return crop_name; }
        public void setCrop_name(String crop_name) { this.crop_name = crop_name; }
        public String getVariety() { return variety; }
        public void setVariety(String variety) { this.variety = variety; }
        public Double getQuantity() { return quantity; }
        public void setQuantity(Double quantity) { this.quantity = quantity; }
        public String getUnit() { return unit; }
        public void setUnit(String unit) { this.unit = unit; }
        public Double getExpected_price() { return expected_price; }
        public void setExpected_price(Double expected_price) { this.expected_price = expected_price; }
        public String getQuality_grade() { return quality_grade; }
        public void setQuality_grade(String quality_grade) { this.quality_grade = quality_grade; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public List<String> getImages() { return images; }
        public void setImages(List<String> images) { this.images = images; }
        public int getOffers_count() { return offers_count; }
        public void setOffers_count(int offers_count) { this.offers_count = offers_count; }
        public String getBatch_code() { return batch_code; }
        public void setBatch_code(String batch_code) { this.batch_code = batch_code; }
        public String getCreated_at() { return created_at; }
        public void setCreated_at(String created_at) { this.created_at = created_at; }
    }

    public static class OfferActionRequest {
        private String action; // ACCEPT, COUNTER, REJECT
        private Double counter_price;
        private String note;

        public String getAction() { return action; }
        public void setAction(String action) { this.action = action; }
        public Double getCounter_price() { return counter_price; }
        public void setCounter_price(Double counter_price) { this.counter_price = counter_price; }
        public String getNote() { return note; }
        public void setNote(String note) { this.note = note; }
    }

    public static class FarmerOfferResponse {
        private Long id;
        private Long crop_listing_id;
        private String crop_name;
        private String buyer_name;
        private Double offered_price;
        private Double offered_quantity;
        private Double total_amount;
        private String status;
        private Boolean last_action_by_me;
        private List<NegotiationItem> negotiations;
        private String created_at;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getCrop_listing_id() { return crop_listing_id; }
        public void setCrop_listing_id(Long crop_listing_id) { this.crop_listing_id = crop_listing_id; }
        public String getCrop_name() { return crop_name; }
        public void setCrop_name(String crop_name) { this.crop_name = crop_name; }
        public String getBuyer_name() { return buyer_name; }
        public void setBuyer_name(String buyer_name) { this.buyer_name = buyer_name; }
        public Double getOffered_price() { return offered_price; }
        public void setOffered_price(Double offered_price) { this.offered_price = offered_price; }
        public Double getOffered_quantity() { return offered_quantity; }
        public void setOffered_quantity(Double offered_quantity) { this.offered_quantity = offered_quantity; }
        public Double getTotalAmount() { return total_amount; }
        public void setTotalAmount(Double total_amount) { this.total_amount = total_amount; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public Boolean getLast_action_by_me() { return last_action_by_me; }
        public void setLast_action_by_me(Boolean last_action_by_me) { this.last_action_by_me = last_action_by_me; }
        public List<NegotiationItem> getNegotiations() { return negotiations; }
        public void setNegotiations(List<NegotiationItem> negotiations) { this.negotiations = negotiations; }
        public String getCreated_at() { return created_at; }
        public void setCreated_at(String created_at) { this.created_at = created_at; }
    }

    public static class NegotiationItem {
        private Long id;
        private String sender;
        private Double price;
        private String action;
        private String message;
        private String created_at;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getSender() { return sender; }
        public void setSender(String sender) { this.sender = sender; }
        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }
        public String getAction() { return action; }
        public void setAction(String action) { this.action = action; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public String getCreated_at() { return created_at; }
        public void setCreated_at(String created_at) { this.created_at = created_at; }
    }
}
