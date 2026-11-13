package com.krishisarthi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "crop_batches")
public class CropBatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "batch_code", nullable = false, unique = true, length = 50)
    private String batchCode;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_listing_id", nullable = false)
    private CropListing cropListing;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private User farmer;

    @Column(name = "harvest_date")
    private LocalDateTime harvestDate = LocalDateTime.now();

    @Column(name = "packaging_date")
    private LocalDateTime packagingDate = LocalDateTime.now();

    @Column(name = "origin_location", nullable = false, length = 150)
    private String originLocation;

    @Column(name = "qr_code_url")
    private String qrCodeUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "batch", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TraceabilityEvent> traceabilityEvents = new ArrayList<>();

    public CropBatch() {}

    public CropBatch(String batchCode, CropListing cropListing, User farmer, String originLocation, String qrCodeUrl) {
        this.batchCode = batchCode;
        this.cropListing = cropListing;
        this.farmer = farmer;
        this.originLocation = originLocation;
        this.qrCodeUrl = qrCodeUrl;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBatchCode() { return batchCode; }
    public void setBatchCode(String batchCode) { this.batchCode = batchCode; }

    public CropListing getCropListing() { return cropListing; }
    public void setCropListing(CropListing cropListing) { this.cropListing = cropListing; }

    public User getFarmer() { return farmer; }
    public void setFarmer(User farmer) { this.farmer = farmer; }

    public LocalDateTime getHarvestDate() { return harvestDate; }
    public void setHarvestDate(LocalDateTime harvestDate) { this.harvestDate = harvestDate; }

    public LocalDateTime getPackagingDate() { return packagingDate; }
    public void setPackagingDate(LocalDateTime packagingDate) { this.packagingDate = packagingDate; }

    public String getOriginLocation() { return originLocation; }
    public void setOriginLocation(String originLocation) { this.originLocation = originLocation; }

    public String getQrCodeUrl() { return qrCodeUrl; }
    public void setQrCodeUrl(String qrCodeUrl) { this.qrCodeUrl = qrCodeUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<TraceabilityEvent> getTraceabilityEvents() { return traceabilityEvents; }
    public void setTraceabilityEvents(List<TraceabilityEvent> traceabilityEvents) { this.traceabilityEvents = traceabilityEvents; }
}
