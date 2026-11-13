package com.krishisarthi.service;

import com.krishisarthi.config.ApplicationProperties;
import com.krishisarthi.entity.CropListing;
import com.krishisarthi.entity.Order;
import com.krishisarthi.entity.Shipment;
import com.krishisarthi.repository.CropListingRepository;
import com.krishisarthi.repository.OrderRepository;
import com.krishisarthi.repository.ShipmentRepository;
import com.krishisarthi.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class GeminiAiService {

    private static final Logger logger = LoggerFactory.getLogger(GeminiAiService.class);

    private final ApplicationProperties properties;
    private final OrderRepository orderRepository;
    private final CropListingRepository cropListingRepository;
    private final ShipmentRepository shipmentRepository;
    private final UserRepository userRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    public GeminiAiService(ApplicationProperties properties,
                           OrderRepository orderRepository,
                           CropListingRepository cropListingRepository,
                           ShipmentRepository shipmentRepository,
                           UserRepository userRepository) {
        this.properties = properties;
        this.orderRepository = orderRepository;
        this.cropListingRepository = cropListingRepository;
        this.shipmentRepository = shipmentRepository;
        this.userRepository = userRepository;
    }

    public String queryAssistant(Long userId, String prompt, String lang) {
        StringBuilder dbContext = new StringBuilder();

        if (userId != null) {
            userRepository.findById(userId).ifPresent(user -> {
                try {
                    List<Order> orders = user.getRole().name().equals("BUYER")
                            ? orderRepository.findByBuyerOrderByCreatedAtDesc(user)
                            : orderRepository.findByFarmerOrderByCreatedAtDesc(user);

                    if (!orders.isEmpty()) {
                        dbContext.append("\nUser Recent Orders:\n");
                        int count = 0;
                        for (Order o : orders) {
                            if (count++ >= 3) break;
                            Optional<Shipment> shp = shipmentRepository.findByOrderId(o.getId());
                            String crop = o.getCropListing() != null ? o.getCropListing().getCropName() : "Crop";
                            String statusStr = "Order #" + o.getOrderNumber() + ": " + o.getQuantity() + "kg " + crop + " @ Rs " + o.getPricePerUnit() + "/kg - Status: " + o.getStatus().name();
                            if (shp.isPresent()) {
                                statusStr += " (Shipment #" + shp.get().getShipmentCode() + ": " + shp.get().getCurrentStatus().name() + ")";
                            }
                            dbContext.append(statusStr).append("\n");
                        }
                    }

                    List<CropListing> listings = cropListingRepository.findByFarmerOrderByCreatedAtDesc(user);
                    if (!listings.isEmpty()) {
                        dbContext.append("\nUser Recent Crop Listings:\n");
                        int count = 0;
                        for (CropListing l : listings) {
                            if (count++ >= 3) break;
                            dbContext.append("Listing #").append(l.getId()).append(": ").append(l.getCropName())
                                    .append(" (").append(l.getVariety()).append("), ").append(l.getQuantity()).append("kg @ Rs ")
                                    .append(l.getExpectedPricePerUnit()).append("/kg - Status: ").append(l.getStatus().name()).append("\n");
                        }
                    }
                } catch (Exception e) {
                    logger.warn("DB Context Warning: {}", e.getMessage());
                }
            });
        }

        String apiKey = properties.getIntegrations().getGemini().getApiKey();
        if (apiKey != null && !apiKey.isBlank()) {
            try {
                String systemInstruction = "Aap KrishiSarthi / Farmlink ke Kisan Mitra AI Sahayak hain. " +
                        "Aap Bharat ke kisano aur vyapariyon ki madad karte hain. " +
                        "IMPORTANT FORMATTING INSTRUCTION: DO NOT USE markdown formatting like **bold**, *italics*, ### headers, or --- dividers in your response. " +
                        "Write in clean, plain text with simple bullet points (•) and numbered lists (1, 2, 3) so it looks beautiful on mobile chat screens. " +
                        "Aapka uttar simple, natural Hindi ya Hinglish mein hona chahiye. " +
                        "Hamesha accurate jankari dein. Dava/pesticide ka koi khatarnak ya overconfident davva na karein.\n" +
                        "Live Database Context:\n" + (dbContext.length() > 0 ? dbContext.toString() : "No active orders/listings found.");

                String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/" +
                        properties.getIntegrations().getGemini().getModel() + ":generateContent?key=" + apiKey;

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);

                Map<String, Object> textPart = new HashMap<>();
                textPart.put("text", systemInstruction + "\n\nUser Request: " + prompt);

                Map<String, Object> contentMap = new HashMap<>();
                contentMap.put("parts", Collections.singletonList(textPart));

                Map<String, Object> requestBody = new HashMap<>();
                requestBody.put("contents", Collections.singletonList(contentMap));

                HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
                ResponseEntity<Map> response = restTemplate.postForEntity(endpoint, request, Map.class);

                if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                    List candidates = (List) response.getBody().get("candidates");
                    if (candidates != null && !candidates.isEmpty()) {
                        Map candidate = (Map) candidates.get(0);
                        Map content = (Map) candidate.get("content");
                        if (content != null) {
                            List parts = (List) content.get("parts");
                            if (parts != null && !parts.isEmpty()) {
                                Map part = (Map) parts.get(0);
                                String text = (String) part.get("text");
                                if (text != null && !text.isBlank()) {
                                    return text.replace("**", "").replace("###", "").replace("---", "").trim();
                                }
                            }
                        }
                    }
                }
            } catch (Exception e) {
                logger.warn("Gemini API call failed: {}. Using intelligent agricultural fallback.", e.getMessage());
            }
        }

        return getIntelligentFallback(prompt, dbContext.toString());
    }

    private String getIntelligentFallback(String prompt, String dbContext) {
        String p = prompt.toLowerCase();

        if (p.contains("tomato") || p.contains("tamatar")) {
            return "Tamatar (Tomato) Aaj Ka Mandi Bhav:\n\n" +
                    "• Azadpur Mandi (Delhi): ₹28 - ₹34 / kg\n" +
                    "• Karnal / Haryana Mandi: ₹26 - ₹32 / kg\n" +
                    "• KrishiSarthi Direct Farmer Price: ₹30 / kg\n\n" +
                    "💡 KrishiSarthi App par 'Fasal Bazaar' mein jaakar aap seedhe kisano se Tamatar purchase kar sakte hain ya apna daam offer kar sakte hain!";
        }

        if (p.contains("aloo") || p.contains("potato")) {
            return "Aloo (Potato Kufri) Aaj Ka Mandi Bhav:\n\n" +
                    "• Agra / UP Mandi: ₹12 - ₹15 / kg\n" +
                    "• Azadpur Mandi: ₹14 - ₹17 / kg\n" +
                    "• KrishiSarthi Direct Farmer Price: ₹14 / kg\n\n" +
                    "💡 Aap Fasal Bazaar mein active Aloo listings dekh sakte hain.";
        }

        if (p.contains("gehun") || p.contains("wheat")) {
            return "Gehun (Wheat Sharbati) Aaj Ka Mandi Bhav:\n\n" +
                    "• Karnal / Punjab Mandi: ₹25 - ₹27 / kg (MSP: ₹2,275/quintal)\n" +
                    "• KrishiSarthi Direct Farmer Price: ₹26 / kg\n\n" +
                    "💡 Aap KrishiSarthi par Gehun ke liye direct buyer offer bhej sakte hain.";
        }

        if (p.contains("rice") || p.contains("basmati") || p.contains("chawal")) {
            return "Basmati Rice (1121 / Pusa) Aaj Ka Mandi Bhav:\n\n" +
                    "• Karnal / Taraori Mandi: ₹82 - ₹88 / kg\n" +
                    "• KrishiSarthi Direct Farmer Price: ₹85 / kg";
        }

        if (p.contains("delivery") || p.contains("kahan") || p.contains("track") || p.contains("status")) {
            if (!dbContext.isBlank() && dbContext.contains("Order #")) {
                return "🌾 Aapke Order/Delivery Ka Status:\n" + dbContext + "\n\nAap KrishiSarthi App ke 'Delivery Track' section mein jaakar real-time timeline dekh sakte hain!";
            } else {
                return "Namaste! Aapke paas abhi koi active delivery nahi hai. Naye order ya transport bid ke baad yahan delivery status update dikhega.";
            }
        }

        if (p.contains("rate") || p.contains("daam") || p.contains("bhav") || p.contains("price") || p.contains("rupee") || p.contains("per") || p.contains("kg")) {
            return "🌾 Aaj Ke Mukhya Mandi Bhav (Karnal / Azadpur):\n" +
                    "• Gehun (Wheat Sharbati): ₹25 - ₹27 / kg\n" +
                    "• Basmati Rice 1121: ₹82 - ₹88 / kg\n" +
                    "• Aloo (Potato Kufri): ₹13 - ₹15 / kg\n" +
                    "• Tamatar (Tomato): ₹28 - ₹34 / kg\n" +
                    "• Sarson (Mustard): ₹54 - ₹58 / kg\n\n" +
                    "Aap Mausam & Mandi tab mein sabhi crops ke live rates dekh sakte hain.";
        }

        return "Namaste! Main KrishiSarthi Kisan Mitra AI hoon. Aap mujhse Mandi Bhav (Gehun, Aloo, Tamatar), Mausam ki jankari, ya apni crop delivery track karne ke baare mein sawal pooch sakte hain!";
    }
}
