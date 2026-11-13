package com.krishisarthi.service;

import com.krishisarthi.dto.BuyerDtos.*;
import com.krishisarthi.entity.*;
import com.krishisarthi.exception.BadRequestException;
import com.krishisarthi.exception.ForbiddenException;
import com.krishisarthi.exception.ResourceNotFoundException;
import com.krishisarthi.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class BuyerService {

    private final CropListingRepository cropListingRepository;
    private final OfferRepository offerRepository;
    private final NegotiationRepository negotiationRepository;
    private final OrderRepository orderRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public BuyerService(CropListingRepository cropListingRepository,
                        OfferRepository offerRepository,
                        NegotiationRepository negotiationRepository,
                        OrderRepository orderRepository,
                        ReviewRepository reviewRepository,
                        UserRepository userRepository,
                        NotificationRepository notificationRepository) {
        this.cropListingRepository = cropListingRepository;
        this.offerRepository = offerRepository;
        this.negotiationRepository = negotiationRepository;
        this.orderRepository = orderRepository;
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
    }

    @Transactional(readOnly = true)
    public List<MarketplaceItemResponse> searchMarketplace(String crop, String variety, String district, String state,
                                                          Double minPrice, Double maxPrice, String qualityGrade) {
        List<CropListing> listings = cropListingRepository.searchMarketplace(
                CropListingStatus.PUBLISHED, crop, variety, district, state, minPrice, maxPrice, qualityGrade
        );

        List<MarketplaceItemResponse> results = new ArrayList<>();
        for (CropListing l : listings) {
            MarketplaceItemResponse dto = new MarketplaceItemResponse();
            dto.setId(l.getId());
            dto.setCrop_name(l.getCropName());
            dto.setVariety(l.getVariety());
            dto.setQuantity(l.getQuantity());
            dto.setUnit(l.getUnit());
            dto.setExpected_price(l.getExpectedPricePerUnit());
            dto.setQuality_grade(l.getQualityGrade());
            dto.setLocation_district(l.getLocationDistrict());
            dto.setLocation_state(l.getLocationState());
            dto.setDescription(l.getDescription());

            List<String> imgs = new ArrayList<>();
            for (CropImage img : l.getImages()) {
                imgs.add(img.getImageUrl());
            }
            dto.setImages(imgs);
            dto.setPrimary_image(!imgs.isEmpty() ? imgs.get(0) : "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80");

            User farmer = l.getFarmer();
            dto.setFarmer_id(farmer.getId());
            dto.setFarmer_name(farmer.getFullName());
            dto.setIs_farmer_verified(Boolean.TRUE.equals(farmer.getIsVerified()));
            dto.setFarmer_rating(farmer.getFarmerProfile() != null ? farmer.getFarmerProfile().getRating() : 4.8);
            dto.setBatch_code(l.getBatch() != null ? l.getBatch().getBatchCode() : null);
            dto.setCreated_at(l.getCreatedAt().format(dateFormatter));

            results.add(dto);
        }

        return results;
    }

    @Transactional
    public Map<String, Object> getListingDetails(Long listingId) {
        CropListing l = cropListingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found: " + listingId));

        l.setViewsCount(l.getViewsCount() + 1);
        cropListingRepository.save(l);

        User farmer = l.getFarmer();
        List<String> imgs = new ArrayList<>();
        for (CropImage img : l.getImages()) {
            imgs.add(img.getImageUrl());
        }

        Map<String, Object> farmerMap = new HashMap<>();
        farmerMap.put("id", farmer.getId());
        farmerMap.put("name", farmer.getFullName());
        farmerMap.put("mobile", farmer.getMobile());
        farmerMap.put("is_verified", farmer.getIsVerified());
        farmerMap.put("rating", farmer.getFarmerProfile() != null ? farmer.getFarmerProfile().getRating() : 5.0);
        farmerMap.put("sales_count", farmer.getFarmerProfile() != null ? farmer.getFarmerProfile().getTotalSalesCount() : 0);

        Map<String, Object> res = new HashMap<>();
        res.put("id", l.getId());
        res.put("crop_name", l.getCropName());
        res.put("variety", l.getVariety());
        res.put("quantity", l.getQuantity());
        res.put("unit", l.getUnit());
        res.put("expected_price", l.getExpectedPricePerUnit());
        res.put("quality_grade", l.getQualityGrade());
        res.put("location", l.getLocationDistrict() + ", " + l.getLocationState());
        res.put("description", l.getDescription());
        res.put("status", l.getStatus().name());
        res.put("images", imgs);
        res.put("farmer", farmerMap);
        res.put("batch_code", l.getBatch() != null ? l.getBatch().getBatchCode() : null);

        return res;
    }

    @Transactional
    public Map<String, Object> makeOffer(Long buyerId, MakeOfferRequest request) {
        User buyer = userRepository.findById(buyerId)
                .orElseThrow(() -> new ResourceNotFoundException("Buyer not found: " + buyerId));

        if (buyer.getRole() != UserRole.BUYER && buyer.getRole() != UserRole.ADMIN) {
            throw new ForbiddenException("Only buyers can submit price offers.");
        }

        CropListing listing = cropListingRepository.findById(request.getCrop_listing_id())
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found: " + request.getCrop_listing_id()));

        if (listing.getStatus() != CropListingStatus.PUBLISHED) {
            throw new BadRequestException("This crop listing is no longer accepting offers.");
        }

        Double totalAmount = request.getOffered_price_per_unit() * request.getOffered_quantity();

        Offer offer = new Offer();
        offer.setCropListing(listing);
        offer.setBuyer(buyer);
        offer.setFarmer(listing.getFarmer());
        offer.setOfferedPricePerUnit(request.getOffered_price_per_unit());
        offer.setOfferedQuantity(request.getOffered_quantity());
        offer.setTotalAmount(totalAmount);
        offer.setStatus(OfferStatus.PENDING);
        offer.setLastActionBy(buyer);
        offer.setNote(request.getNote());
        offer = offerRepository.save(offer);

        Negotiation neg = new Negotiation(
                offer,
                buyer,
                request.getOffered_price_per_unit(),
                request.getOffered_quantity(),
                "MAKE_OFFER",
                request.getNote() != null ? request.getNote() : "Initial offer submitted at ₹" + request.getOffered_price_per_unit() + "/kg"
        );
        negotiationRepository.save(neg);

        Notification notif = new Notification(
                listing.getFarmer(),
                "🤝 Naya Offer Aaya!",
                buyer.getFullName() + " ne aapki " + listing.getCropName() + " par ₹" + request.getOffered_price_per_unit() + "/kg ka prastaav bheja hai.",
                "offer"
        );
        notificationRepository.save(notif);

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Daam ka prastaav safaltapoorvak bhej diya gaya!");
        res.put("offer_id", offer.getId());
        res.put("status", "PENDING");
        return res;
    }

    @Transactional(readOnly = true)
    public List<BuyerOrderResponse> getBuyerOrders(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        List<Order> orders;
        if (user.getRole() == UserRole.BUYER) {
            orders = orderRepository.findByBuyerOrderByCreatedAtDesc(user);
        } else {
            orders = orderRepository.findByFarmerOrderByCreatedAtDesc(user);
        }

        List<BuyerOrderResponse> results = new ArrayList<>();
        for (Order o : orders) {
            BuyerOrderResponse dto = new BuyerOrderResponse();
            dto.setId(o.getId());
            dto.setOrder_number(o.getOrderNumber());
            dto.setCrop_name(o.getCropListing() != null ? o.getCropListing().getCropName() : "Crop");
            dto.setFarmer_name(o.getFarmer().getFullName());
            dto.setBuyer_name(o.getBuyer().getFullName());
            dto.setQuantity(o.getQuantity());
            dto.setUnit(o.getUnit());
            dto.setPrice_per_unit(o.getPricePerUnit());
            dto.setTotalAmount(o.getTotalAmount());
            dto.setStatus(o.getStatus().name());

            Payment pmt = o.getPayment();
            dto.setPayment_status(pmt != null ? pmt.getStatus().name() : "PENDING");

            TransportRequest tReq = o.getTransportRequest();
            String shipmentStatus = "NOT_REQUESTED";
            String shipmentCode = null;
            if (tReq != null) {
                shipmentStatus = tReq.getStatus().name();
                if (tReq.getShipment() != null) {
                    shipmentStatus = tReq.getShipment().getCurrentStatus().name();
                    shipmentCode = tReq.getShipment().getShipmentCode();
                }
            }
            dto.setShipment_status(shipmentStatus);
            dto.setShipment_code(shipmentCode);
            dto.setCreated_at(o.getCreatedAt().format(timeFormatter));

            results.add(dto);
        }

        return results;
    }

    @Transactional
    public Map<String, Object> submitReview(Long reviewerId, ReviewRequest request) {
        Order order = orderRepository.findById(request.getOrder_id())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + request.getOrder_id()));

        if (!reviewerId.equals(order.getBuyer().getId()) && !reviewerId.equals(order.getFarmer().getId())) {
            throw new ForbiddenException("You can only review participants of completed transactions.");
        }

        User reviewer = userRepository.findById(reviewerId).orElseThrow();
        User reviewee = userRepository.findById(request.getReviewee_id())
                .orElseThrow(() -> new ResourceNotFoundException("Reviewee not found: " + request.getReviewee_id()));

        int rating = Math.max(1, Math.min(5, request.getRating()));
        Review review = new Review(order, reviewer, reviewee, rating, request.getComment());
        reviewRepository.save(review);

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Samiksha (Review) safaltapoorvak save ho gayi!");
        return res;
    }
}
