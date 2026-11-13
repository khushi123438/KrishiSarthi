package com.krishisarthi.dto;

public class EscrowDtos {

    public static class EscrowReleaseRequest {
        private Long order_id;
        private String bank_account_or_upi;

        public Long getOrder_id() { return order_id; }
        public void setOrder_id(Long order_id) { this.order_id = order_id; }
        public String getBankAccountOrUpi() { return bank_account_or_upi; }
        public void setBankAccountOrUpi(String bank_account_or_upi) { this.bank_account_or_upi = bank_account_or_upi; }
    }

    public static class EscrowPayoutResponse {
        private Long id;
        private Long order_id;
        private String order_number;
        private String farmer_name;
        private Double total_amount;
        private Double platform_fee;
        private Double net_payout;
        private String status;
        private String settlement_reference;
        private String held_at;
        private String released_at;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getOrder_id() { return order_id; }
        public void setOrder_id(Long order_id) { this.order_id = order_id; }
        public String getOrder_number() { return order_number; }
        public void setOrder_number(String order_number) { this.order_number = order_number; }
        public String getFarmer_name() { return farmer_name; }
        public void setFarmer_name(String farmer_name) { this.farmer_name = farmer_name; }
        public Double getTotal_amount() { return total_amount; }
        public void setTotal_amount(Double total_amount) { this.total_amount = total_amount; }
        public Double getPlatform_fee() { return platform_fee; }
        public void setPlatform_fee(Double platform_fee) { this.platform_fee = platform_fee; }
        public Double getNet_payout() { return net_payout; }
        public void setNet_payout(Double net_payout) { this.net_payout = net_payout; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getSettlement_reference() { return settlement_reference; }
        public void setSettlement_reference(String settlement_reference) { this.settlement_reference = settlement_reference; }
        public String getHeld_at() { return held_at; }
        public void setHeld_at(String held_at) { this.held_at = held_at; }
        public String getReleased_at() { return released_at; }
        public void setReleased_at(String released_at) { this.released_at = released_at; }
    }
}
