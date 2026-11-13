package com.krishisarthi.controller;

import com.krishisarthi.dto.PaymentDtos.*;
import com.krishisarthi.security.SecurityUtils;
import com.krishisarthi.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/payment")
@Tag(name = "Payment Gateway", description = "Razorpay order creation, HMAC SHA256 verification, and webhooks")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    @Operation(summary = "Generate Razorpay order for checkout")
    public ResponseEntity<RazorpayOrderResponse> createOrder(@RequestBody CreateRazorpayOrderRequest request) {
        Long buyerId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized: Login required"));
        return ResponseEntity.ok(paymentService.createPaymentOrder(buyerId, request.getOrder_id()));
    }

    @PostMapping("/verify")
    @Operation(summary = "Verify Razorpay payment signature, update order to PAID, and trigger logistics")
    public ResponseEntity<Map<String, Object>> verifyPayment(@RequestBody VerifyPaymentRequest request) {
        Long buyerId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized: Login required"));
        return ResponseEntity.ok(paymentService.verifyPayment(buyerId, request));
    }

    @PostMapping("/webhook")
    @Operation(summary = "Razorpay payment webhook listener")
    public ResponseEntity<Map<String, Object>> handleWebhook(
            @RequestBody String payload,
            @RequestHeader(value = "X-Razorpay-Signature", required = false) String signature
    ) {
        return ResponseEntity.ok(paymentService.handleWebhook(payload, signature));
    }
}
