package com.krishisarthi.controller;

import com.krishisarthi.dto.FarmerDtos.*;
import com.krishisarthi.security.SecurityUtils;
import com.krishisarthi.service.FarmerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/farmer")
@Tag(name = "Farmer Workflows", description = "Crop listing, offers negotiation, batch QR code generator")
@PreAuthorize("hasAnyRole('FARMER', 'ADMIN')")
public class FarmerController {

    private final FarmerService farmerService;

    public FarmerController(FarmerService farmerService) {
        this.farmerService = farmerService;
    }

    @PostMapping(value = "/listings", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Publish a new crop listing with images & auto-generated batch QR code")
    public ResponseEntity<Map<String, Object>> createCropListing(
            @RequestParam("crop_name") String cropName,
            @RequestParam("variety") String variety,
            @RequestParam("quantity") Double quantity,
            @RequestParam(value = "unit", defaultValue = "kg") String unit,
            @RequestParam("expected_price_per_unit") Double expectedPricePerUnit,
            @RequestParam(value = "quality_grade", defaultValue = "Grade A") String qualityGrade,
            @RequestParam(value = "location_district", defaultValue = "Karnal") String locationDistrict,
            @RequestParam(value = "location_state", defaultValue = "Haryana") String locationState,
            @RequestParam(value = "description", required = false) String description,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) {
        Long farmerId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));

        CropListingRequest req = new CropListingRequest();
        req.setCrop_name(cropName);
        req.setVariety(variety);
        req.setQuantity(quantity);
        req.setUnit(unit);
        req.setExpected_price_per_unit(expectedPricePerUnit);
        req.setQuality_grade(qualityGrade);
        req.setLocation_district(locationDistrict);
        req.setLocation_state(locationState);
        req.setDescription(description);

        return ResponseEntity.ok(farmerService.createCropListing(farmerId, req, images));
    }

    @PostMapping(value = "/listings", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Publish a new crop listing via JSON (Voice AI crop listing)")
    public ResponseEntity<Map<String, Object>> createCropListingJson(@RequestBody CropListingRequest request) {
        Long farmerId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(farmerService.createCropListing(farmerId, request, null));
    }

    @GetMapping("/my-listings")
    @Operation(summary = "Get all crop listings created by authenticated farmer")
    public ResponseEntity<List<CropListingResponse>> getMyListings() {
        Long farmerId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(farmerService.getMyListings(farmerId));
    }

    @DeleteMapping("/listings/{listing_id}")
    @Operation(summary = "Delete / Cancel a crop listing")
    public ResponseEntity<Map<String, Object>> deleteListing(@PathVariable("listing_id") Long listingId) {
        Long farmerId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(farmerService.deleteListing(farmerId, listingId));
    }

    @GetMapping("/offers")
    @Operation(summary = "Get received buyer price offers")
    public ResponseEntity<List<FarmerOfferResponse>> getOffers() {
        Long farmerId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(farmerService.getFarmerOffers(farmerId));
    }

    @PostMapping("/offers/{offer_id}/respond")
    @Operation(summary = "Respond to offer: ACCEPT (creates Order), COUNTER, or REJECT")
    public ResponseEntity<Map<String, Object>> respondToOffer(
            @PathVariable("offer_id") Long offerId,
            @RequestBody OfferActionRequest request
    ) {
        Long farmerId = SecurityUtils.getCurrentUserId()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(farmerService.respondToOffer(farmerId, offerId, request));
    }
}
