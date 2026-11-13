package com.krishisarthi.service;

import com.krishisarthi.dto.AgriDataDtos.MandiPriceResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MandiMarketService {

    private final List<MandiPriceResponse> mandiRates = new ArrayList<>();

    public MandiMarketService() {
        mandiRates.add(new MandiPriceResponse(
                "Gehun (Wheat Sharbati)", "Cereals", "Karnal Mandi", "Haryana",
                2450.0, 2750.0, 2650.0, "quintal", "+2.4%", "up", "Today"
        ));
        mandiRates.add(new MandiPriceResponse(
                "Basmati Rice 1121", "Cereals", "Taraori Mandi", "Haryana",
                8200.0, 8800.0, 8500.0, "quintal", "+1.1%", "up", "Today"
        ));
        mandiRates.add(new MandiPriceResponse(
                "Aloo (Potato Kufri)", "Vegetables", "Patiala Mandi", "Punjab",
                1250.0, 1500.0, 1400.0, "quintal", "-0.5%", "down", "Today"
        ));
        mandiRates.add(new MandiPriceResponse(
                "Tamatar (Tomato Hybrid)", "Vegetables", "Azadpur Mandi", "Delhi",
                2800.0, 3500.0, 3200.0, "quintal", "+4.8%", "up", "Today"
        ));
        mandiRates.add(new MandiPriceResponse(
                "Pyaaz (Onion Nasik)", "Vegetables", "Lasalgaon Mandi", "Maharashtra",
                1800.0, 2200.0, 2000.0, "quintal", "0.0%", "stable", "Today"
        ));
        mandiRates.add(new MandiPriceResponse(
                "Sarson (Mustard Seed)", "Oilseeds", "Bharatpur Mandi", "Rajasthan",
                5400.0, 5800.0, 5600.0, "quintal", "+1.8%", "up", "Today"
        ));
    }

    public List<MandiPriceResponse> getLatestMandiPrices(String crop, String state) {
        return mandiRates.stream()
                .filter(m -> crop == null || m.getCrop_name().toLowerCase().contains(crop.toLowerCase()))
                .filter(m -> state == null || m.getState().toLowerCase().contains(state.toLowerCase()))
                .collect(Collectors.toList());
    }
}
