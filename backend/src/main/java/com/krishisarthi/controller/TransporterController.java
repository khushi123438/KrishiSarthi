package com.krishisarthi.controller;

import com.krishisarthi.dto.TransporterDtos.*;
import com.krishisarthi.security.SecurityUtils;
import com.krishisarthi.service.TransporterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/transporter")
@Tag(name = "Transporter & Logistics", description = "Freight requests, bidding, GPS tracking, and proof of delivery")
public class TransporterController {

    private final TransporterService transporterService;

    public TransporterController(TransporterService transporterService) {
        this.transporterService = transporterService;
    }

    @PostMapping("/create-request")
    @Operation(summary = "Direct transport booking from Location A to Location B")
    public ResponseEntity<Map<String, Object>> createDirectRequest(@RequestBody DirectTransportRequest request) {
        Long userId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(transporterService.createDirectTransportRequest(userId, request));
    }

    @GetMapping("/requests")
    @Operation(summary = "Get all open transport requests looking for freight bids")
    public ResponseEntity<List<TransportRequestResponse>> getOpenRequests() {
        return ResponseEntity.ok(transporterService.getOpenRequests());
    }

    @PostMapping("/bids")
    @Operation(summary = "Submit a freight quote / bid for a transport request")
    public ResponseEntity<Map<String, Object>> submitBid(@RequestBody SubmitBidRequest request) {
        Long transporterId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(transporterService.submitBid(transporterId, request));
    }

    @PostMapping("/requests/{request_id}/select-bid/{bid_id}")
    @Operation(summary = "Accept transporter bid, assign shipment, and generate shipment tracking code")
    public ResponseEntity<Map<String, Object>> selectBid(
            @PathVariable("request_id") Long requestId,
            @PathVariable("bid_id") Long bidId
    ) {
        Long userId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(transporterService.selectBid(userId, requestId, bidId));
    }

    @GetMapping("/my-shipments")
    @Operation(summary = "Get active shipments with event timeline and delivery proofs")
    public ResponseEntity<List<ShipmentResponse>> getMyShipments() {
        Long userId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(transporterService.getMyShipments(userId));
    }

    @PostMapping("/shipments/{shipment_id}/status")
    @Operation(summary = "Update shipment status (PICKED_UP, IN_TRANSIT, DELIVERED) with live GPS coordinates")
    public ResponseEntity<Map<String, Object>> updateStatus(
            @PathVariable("shipment_id") Long shipmentId,
            @RequestBody UpdateStatusRequest request
    ) {
        Long userId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(transporterService.updateShipmentStatus(userId, shipmentId, request));
    }

    @PostMapping(value = "/shipments/{shipment_id}/proof", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload photo proof of delivery and complete shipment/order")
    public ResponseEntity<Map<String, Object>> uploadDeliveryProof(
            @PathVariable("shipment_id") Long shipmentId,
            @RequestParam("recipient_name") String recipientName,
            @RequestParam(value = "notes", required = false) String notes,
            @RequestPart("photo") MultipartFile photo
    ) {
        Long userId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(transporterService.uploadDeliveryProof(userId, shipmentId, recipientName, notes, photo));
    }
}
