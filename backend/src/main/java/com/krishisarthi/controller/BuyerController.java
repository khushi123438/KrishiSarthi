package com.krishisarthi.controller;

import com.krishisarthi.dto.BuyerDtos.*;
import com.krishisarthi.security.SecurityUtils;
import com.krishisarthi.service.BuyerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/buyer")
@Tag(name = "Buyer Operations", description = "Marketplace search, price offers, orders tracking, and reviews")
public class BuyerController {

    private final BuyerService buyerService;

    public BuyerController(BuyerService buyerService) {
        this.buyerService = buyerService;
    }

    @GetMapping("/marketplace")
    @Operation(summary = "Search & filter crops available across verified Indian farms")
    public ResponseEntity<List<MarketplaceItemResponse>> searchMarketplace(
            @RequestParam(value = "crop", required = false) String crop,
            @RequestParam(value = "variety", required = false) String variety,
            @RequestParam(value = "district", required = false) String district,
            @RequestParam(value = "state", required = false) String state,
            @RequestParam(value = "min_price", required = false) Double minPrice,
            @RequestParam(value = "max_price", required = false) Double maxPrice,
            @RequestParam(value = "quality_grade", required = false) String qualityGrade
    ) {
        return ResponseEntity.ok(buyerService.searchMarketplace(crop, variety, district, state, minPrice, maxPrice, qualityGrade));
    }

    @GetMapping("/listings/{listing_id}")
    @Operation(summary = "Get detailed information about a specific crop listing")
    public ResponseEntity<Map<String, Object>> getListingDetails(@PathVariable("listing_id") Long listingId) {
        return ResponseEntity.ok(buyerService.getListingDetails(listingId));
    }

    @PostMapping("/offers")
    @Operation(summary = "Submit a price offer with quantity to a farmer")
    public ResponseEntity<Map<String, Object>> makeOffer(@RequestBody MakeOfferRequest request) {
        Long buyerId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized: Login required to make an offer"));
        return ResponseEntity.ok(buyerService.makeOffer(buyerId, request));
    }

    @GetMapping("/my-orders")
    @Operation(summary = "Get user order history with live payment & delivery status")
    public ResponseEntity<List<BuyerOrderResponse>> getMyOrders() {
        Long userId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized: Login required"));
        return ResponseEntity.ok(buyerService.getBuyerOrders(userId));
    }

    @PostMapping("/reviews")
    @Operation(summary = "Submit rating and review for a completed order transaction")
    public ResponseEntity<Map<String, Object>> submitReview(@RequestBody ReviewRequest request) {
        Long userId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized: Login required"));
        return ResponseEntity.ok(buyerService.submitReview(userId, request));
    }
}
