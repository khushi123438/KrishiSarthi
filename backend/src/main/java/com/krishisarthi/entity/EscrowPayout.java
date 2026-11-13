package com.krishisarthi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "escrow_payouts")
public class EscrowPayout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private User farmer;

    @Column(nullable = false)
    private Double amount;

    @Column(name = "platform_fee", nullable = false)
    private Double platformFee;

    @Column(name = "net_payout", nullable = false)
    private Double netPayout;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EscrowStatus status = EscrowStatus.HELD_IN_ESCROW;

    @Column(name = "bank_account_or_upi", length = 100)
    private String bankAccountOrUpi;

    @Column(name = "settlement_reference", length = 100)
    private String settlementReference;

    @Column(name = "held_at")
    private LocalDateTime heldAt = LocalDateTime.now();

    @Column(name = "released_at")
    private LocalDateTime releasedAt;

    public EscrowPayout() {}

    public EscrowPayout(Order order, User farmer, Double amount, Double platformFee, Double netPayout, String bankAccountOrUpi) {
        this.order = order;
        this.farmer = farmer;
        this.amount = amount;
        this.platformFee = platformFee;
        this.netPayout = netPayout;
        this.bankAccountOrUpi = bankAccountOrUpi;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public User getFarmer() { return farmer; }
    public void setFarmer(User farmer) { this.farmer = farmer; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public Double getPlatformFee() { return platformFee; }
    public void setPlatformFee(Double platformFee) { this.platformFee = platformFee; }

    public Double getNetPayout() { return netPayout; }
    public void setNetPayout(Double netPayout) { this.netPayout = netPayout; }

    public EscrowStatus getStatus() { return status; }
    public void setStatus(EscrowStatus status) { this.status = status; }

    public String getBankAccountOrUpi() { return bankAccountOrUpi; }
    public void setBankAccountOrUpi(String bankAccountOrUpi) { this.bankAccountOrUpi = bankAccountOrUpi; }

    public String getSettlementReference() { return settlementReference; }
    public void setSettlementReference(String settlementReference) { this.settlementReference = settlementReference; }

    public LocalDateTime getHeldAt() { return heldAt; }
    public void setHeldAt(LocalDateTime heldAt) { this.heldAt = heldAt; }

    public LocalDateTime getReleasedAt() { return releasedAt; }
    public void setReleasedAt(LocalDateTime releasedAt) { this.releasedAt = releasedAt; }
}
