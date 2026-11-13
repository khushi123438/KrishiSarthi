package com.krishisarthi.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "farmer_profiles")
public class FarmerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String village;
    private String district;
    private String state;
    private String pincode;

    @Column(name = "primary_crops", columnDefinition = "TEXT")
    private String primaryCrops;

    @Column(name = "experience_years")
    private Integer experienceYears = 0;

    private Double rating = 5.0;

    @Column(name = "total_sales_count")
    private Integer totalSalesCount = 0;

    @OneToMany(mappedBy = "farmer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Farm> farms = new ArrayList<>();

    public FarmerProfile() {}

    public FarmerProfile(User user, String village, String district, String state, String pincode, String primaryCrops, Integer experienceYears) {
        this.user = user;
        this.village = village;
        this.district = district;
        this.state = state;
        this.pincode = pincode;
        this.primaryCrops = primaryCrops;
        this.experienceYears = experienceYears;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public String getPrimaryCrops() { return primaryCrops; }
    public void setPrimaryCrops(String primaryCrops) { this.primaryCrops = primaryCrops; }

    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getTotalSalesCount() { return totalSalesCount; }
    public void setTotalSalesCount(Integer totalSalesCount) { this.totalSalesCount = totalSalesCount; }

    public List<Farm> getFarms() { return farms; }
    public void setFarms(List<Farm> farms) { this.farms = farms; }
}
