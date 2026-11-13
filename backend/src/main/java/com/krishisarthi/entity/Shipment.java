package com.krishisarthi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "shipments")
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "shipment_code", nullable = false, unique = true, length = 50)
    private String shipmentCode;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transport_request_id", nullable = false, unique = true)
    private TransportRequest transportRequest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transporter_id", nullable = false)
    private User transporter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Enumerated(EnumType.STRING)
    @Column(name = "current_status", length = 30)
    private ShipmentStatus currentStatus = ShipmentStatus.TRANSPORT_ASSIGNED;

    @Column(name = "pickup_time")
    private LocalDateTime pickupTime;

    @Column(name = "delivered_time")
    private LocalDateTime deliveredTime;

    @Column(name = "current_lat")
    private Double currentLat;

    @Column(name = "current_lng")
    private Double currentLng;

    @Column(name = "eta_text", length = 50)
    private String etaText;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "shipment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShipmentEvent> events = new ArrayList<>();

    @OneToOne(mappedBy = "shipment", cascade = CascadeType.ALL)
    private DeliveryProof deliveryProof;

    public Shipment() {}

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getShipmentCode() { return shipmentCode; }
    public void setShipmentCode(String shipmentCode) { this.shipmentCode = shipmentCode; }

    public TransportRequest getTransportRequest() { return transportRequest; }
    public void setTransportRequest(TransportRequest transportRequest) { this.transportRequest = transportRequest; }

    public User getTransporter() { return transporter; }
    public void setTransporter(User transporter) { this.transporter = transporter; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public ShipmentStatus getCurrentStatus() { return currentStatus; }
    public void setCurrentStatus(ShipmentStatus currentStatus) { this.currentStatus = currentStatus; }

    public LocalDateTime getPickupTime() { return pickupTime; }
    public void setPickupTime(LocalDateTime pickupTime) { this.pickupTime = pickupTime; }

    public LocalDateTime getDeliveredTime() { return deliveredTime; }
    public void setDeliveredTime(LocalDateTime deliveredTime) { this.deliveredTime = deliveredTime; }

    public Double getCurrentLat() { return currentLat; }
    public void setCurrentLat(Double currentLat) { this.currentLat = currentLat; }

    public Double getCurrentLng() { return currentLng; }
    public void setCurrentLng(Double currentLng) { this.currentLng = currentLng; }

    public String getEtaText() { return etaText; }
    public void setEtaText(String etaText) { this.etaText = etaText; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<ShipmentEvent> getEvents() { return events; }
    public void setEvents(List<ShipmentEvent> events) { this.events = events; }

    public DeliveryProof getDeliveryProof() { return deliveryProof; }
    public void setDeliveryProof(DeliveryProof deliveryProof) { this.deliveryProof = deliveryProof; }
}
