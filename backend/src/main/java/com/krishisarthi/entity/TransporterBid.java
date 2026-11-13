package com.krishisarthi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transporter_bids")
public class TransporterBid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transport_request_id", nullable = false)
    private TransportRequest transportRequest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transporter_id", nullable = false)
    private User transporter;

    @Column(name = "bid_amount", nullable = false)
    private Double bidAmount;

    @Column(name = "vehicle_details", length = 100)
    private String vehicleDetails;

    @Column(name = "estimated_delivery_hours")
    private Integer estimatedDeliveryHours = 24;

    @Column(columnDefinition = "TEXT")
    private String note;

    @Column(name = "is_accepted")
    private Boolean isAccepted = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public TransporterBid() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public TransportRequest getTransportRequest() { return transportRequest; }
    public void setTransportRequest(TransportRequest transportRequest) { this.transportRequest = transportRequest; }

    public User getTransporter() { return transporter; }
    public void setTransporter(User transporter) { this.transporter = transporter; }

    public Double getBidAmount() { return bidAmount; }
    public void setBidAmount(Double bidAmount) { this.bidAmount = bidAmount; }

    public String getVehicleDetails() { return vehicleDetails; }
    public void setVehicleDetails(String vehicleDetails) { this.vehicleDetails = vehicleDetails; }

    public Integer getEstimatedDeliveryHours() { return estimatedDeliveryHours; }
    public void setEstimatedDeliveryHours(Integer estimatedDeliveryHours) { this.estimatedDeliveryHours = estimatedDeliveryHours; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public Boolean getIsAccepted() { return isAccepted; }
    public void setIsAccepted(Boolean isAccepted) { this.isAccepted = isAccepted; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
