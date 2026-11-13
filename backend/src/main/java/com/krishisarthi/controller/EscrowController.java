package com.krishisarthi.controller;

import com.krishisarthi.dto.EscrowDtos.EscrowPayoutResponse;
import com.krishisarthi.service.EscrowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/escrow")
@Tag(name = "Escrow & Farmer Settlement", description = "Secure payment holding and delivery-based payout release")
public class EscrowController {

    private final EscrowService escrowService;

    public EscrowController(EscrowService escrowService) {
        this.escrowService = escrowService;
    }

    @GetMapping("/{order_id}")
    @Operation(summary = "Check escrow holding status and payout breakdown for an order")
    public ResponseEntity<EscrowPayoutResponse> getEscrow(@PathVariable("order_id") Long orderId) {
        return ResponseEntity.ok(escrowService.getEscrowForOrder(orderId));
    }

    @PostMapping("/release/{order_id}")
    @Operation(summary = "Release escrow payout to farmer bank/UPI account upon verified delivery")
    public ResponseEntity<EscrowPayoutResponse> releasePayout(@PathVariable("order_id") Long orderId) {
        return ResponseEntity.ok(escrowService.releasePayout(orderId));
    }
}
