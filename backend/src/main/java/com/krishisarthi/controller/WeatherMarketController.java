package com.krishisarthi.controller;

import com.krishisarthi.dto.AgriDataDtos.MandiPriceResponse;
import com.krishisarthi.dto.AgriDataDtos.WeatherResponse;
import com.krishisarthi.service.MandiMarketService;
import com.krishisarthi.service.WeatherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/agri-data")
@Tag(name = "Weather & Mandi Intelligence", description = "Live weather forecast and official Indian Mandi rates")
public class WeatherMarketController {

    private final WeatherService weatherService;
    private final MandiMarketService mandiMarketService;

    public WeatherMarketController(WeatherService weatherService, MandiMarketService mandiMarketService) {
        this.weatherService = weatherService;
        this.mandiMarketService = mandiMarketService;
    }

    @GetMapping("/weather")
    @Operation(summary = "Get agricultural weather report and alerts for district and state")
    public ResponseEntity<WeatherResponse> getWeather(
            @RequestParam(value = "district", defaultValue = "Karnal") String district,
            @RequestParam(value = "state", defaultValue = "Haryana") String state
    ) {
        return ResponseEntity.ok(weatherService.getWeatherForLocation(district, state));
    }

    @GetMapping("/mandi-prices")
    @Operation(summary = "Get real-time Mandi market commodity rates index (Wheat, Rice, Potato, Tomato, Onion, Mustard)")
    public ResponseEntity<List<MandiPriceResponse>> getMandiPrices(
            @RequestParam(value = "crop", required = false) String crop,
            @RequestParam(value = "state", required = false) String state
    ) {
        return ResponseEntity.ok(mandiMarketService.getLatestMandiPrices(crop, state));
    }
}
