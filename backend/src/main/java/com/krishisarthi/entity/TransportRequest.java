package com.krishisarthi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "transport_requests")
public class TransportRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(name = "pickup_location", nullable = false, length = 200)
    private String pickupLocation;

    @Column(name = "delivery_location", nullable = false, length = 200)
    private String deliveryLocation;

    @Column(name = "crop_type", nullable = false, length = 100)
    private String cropType;

    @Column(name = "quantity_kg", nullable = false)
    private Double quantityKg;

    @Column(name = "pickup_date", nullable = false)
    private LocalDateTime pickupDate;

    @Column(name = "preferred_vehicle", length = 50)
    private String preferredVehicle = "Truck";

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private TransportRequestStatus status = TransportRequestStatus.OPEN;

    @Column(name = "selected_bid_id")
    private Long selectedBidId;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "transportRequest", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TransporterBid> bids = new ArrayList<>();

    @OneToOne(mappedBy = "transportRequest", cascade = CascadeType.ALL)
    private Shipment shipment;

    public TransportRequest() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }

    public String getDeliveryLocation() { return deliveryLocation; }
    public void setDeliveryLocation(String deliveryLocation) { this.deliveryLocation = deliveryLocation; }

    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }

    public Double getQuantityKg() { return quantityKg; }
    public void setQuantityKg(Double quantityKg) { this.quantityKg = quantityKg; }

    public LocalDateTime getPickupDate() { return pickupDate; }
    public void setPickupDate(LocalDateTime pickupDate) { this.pickupDate = pickupDate; }

    public String getPreferredVehicle() { return preferredVehicle; }
    public void setPreferredVehicle(String preferredVehicle) { this.preferredVehicle = preferredVehicle; }

    public TransportRequestStatus getStatus() { return status; }
    public void setStatus(TransportRequestStatus status) { this.status = status; }

    public Long getSelectedBidId() { return selectedBidId; }
    public void setSelectedBidId(Long selectedBidId) { this.selectedBidId = selectedBidId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<TransporterBid> getBids() { return bids; }
    public void setBids(List<TransporterBid> bids) { this.bids = bids; }

    public Shipment getShipment() { return shipment; }
    public void setShipment(Shipment shipment) { this.shipment = shipment; }
}
