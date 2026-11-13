package com.krishisarthi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "buyer_profiles")
public class BuyerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "company_name", length = 150)
    private String companyName;

    @Column(name = "buyer_type", length = 50)
    private String buyerType = "Wholesaler";

    @Column(name = "gst_number", length = 30)
    private String gstNumber;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    private Double rating = 5.0;

    @Column(name = "total_purchases_count")
    private Integer totalPurchasesCount = 0;

    public BuyerProfile() {}

    public BuyerProfile(User user, String companyName, String buyerType, String gstNumber, String city, String state) {
        this.user = user;
        this.companyName = companyName;
        this.buyerType = buyerType;
        this.gstNumber = gstNumber;
        this.city = city;
        this.state = state;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getBuyerType() { return buyerType; }
    public void setBuyerType(String buyerType) { this.buyerType = buyerType; }

    public String getGstNumber() { return gstNumber; }
    public void setGstNumber(String gstNumber) { this.gstNumber = gstNumber; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getTotalPurchasesCount() { return totalPurchasesCount; }
    public void setTotalPurchasesCount(Integer totalPurchasesCount) { this.totalPurchasesCount = totalPurchasesCount; }
}
