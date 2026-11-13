package com.krishisarthi.dto;

import java.util.List;

public class TransporterDtos {

    public static class DirectTransportRequest {
        private String pickup_location;
        private String delivery_location;
        private String crop_type;
        private Double quantity_kg;
        private String preferred_vehicle = "Truck / PickUp";
        private String note;

        public String getPickup_location() { return pickup_location; }
        public void setPickup_location(String pickup_location) { this.pickup_location = pickup_location; }
        public String getDelivery_location() { return delivery_location; }
        public void setDelivery_location(String delivery_location) { this.delivery_location = delivery_location; }
        public String getCrop_type() { return crop_type; }
        public void setCrop_type(String crop_type) { this.crop_type = crop_type; }
        public Double getQuantity_kg() { return quantity_kg; }
        public void setQuantity_kg(Double quantity_kg) { this.quantity_kg = quantity_kg; }
        public String getPreferred_vehicle() { return preferred_vehicle; }
        public void setPreferred_vehicle(String preferred_vehicle) { this.preferred_vehicle = preferred_vehicle; }
        public String getNote() { return note; }
        public void setNote(String note) { this.note = note; }
    }

    public static class TransportRequestResponse {
        private Long id;
        private String order_number;
        private String crop_type;
        private Double quantity_kg;
        private String pickup_location;
        private String delivery_location;
        private String pickup_date;
        private String preferred_vehicle;
        private String status;
        private int bids_count;
        private String created_at;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getOrder_number() { return order_number; }
        public void setOrder_number(String order_number) { this.order_number = order_number; }
        public String getCrop_type() { return crop_type; }
        public void setCrop_type(String crop_type) { this.crop_type = crop_type; }
        public Double getQuantity_kg() { return quantity_kg; }
        public void setQuantity_kg(Double quantity_kg) { this.quantity_kg = quantity_kg; }
        public String getPickup_location() { return pickup_location; }
        public void setPickup_location(String pickup_location) { this.pickup_location = pickup_location; }
        public String getDelivery_location() { return delivery_location; }
        public void setDelivery_location(String delivery_location) { this.delivery_location = delivery_location; }
        public String getPickup_date() { return pickup_date; }
        public void setPickup_date(String pickup_date) { this.pickup_date = pickup_date; }
        public String getPreferred_vehicle() { return preferred_vehicle; }
        public void setPreferred_vehicle(String preferred_vehicle) { this.preferred_vehicle = preferred_vehicle; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public int getBids_count() { return bids_count; }
        public void setBids_count(int bids_count) { this.bids_count = bids_count; }
        public String getCreated_at() { return created_at; }
        public void setCreated_at(String created_at) { this.created_at = created_at; }
    }

    public static class SubmitBidRequest {
        private Long transport_request_id;
        private Double bid_amount;
        private String vehicle_details;
        private Integer estimated_delivery_hours = 24;
        private String note;

        public Long getTransport_request_id() { return transport_request_id; }
        public void setTransport_request_id(Long transport_request_id) { this.transport_request_id = transport_request_id; }
        public Double getBid_amount() { return bid_amount; }
        public void setBid_amount(Double bid_amount) { this.bid_amount = bid_amount; }
        public String getVehicle_details() { return vehicle_details; }
        public void setVehicle_details(String vehicle_details) { this.vehicle_details = vehicle_details; }
        public Integer getEstimated_delivery_hours() { return estimated_delivery_hours; }
        public void setEstimated_delivery_hours(Integer estimated_delivery_hours) { this.estimated_delivery_hours = estimated_delivery_hours; }
        public String getNote() { return note; }
        public void setNote(String note) { this.note = note; }
    }

    public static class UpdateStatusRequest {
        private String status;
        private String location;
        private String notes;
        private Double latitude;
        private Double longitude;

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
        public Double getLatitude() { return latitude; }
        public void setLatitude(Double latitude) { this.latitude = latitude; }
        public Double getLongitude() { return longitude; }
        public void setLongitude(Double longitude) { this.longitude = longitude; }
    }

    public static class ShipmentResponse {
        private Long id;
        private String shipment_code;
        private String order_number;
        private String current_status;
        private String pickup_location;
        private String delivery_location;
        private String crop_type;
        private String transporter_name;
        private Double current_lat;
        private Double current_lng;
        private String eta_text;
        private List<ShipmentEventDto> events;
        private DeliveryProofDto delivery_proof;
        private String created_at;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getShipment_code() { return shipment_code; }
        public void setShipment_code(String shipment_code) { this.shipment_code = shipment_code; }
        public String getOrder_number() { return order_number; }
        public void setOrder_number(String order_number) { this.order_number = order_number; }
        public String getCurrent_status() { return current_status; }
        public void setCurrent_status(String current_status) { this.current_status = current_status; }
        public String getPickup_location() { return pickup_location; }
        public void setPickup_location(String pickup_location) { this.pickup_location = pickup_location; }
        public String getDelivery_location() { return delivery_location; }
        public void setDelivery_location(String delivery_location) { this.delivery_location = delivery_location; }
        public String getCrop_type() { return crop_type; }
        public void setCrop_type(String crop_type) { this.crop_type = crop_type; }
        public String getTransporter_name() { return transporter_name; }
        public void setTransporter_name(String transporter_name) { this.transporter_name = transporter_name; }
        public Double getCurrent_lat() { return current_lat; }
        public void setCurrent_lat(Double current_lat) { this.current_lat = current_lat; }
        public Double getCurrent_lng() { return current_lng; }
        public void setCurrent_lng(Double current_lng) { this.current_lng = current_lng; }
        public String getEta_text() { return eta_text; }
        public void setEta_text(String eta_text) { this.eta_text = eta_text; }
        public List<ShipmentEventDto> getEvents() { return events; }
        public void setEvents(List<ShipmentEventDto> events) { this.events = events; }
        public DeliveryProofDto getDelivery_proof() { return delivery_proof; }
        public void setDelivery_proof(DeliveryProofDto delivery_proof) { this.delivery_proof = delivery_proof; }
        public String getCreated_at() { return created_at; }
        public void setCreated_at(String created_at) { this.created_at = created_at; }
    }

    public static class ShipmentEventDto {
        private String status;
        private String location;
        private String notes;
        private String timestamp;

        public ShipmentEventDto() {}
        public ShipmentEventDto(String status, String location, String notes, String timestamp) {
            this.status = status;
            this.location = location;
            this.notes = notes;
            this.timestamp = timestamp;
        }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
        public String getTimestamp() { return timestamp; }
        public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
    }

    public static class DeliveryProofDto {
        private String photo_url;
        private String recipient_name;
        private String uploaded_at;

        public DeliveryProofDto() {}
        public DeliveryProofDto(String photo_url, String recipient_name, String uploaded_at) {
            this.photo_url = photo_url;
            this.recipient_name = recipient_name;
            this.uploaded_at = uploaded_at;
        }

        public String getPhoto_url() { return photo_url; }
        public void setPhoto_url(String photo_url) { this.photo_url = photo_url; }
        public String getRecipient_name() { return recipient_name; }
        public void setRecipient_name(String recipient_name) { this.recipient_name = recipient_name; }
        public String getUploaded_at() { return uploaded_at; }
        public void setUploaded_at(String uploaded_at) { this.uploaded_at = uploaded_at; }
    }
}
