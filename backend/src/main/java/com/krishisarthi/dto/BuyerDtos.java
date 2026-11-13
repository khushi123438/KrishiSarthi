package com.krishisarthi.dto;

import java.util.List;

public class BuyerDtos {

    public static class MakeOfferRequest {
        private Long crop_listing_id;
        private Double offered_price_per_unit;
        private Double offered_quantity;
        private String note;

        public Long getCrop_listing_id() { return crop_listing_id; }
        public void setCrop_listing_id(Long crop_listing_id) { this.crop_listing_id = crop_listing_id; }
        public Double getOffered_price_per_unit() { return offered_price_per_unit; }
        public void setOffered_price_per_unit(Double offered_price_per_unit) { this.offered_price_per_unit = offered_price_per_unit; }
        public Double getOffered_quantity() { return offered_quantity; }
        public void setOffered_quantity(Double offered_quantity) { this.offered_quantity = offered_quantity; }
        public String getNote() { return note; }
        public void setNote(String note) { this.note = note; }
    }

    public static class MarketplaceItemResponse {
        private Long id;
        private String crop_name;
        private String variety;
        private Double quantity;
        private String unit;
        private Double expected_price;
        private String quality_grade;
        private String location_district;
        private String location_state;
        private String description;
        private String primary_image;
        private List<String> images;
        private Long farmer_id;
        private String farmer_name;
        private Boolean is_farmer_verified;
        private Double farmer_rating;
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
        public String getLocation_district() { return location_district; }
        public void setLocation_district(String location_district) { this.location_district = location_district; }
        public String getLocation_state() { return location_state; }
        public void setLocation_state(String location_state) { this.location_state = location_state; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getPrimary_image() { return primary_image; }
        public void setPrimary_image(String primary_image) { this.primary_image = primary_image; }
        public List<String> getImages() { return images; }
        public void setImages(List<String> images) { this.images = images; }
        public Long getFarmer_id() { return farmer_id; }
        public void setFarmer_id(Long farmer_id) { this.farmer_id = farmer_id; }
        public String getFarmer_name() { return farmer_name; }
        public void setFarmer_name(String farmer_name) { this.farmer_name = farmer_name; }
        public Boolean getIs_farmer_verified() { return is_farmer_verified; }
        public void setIs_farmer_verified(Boolean is_farmer_verified) { this.is_farmer_verified = is_farmer_verified; }
        public Double getFarmer_rating() { return farmer_rating; }
        public void setFarmer_rating(Double farmer_rating) { this.farmer_rating = farmer_rating; }
        public String getBatch_code() { return batch_code; }
        public void setBatch_code(String batch_code) { this.batch_code = batch_code; }
        public String getCreated_at() { return created_at; }
        public void setCreated_at(String created_at) { this.created_at = created_at; }
    }

    public static class BuyerOrderResponse {
        private Long id;
        private String order_number;
        private String crop_name;
        private String farmer_name;
        private String buyer_name;
        private Double quantity;
        private String unit;
        private Double price_per_unit;
        private Double total_amount;
        private String status;
        private String payment_status;
        private String shipment_status;
        private String shipment_code;
        private String created_at;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getOrder_number() { return order_number; }
        public void setOrder_number(String order_number) { this.order_number = order_number; }
        public String getCrop_name() { return crop_name; }
        public void setCrop_name(String crop_name) { this.crop_name = crop_name; }
        public String getFarmer_name() { return farmer_name; }
        public void setFarmer_name(String farmer_name) { this.farmer_name = farmer_name; }
        public String getBuyer_name() { return buyer_name; }
        public void setBuyer_name(String buyer_name) { this.buyer_name = buyer_name; }
        public Double getQuantity() { return quantity; }
        public void setQuantity(Double quantity) { this.quantity = quantity; }
        public String getUnit() { return unit; }
        public void setUnit(String unit) { this.unit = unit; }
        public Double getPrice_per_unit() { return price_per_unit; }
        public void setPrice_per_unit(Double price_per_unit) { this.price_per_unit = price_per_unit; }
        public Double getTotalAmount() { return total_amount; }
        public void setTotalAmount(Double total_amount) { this.total_amount = total_amount; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getPayment_status() { return payment_status; }
        public void setPayment_status(String payment_status) { this.payment_status = payment_status; }
        public String getShipment_status() { return shipment_status; }
        public void setShipment_status(String shipment_status) { this.shipment_status = shipment_status; }
        public String getShipment_code() { return shipment_code; }
        public void setShipment_code(String shipment_code) { this.shipment_code = shipment_code; }
        public String getCreated_at() { return created_at; }
        public void setCreated_at(String created_at) { this.created_at = created_at; }
    }

    public static class ReviewRequest {
        private Long order_id;
        private Long reviewee_id;
        private Integer rating;
        private String comment;

        public Long getOrder_id() { return order_id; }
        public void setOrder_id(Long order_id) { this.order_id = order_id; }
        public Long getReviewee_id() { return reviewee_id; }
        public void setReviewee_id(Long reviewee_id) { this.reviewee_id = reviewee_id; }
        public Integer getRating() { return rating; }
        public void setRating(Integer rating) { this.rating = rating; }
        public String getComment() { return comment; }
        public void setComment(String comment) { this.comment = comment; }
    }
}
