package com.krishisarthi.dto;

public class PaymentDtos {

    public static class CreateRazorpayOrderRequest {
        private Long order_id;
        public Long getOrder_id() { return order_id; }
        public void setOrder_id(Long order_id) { this.order_id = order_id; }
    }

    public static class RazorpayOrderResponse {
        private String id;
        private Long amount;
        private String currency;
        private String key_id;
        private Boolean is_test_mode;

        public RazorpayOrderResponse(String id, Long amount, String currency, String key_id, Boolean is_test_mode) {
            this.id = id;
            this.amount = amount;
            this.currency = currency;
            this.key_id = key_id;
            this.is_test_mode = is_test_mode;
        }

        public String getId() { return id; }
        public Long getAmount() { return amount; }
        public String getCurrency() { return currency; }
        public String getKey_id() { return key_id; }
        public Boolean getIs_test_mode() { return is_test_mode; }
    }

    public static class VerifyPaymentRequest {
        private Long order_id;
        private String razorpay_order_id;
        private String razorpay_payment_id;
        private String razorpay_signature;

        public Long getOrder_id() { return order_id; }
        public void setOrder_id(Long order_id) { this.order_id = order_id; }
        public String getRazorpay_order_id() { return razorpay_order_id; }
        public void setRazorpay_order_id(String razorpay_order_id) { this.razorpay_order_id = razorpay_order_id; }
        public String getRazorpay_payment_id() { return razorpay_payment_id; }
        public void setRazorpay_payment_id(String razorpay_payment_id) { this.razorpay_payment_id = razorpay_payment_id; }
        public String getRazorpay_signature() { return razorpay_signature; }
        public void setRazorpay_signature(String razorpay_signature) { this.razorpay_signature = razorpay_signature; }
    }
}
