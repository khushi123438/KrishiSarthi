package com.krishisarthi.controller;

import com.krishisarthi.dto.TraceabilityDtos.TraceabilityResponse;
import com.krishisarthi.service.TraceabilityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/traceability")
@Tag(name = "Crop Traceability & QR", description = "Public QR code crop batch verification and supply-chain timeline")
public class TraceabilityController {

    private final TraceabilityService traceabilityService;

    public TraceabilityController(TraceabilityService traceabilityService) {
        this.traceabilityService = traceabilityService;
    }

    @GetMapping("/batch/{batch_code}")
    @Operation(summary = "Verify public crop batch traceability certificate without authentication")
    public ResponseEntity<TraceabilityResponse> getBatchTraceability(@PathVariable("batch_code") String batchCode) {
        return ResponseEntity.ok(traceabilityService.getBatchTraceability(batchCode));
    }
}
