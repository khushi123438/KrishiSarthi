package com.krishisarthi.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "farms")
public class Farm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_profile_id", nullable = false)
    private FarmerProfile farmer;

    @Column(name = "farm_name", nullable = false, length = 100)
    private String farmName;

    @Column(name = "size_acres", nullable = false)
    private Double sizeAcres = 1.0;

    @Column(name = "soil_type", length = 50)
    private String soilType;

    @Column(name = "irrigation_source", length = 50)
    private String irrigationSource;

    @Column(length = 100)
    private String village;

    @Column(length = 100)
    private String district;

    @Column(length = 100)
    private String state;

    @OneToMany(mappedBy = "farm")
    private List<CropListing> listings = new ArrayList<>();

    public Farm() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public FarmerProfile getFarmer() { return farmer; }
    public void setFarmer(FarmerProfile farmer) { this.farmer = farmer; }

    public String getFarmName() { return farmName; }
    public void setFarmName(String farmName) { this.farmName = farmName; }

    public Double getSizeAcres() { return sizeAcres; }
    public void setSizeAcres(Double sizeAcres) { this.sizeAcres = sizeAcres; }

    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }

    public String getIrrigationSource() { return irrigationSource; }
    public void setIrrigationSource(String irrigationSource) { this.irrigationSource = irrigationSource; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public List<CropListing> getListings() { return listings; }
    public void setListings(List<CropListing> listings) { this.listings = listings; }
}
