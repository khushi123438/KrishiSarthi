package com.krishisarthi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "transporter_profiles")
public class TransporterProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "agency_name", length = 150)
    private String agencyName;

    @Column(name = "vehicle_type", length = 50)
    private String vehicleType;

    @Column(name = "vehicle_number", length = 30)
    private String vehicleNumber;

    @Column(name = "capacity_tons")
    private Double capacityTons = 5.0;

    @Column(name = "operating_routes", columnDefinition = "TEXT")
    private String operatingRoutes;

    private Double rating = 5.0;

    @Column(name = "total_deliveries_count")
    private Integer totalDeliveriesCount = 0;

    public TransporterProfile() {}

    public TransporterProfile(User user, String agencyName, String vehicleType, String vehicleNumber, Double capacityTons, String operatingRoutes) {
        this.user = user;
        this.agencyName = agencyName;
        this.vehicleType = vehicleType;
        this.vehicleNumber = vehicleNumber;
        this.capacityTons = capacityTons;
        this.operatingRoutes = operatingRoutes;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getAgencyName() { return agencyName; }
    public void setAgencyName(String agencyName) { this.agencyName = agencyName; }

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }

    public Double getCapacityTons() { return capacityTons; }
    public void setCapacityTons(Double capacityTons) { this.capacityTons = capacityTons; }

    public String getOperatingRoutes() { return operatingRoutes; }
    public void setOperatingRoutes(String operatingRoutes) { this.operatingRoutes = operatingRoutes; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getTotalDeliveriesCount() { return totalDeliveriesCount; }
    public void setTotalDeliveriesCount(Integer totalDeliveriesCount) { this.totalDeliveriesCount = totalDeliveriesCount; }
}
