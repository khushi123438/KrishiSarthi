package com.krishisarthi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "crop_listings")
public class CropListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private User farmer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farm_id")
    private Farm farm;

    @Column(name = "crop_name", nullable = false, length = 100)
    private String cropName;

    @Column(nullable = false, length = 100)
    private String variety;

    @Column(nullable = false)
    private Double quantity;

    @Column(length = 20)
    private String unit = "kg";

    @Column(name = "expected_price_per_unit", nullable = false)
    private Double expectedPricePerUnit;

    @Column(name = "quality_grade", length = 20)
    private String qualityGrade = "Grade A";

    @Column(name = "harvest_date")
    private LocalDateTime harvestDate;

    @Column(name = "location_district", nullable = false, length = 100)
    private String locationDistrict;

    @Column(name = "location_state", nullable = false, length = 100)
    private String locationState;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private CropListingStatus status = CropListingStatus.PUBLISHED;

    @Column(name = "views_count")
    private Integer viewsCount = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "cropListing", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CropImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "cropListing", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Offer> offers = new ArrayList<>();

    @OneToOne(mappedBy = "cropListing", cascade = CascadeType.ALL, orphanRemoval = true)
    private CropBatch batch;

    public CropListing() {}

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getFarmer() { return farmer; }
    public void setFarmer(User farmer) { this.farmer = farmer; }

    public Farm getFarm() { return farm; }
    public void setFarm(Farm farm) { this.farm = farm; }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public String getVariety() { return variety; }
    public void setVariety(String variety) { this.variety = variety; }

    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public Double getExpectedPricePerUnit() { return expectedPricePerUnit; }
    public void setExpectedPricePerUnit(Double expectedPricePerUnit) { this.expectedPricePerUnit = expectedPricePerUnit; }

    public String getQualityGrade() { return qualityGrade; }
    public void setQualityGrade(String qualityGrade) { this.qualityGrade = qualityGrade; }

    public LocalDateTime getHarvestDate() { return harvestDate; }
    public void setHarvestDate(LocalDateTime harvestDate) { this.harvestDate = harvestDate; }

    public String getLocationDistrict() { return locationDistrict; }
    public void setLocationDistrict(String locationDistrict) { this.locationDistrict = locationDistrict; }

    public String getLocationState() { return locationState; }
    public void setLocationState(String locationState) { this.locationState = locationState; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public CropListingStatus getStatus() { return status; }
    public void setStatus(CropListingStatus status) { this.status = status; }

    public Integer getViewsCount() { return viewsCount; }
    public void setViewsCount(Integer viewsCount) { this.viewsCount = viewsCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<CropImage> getImages() { return images; }
    public void setImages(List<CropImage> images) { this.images = images; }

    public List<Offer> getOffers() { return offers; }
    public void setOffers(List<Offer> offers) { this.offers = offers; }

    public CropBatch getBatch() { return batch; }
    public void setBatch(CropBatch batch) { this.batch = batch; }
}
