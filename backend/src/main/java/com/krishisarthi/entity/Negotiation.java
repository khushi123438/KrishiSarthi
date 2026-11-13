package com.krishisarthi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "negotiations")
public class Negotiation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offer_id", nullable = false)
    private Offer offer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @Column(name = "proposed_price_per_unit", nullable = false)
    private Double proposedPricePerUnit;

    @Column(name = "proposed_quantity", nullable = false)
    private Double proposedQuantity;

    @Column(nullable = false, length = 50)
    private String action;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Negotiation() {}

    public Negotiation(Offer offer, User sender, Double proposedPricePerUnit, Double proposedQuantity, String action, String message) {
        this.offer = offer;
        this.sender = sender;
        this.proposedPricePerUnit = proposedPricePerUnit;
        this.proposedQuantity = proposedQuantity;
        this.action = action;
        this.message = message;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Offer getOffer() { return offer; }
    public void setOffer(Offer offer) { this.offer = offer; }

    public User getSender() { return sender; }
    public void setSender(User sender) { this.sender = sender; }

    public Double getProposedPricePerUnit() { return proposedPricePerUnit; }
    public void setProposedPricePerUnit(Double proposedPricePerUnit) { this.proposedPricePerUnit = proposedPricePerUnit; }

    public Double getProposedQuantity() { return proposedQuantity; }
    public void setProposedQuantity(Double proposedQuantity) { this.proposedQuantity = proposedQuantity; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
