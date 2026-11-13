package com.krishisarthi.service;

import com.krishisarthi.dto.FarmerDtos.*;
import com.krishisarthi.entity.*;
import com.krishisarthi.exception.BadRequestException;
import com.krishisarthi.exception.ForbiddenException;
import com.krishisarthi.exception.ResourceNotFoundException;
import com.krishisarthi.repository.*;
import com.krishisarthi.util.FileUploadUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class FarmerService {

    private final CropListingRepository cropListingRepository;
    private final CropImageRepository cropImageRepository;
    private final CropBatchRepository cropBatchRepository;
    private final TraceabilityEventRepository traceabilityEventRepository;
    private final OfferRepository offerRepository;
    private final NegotiationRepository negotiationRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final AuditLogRepository auditLogRepository;
    private final FileUploadUtil fileUploadUtil;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public FarmerService(CropListingRepository cropListingRepository,
                         CropImageRepository cropImageRepository,
                         CropBatchRepository cropBatchRepository,
                         TraceabilityEventRepository traceabilityEventRepository,
                         OfferRepository offerRepository,
                         NegotiationRepository negotiationRepository,
                         OrderRepository orderRepository,
                         UserRepository userRepository,
                         NotificationRepository notificationRepository,
                         AuditLogRepository auditLogRepository,
                         FileUploadUtil fileUploadUtil) {
        this.cropListingRepository = cropListingRepository;
        this.cropImageRepository = cropImageRepository;
        this.cropBatchRepository = cropBatchRepository;
        this.traceabilityEventRepository = traceabilityEventRepository;
        this.offerRepository = offerRepository;
        this.negotiationRepository = negotiationRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
        this.auditLogRepository = auditLogRepository;
        this.fileUploadUtil = fileUploadUtil;
    }

    @Transactional
    public Map<String, Object> createCropListing(Long farmerId, CropListingRequest request, List<MultipartFile> images) {
        User farmer = userRepository.findById(farmerId)
                .orElseThrow(() -> new ResourceNotFoundException("Farmer not found: " + farmerId));

        if (farmer.getRole() != UserRole.FARMER) {
            throw new ForbiddenException("Only farmers can create crop listings.");
        }

        CropListing listing = new CropListing();
        listing.setFarmer(farmer);
        listing.setCropName(request.getCrop_name());
        listing.setVariety(request.getVariety());
        listing.setQuantity(request.getQuantity());
        listing.setUnit(request.getUnit() != null ? request.getUnit() : "kg");
        listing.setExpectedPricePerUnit(request.getExpected_price_per_unit());
        listing.setQualityGrade(request.getQuality_grade() != null ? request.getQuality_grade() : "Grade A");
        listing.setLocationDistrict(request.getLocation_district() != null ? request.getLocation_district() : "Karnal");
        listing.setLocationState(request.getLocation_state() != null ? request.getLocation_state() : "Haryana");
        listing.setDescription(request.getDescription());
        listing.setStatus(CropListingStatus.PUBLISHED);

        listing = cropListingRepository.save(listing);

        // Save images
        List<String> savedImages = new ArrayList<>();
        if (images != null && !images.isEmpty()) {
            int idx = 0;
            for (MultipartFile img : images) {
                if (img != null && !img.isEmpty()) {
                    try {
                        String url = fileUploadUtil.saveFile(img, "crops");
                        CropImage cropImage = new CropImage(listing, url, idx == 0);
                        cropImageRepository.save(cropImage);
                        savedImages.add(url);
                        idx++;
                    } catch (IOException e) {
                        // fallback
                    }
                }
            }
        }

        if (savedImages.isEmpty()) {
            String defaultUrl = "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80";
            String cropLower = request.getCrop_name().toLowerCase();
            if (cropLower.contains("rice") || cropLower.contains("chawal") || cropLower.contains("basmati")) {
                defaultUrl = "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80";
            } else if (cropLower.contains("aloo") || cropLower.contains("potato")) {
                defaultUrl = "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80";
            }
            CropImage cropImage = new CropImage(listing, defaultUrl, true);
            cropImageRepository.save(cropImage);
        }

        // Generate Batch & Traceability
        String cropCode = request.getCrop_name().length() >= 3 ? request.getCrop_name().substring(0, 3).toUpperCase() : "AGR";
        String stateCode = request.getLocation_state() != null && request.getLocation_state().length() >= 2
                ? request.getLocation_state().substring(0, 2).toUpperCase() : "IN";
        String uuidPart = UUID.randomUUID().toString().replace("-", "").substring(0, 6).toUpperCase();
        String batchCode = "FL-" + cropCode + "-" + stateCode + "-2026-" + uuidPart;

        CropBatch batch = new CropBatch(
                batchCode,
                listing,
                farmer,
                listing.getLocationDistrict() + ", " + listing.getLocationState(),
                "/trace.html?batch=" + batchCode
        );
        cropBatchRepository.save(batch);

        TraceabilityEvent event = new TraceabilityEvent(
                batch,
                "Farm Harvest & Listing",
                listing.getLocationDistrict() + ", " + listing.getLocationState(),
                "Listed " + listing.getQuantity() + " " + listing.getUnit() + " of " + listing.getCropName() + " (" + listing.getVariety() + ") by farmer " + farmer.getFullName() + ".",
                farmer.getFullName()
        );
        traceabilityEventRepository.save(event);

        AuditLog audit = new AuditLog(farmer, "CREATE_CROP_LISTING", "CropListing", listing.getId(), "Listing created: " + listing.getCropName());
        auditLogRepository.save(audit);

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Fasal bechein listing safaltapoorvak publish ho gayi hai!");
        res.put("listing_id", listing.getId());
        res.put("batch_code", batchCode);
        res.put("crop_name", listing.getCropName());
        return res;
    }

    @Transactional(readOnly = true)
    public List<CropListingResponse> getMyListings(Long farmerId) {
        User farmer = userRepository.findById(farmerId)
                .orElseThrow(() -> new ResourceNotFoundException("Farmer not found: " + farmerId));

        List<CropListing> listings = cropListingRepository.findByFarmerAndStatusNotOrderByCreatedAtDesc(farmer, CropListingStatus.CANCELLED);
        List<CropListingResponse> responseList = new ArrayList<>();

        for (CropListing l : listings) {
            CropListingResponse dto = new CropListingResponse();
            dto.setId(l.getId());
            dto.setCrop_name(l.getCropName());
            dto.setVariety(l.getVariety());
            dto.setQuantity(l.getQuantity());
            dto.setUnit(l.getUnit());
            dto.setExpected_price(l.getExpectedPricePerUnit());
            dto.setQuality_grade(l.getQualityGrade());
            dto.setLocation(l.getLocationDistrict() + ", " + l.getLocationState());
            dto.setStatus(l.getStatus().name());

            List<String> imgUrls = new ArrayList<>();
            for (CropImage img : l.getImages()) {
                imgUrls.add(img.getImageUrl());
            }
            dto.setImages(imgUrls);
            dto.setOffers_count(l.getOffers().size());
            dto.setBatch_code(l.getBatch() != null ? l.getBatch().getBatchCode() : null);
            dto.setCreated_at(l.getCreatedAt().format(formatter));

            responseList.add(dto);
        }

        return responseList;
    }

    @Transactional
    public Map<String, Object> deleteListing(Long farmerId, Long listingId) {
        CropListing listing = cropListingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found: " + listingId));

        if (!listing.getFarmer().getId().equals(farmerId)) {
            throw new ForbiddenException("Unauthorized: You do not own this listing.");
        }

        listing.setStatus(CropListingStatus.CANCELLED);
        cropListingRepository.save(listing);

        AuditLog audit = new AuditLog(listing.getFarmer(), "DELETE_CROP_LISTING", "CropListing", listing.getId(), "Listing deleted: " + listing.getCropName());
        auditLogRepository.save(audit);

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Fasal listing safaltapoorvak delete kar di gayi hai!");
        return res;
    }

    @Transactional(readOnly = true)
    public List<FarmerOfferResponse> getFarmerOffers(Long farmerId) {
        User farmer = userRepository.findById(farmerId)
                .orElseThrow(() -> new ResourceNotFoundException("Farmer not found: " + farmerId));

        List<Offer> offers = offerRepository.findByFarmerOrderByCreatedAtDesc(farmer);
        List<FarmerOfferResponse> responseList = new ArrayList<>();

        for (Offer o : offers) {
            FarmerOfferResponse dto = new FarmerOfferResponse();
            dto.setId(o.getId());
            dto.setCrop_listing_id(o.getCropListing().getId());
            dto.setCrop_name(o.getCropListing().getCropName());
            dto.setBuyer_name(o.getBuyer().getFullName());
            dto.setOffered_price(o.getOfferedPricePerUnit());
            dto.setOffered_quantity(o.getOfferedQuantity());
            dto.setTotalAmount(o.getTotalAmount());
            dto.setStatus(o.getStatus().name());
            dto.setLast_action_by_me(o.getLastActionBy().getId().equals(farmerId));
            dto.setCreated_at(o.getCreatedAt().format(formatter));

            List<NegotiationItem> negList = new ArrayList<>();
            for (Negotiation n : o.getNegotiations()) {
                NegotiationItem item = new NegotiationItem();
                item.setId(n.getId());
                item.setSender(n.getSender().getFullName());
                item.setPrice(n.getProposedPricePerUnit());
                item.setAction(n.getAction());
                item.setMessage(n.getMessage());
                item.setCreated_at(n.getCreatedAt().format(formatter));
                negList.add(item);
            }
            dto.setNegotiations(negList);
            responseList.add(dto);
        }

        return responseList;
    }

    @Transactional
    public Map<String, Object> respondToOffer(Long farmerId, Long offerId, OfferActionRequest request) {
        Offer offer = offerRepository.findById(offerId)
                .orElseThrow(() -> new ResourceNotFoundException("Offer not found: " + offerId));

        if (!offer.getFarmer().getId().equals(farmerId)) {
            throw new ForbiddenException("Unauthorized: You do not own this offer.");
        }

        User farmer = offer.getFarmer();
        String action = request.getAction().toUpperCase();
        Map<String, Object> result = new HashMap<>();

        if ("ACCEPT".equals(action)) {
            offer.setStatus(OfferStatus.ACCEPTED);
            offer.setLastActionBy(farmer);

            Negotiation neg = new Negotiation(
                    offer,
                    farmer,
                    offer.getOfferedPricePerUnit(),
                    offer.getOfferedQuantity(),
                    "ACCEPT",
                    request.getNote() != null ? request.getNote() : "Farmer accepted the price offer."
            );
            negotiationRepository.save(neg);

            if (offer.getCropListing() != null) {
                offer.getCropListing().setStatus(CropListingStatus.SOLD);
                cropListingRepository.save(offer.getCropListing());
            }

            String orderNumber = "FL-ORD-" + UUID.randomUUID().toString().replace("-", "").substring(0, 5).toUpperCase();
            Order order = new Order();
            order.setOrderNumber(orderNumber);
            order.setOffer(offer);
            order.setCropListing(offer.getCropListing());
            order.setFarmer(farmer);
            order.setBuyer(offer.getBuyer());
            order.setQuantity(offer.getOfferedQuantity());
            order.setUnit(offer.getCropListing() != null ? offer.getCropListing().getUnit() : "kg");
            order.setPricePerUnit(offer.getOfferedPricePerUnit());
            order.setTotalAmount(offer.getTotalAmount());
            order.setStatus(OrderStatus.CONFIRMED);
            orderRepository.save(order);

            Notification notif = new Notification(
                    offer.getBuyer(),
                    "🎉 Offer Swikaar (Accepted)!",
                    "Kisan " + farmer.getFullName() + " ne aapka Order #" + orderNumber + " accept kar liya hai! Ab aap payment kar sakte hain.",
                    "order"
            );
            notificationRepository.save(notif);

            result.put("message", "Offer swikaar kiya gaya! Order taiyar hai.");
            result.put("order_number", orderNumber);
            result.put("status", "ACCEPTED");

        } else if ("COUNTER".equals(action)) {
            if (request.getCounter_price() == null || request.getCounter_price() <= 0) {
                throw new BadRequestException("Valid counter price required.");
            }

            offer.setStatus(OfferStatus.COUNTERED);
            offer.setOfferedPricePerUnit(request.getCounter_price());
            offer.setTotalAmount(request.getCounter_price() * offer.getOfferedQuantity());
            offer.setLastActionBy(farmer);

            Negotiation neg = new Negotiation(
                    offer,
                    farmer,
                    request.getCounter_price(),
                    offer.getOfferedQuantity(),
                    "COUNTER_OFFER",
                    request.getNote() != null ? request.getNote() : "Farmer countered at ₹" + request.getCounter_price() + "/kg"
            );
            negotiationRepository.save(neg);

            Notification notif = new Notification(
                    offer.getBuyer(),
                    "💰 Counter Offer Aaya Hai",
                    "Kisan " + farmer.getFullName() + " ne ₹" + request.getCounter_price() + "/kg ka counter offer diya hai.",
                    "offer"
            );
            notificationRepository.save(notif);

            result.put("message", "Counter offer ₹" + request.getCounter_price() + "/kg bhej diya gaya.");
            result.put("status", "COUNTERED");

        } else if ("REJECT".equals(action)) {
            offer.setStatus(OfferStatus.REJECTED);
            offer.setLastActionBy(farmer);

            Negotiation neg = new Negotiation(
                    offer,
                    farmer,
                    offer.getOfferedPricePerUnit(),
                    offer.getOfferedQuantity(),
                    "REJECT",
                    request.getNote() != null ? request.getNote() : "Farmer declined offer."
            );
            negotiationRepository.save(neg);

            result.put("message", "Offer aswikaar (rejected) kiya gaya.");
            result.put("status", "REJECTED");
        } else {
            throw new BadRequestException("Invalid action: " + action + ". Use ACCEPT, COUNTER, or REJECT.");
        }

        offerRepository.save(offer);
        return result;
    }
}
