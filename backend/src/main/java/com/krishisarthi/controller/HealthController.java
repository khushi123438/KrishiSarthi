package com.krishisarthi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
@Tag(name = "System Health", description = "Platform uptime and health check")
public class HealthController {

    @GetMapping
    @Operation(summary = "Check backend API health status")
    public ResponseEntity<Map<String, Object>> checkHealth() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "app", "KrishiSarthi Enterprise Full-Stack Platform",
                "version", "2.0.0",
                "java", System.getProperty("java.version"),
                "timestamp", LocalDateTime.now().toString()
        ));
    }
}
