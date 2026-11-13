package com.krishisarthi.service;

import com.krishisarthi.dto.TransporterDtos.*;
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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class TransporterService {

    private final TransportRequestRepository transportRequestRepository;
    private final TransporterBidRepository transporterBidRepository;
    private final ShipmentRepository shipmentRepository;
    private final ShipmentEventRepository shipmentEventRepository;
    private final DeliveryProofRepository deliveryProofRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final NotificationRepository notificationRepository;
    private final AuditLogRepository auditLogRepository;
    private final FileUploadUtil fileUploadUtil;
    private final EscrowService escrowService;

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public TransporterService(TransportRequestRepository transportRequestRepository,
                              TransporterBidRepository transporterBidRepository,
                              ShipmentRepository shipmentRepository,
                              ShipmentEventRepository shipmentEventRepository,
                              DeliveryProofRepository deliveryProofRepository,
                              UserRepository userRepository,
                              OrderRepository orderRepository,
                              NotificationRepository notificationRepository,
                              AuditLogRepository auditLogRepository,
                              FileUploadUtil fileUploadUtil,
                              EscrowService escrowService) {
        this.transportRequestRepository = transportRequestRepository;
        this.transporterBidRepository = transporterBidRepository;
        this.shipmentRepository = shipmentRepository;
        this.shipmentEventRepository = shipmentEventRepository;
        this.deliveryProofRepository = deliveryProofRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.notificationRepository = notificationRepository;
        this.auditLogRepository = auditLogRepository;
        this.fileUploadUtil = fileUploadUtil;
        this.escrowService = escrowService;
    }

    @Transactional
    public Map<String, Object> createDirectTransportRequest(Long userId, DirectTransportRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        TransportRequest req = new TransportRequest();
        req.setPickupLocation(request.getPickup_location());
        req.setDeliveryLocation(request.getDelivery_location());
        req.setCropType(request.getCrop_type());
        req.setQuantityKg(request.getQuantity_kg());
        req.setPreferredVehicle(request.getPreferred_vehicle() != null ? request.getPreferred_vehicle() : "Truck");
        req.setPickupDate(LocalDateTime.now().plusDays(1));
        req.setStatus(TransportRequestStatus.OPEN);
        req = transportRequestRepository.save(req);

        // Notify Transporters
        List<User> transporters = userRepository.findByRoleOrderByCreatedAtDesc(UserRole.TRANSPORTER);
        for (User t : transporters) {
            Notification notif = new Notification(
                    t,
                    "🚛 Naya Transport Request Aaya",
                    request.getPickup_location() + " se " + request.getDelivery_location() + " tak " + request.getCrop_type() + " (" + request.getQuantity_kg() + "kg) le jaane ke liye bid lagayein.",
                    "shipment"
            );
            notificationRepository.save(notif);
        }

        AuditLog audit = new AuditLog(user, "CREATE_TRANSPORT_REQUEST", "TransportRequest", req.getId(), "Direct freight request created");
        auditLogRepository.save(audit);

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Transport Request safaltapoorvak publish ho gayi hai! Transporters ab apni gadi aur daam ki bid lagayenge.");
        res.put("request_id", req.getId());
        return res;
    }

    @Transactional(readOnly = true)
    public List<TransportRequestResponse> getOpenRequests() {
        List<TransportRequest> requests = transportRequestRepository.findByStatusInOrderByCreatedAtDesc(
                Arrays.asList(TransportRequestStatus.OPEN, TransportRequestStatus.BIDDING_ACTIVE)
        );

        List<TransportRequestResponse> results = new ArrayList<>();
        for (TransportRequest r : requests) {
            TransportRequestResponse dto = new TransportRequestResponse();
            dto.setId(r.getId());
            dto.setOrder_number(r.getOrder() != null ? r.getOrder().getOrderNumber() : "Direct Request");
            dto.setCrop_type(r.getCropType());
            dto.setQuantity_kg(r.getQuantityKg());
            dto.setPickup_location(r.getPickupLocation());
            dto.setDelivery_location(r.getDeliveryLocation());
            dto.setPickup_date(r.getPickupDate().format(dateFormatter));
            dto.setPreferred_vehicle(r.getPreferredVehicle());
            dto.setStatus(r.getStatus().name());
            dto.setBids_count(r.getBids().size());
            dto.setCreated_at(r.getCreatedAt().format(timeFormatter));
            results.add(dto);
        }

        return results;
    }

    @Transactional
    public Map<String, Object> submitBid(Long transporterId, SubmitBidRequest request) {
        User transporter = userRepository.findById(transporterId)
                .orElseThrow(() -> new ResourceNotFoundException("Transporter not found: " + transporterId));

        if (transporter.getRole() != UserRole.TRANSPORTER && transporter.getRole() != UserRole.ADMIN) {
            throw new ForbiddenException("Only transporters can submit freight bids.");
        }

        TransportRequest req = transportRequestRepository.findById(request.getTransport_request_id())
                .orElseThrow(() -> new ResourceNotFoundException("Transport request not found: " + request.getTransport_request_id()));

        TransporterBid bid = new TransporterBid();
        bid.setTransportRequest(req);
        bid.setTransporter(transporter);
        bid.setBidAmount(request.getBid_amount());
        bid.setVehicleDetails(request.getVehicle_details());
        bid.setEstimatedDeliveryHours(request.getEstimated_delivery_hours() != null ? request.getEstimated_delivery_hours() : 24);
        bid.setNote(request.getNote());
        bid.setIsAccepted(false);
        bid = transporterBidRepository.save(bid);

        req.setStatus(TransportRequestStatus.BIDDING_ACTIVE);
        transportRequestRepository.save(req);

        // Notify Buyer
        if (req.getOrder() != null) {
            Notification notif = new Notification(
                    req.getOrder().getBuyer(),
                    "🚚 Transport Bid Aaya",
                    "Transporter " + transporter.getFullName() + " ne ₹" + request.getBid_amount() + " ka freight bid lagaya hai.",
                    "shipment"
            );
            notificationRepository.save(notif);
        }

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Freight bid safaltapoorvak lagaya gaya!");
        res.put("bid_id", bid.getId());
        return res;
    }

    @Transactional
    public Map<String, Object> selectBid(Long userId, Long requestId, Long bidId) {
        TransportRequest req = transportRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Transport request not found: " + requestId));

        TransporterBid bid = transporterBidRepository.findByIdAndTransportRequestId(bidId, requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Bid not found for this request"));

        bid.setIsAccepted(true);
        transporterBidRepository.save(bid);

        req.setSelectedBidId(bid.getId());
        req.setStatus(TransportRequestStatus.BID_SELECTED);
        transportRequestRepository.save(req);

        String shipmentCode = "FL-SHP-" + UUID.randomUUID().toString().replace("-", "").substring(0, 5).toUpperCase();
        Shipment shipment = new Shipment();
        shipment.setShipmentCode(shipmentCode);
        shipment.setTransportRequest(req);
        shipment.setTransporter(bid.getTransporter());
        shipment.setOrder(req.getOrder());
        shipment.setCurrentStatus(ShipmentStatus.TRANSPORT_ASSIGNED);
        shipment.setEtaText(bid.getEstimatedDeliveryHours() + " Hours");
        shipment = shipmentRepository.save(shipment);

        if (req.getOrder() != null) {
            req.getOrder().setStatus(OrderStatus.TRANSPORT_ASSIGNED);
            orderRepository.save(req.getOrder());
        }

        User user = userRepository.findById(userId).orElse(bid.getTransporter());
        ShipmentEvent event = new ShipmentEvent(
                shipment,
                ShipmentStatus.TRANSPORT_ASSIGNED,
                req.getPickupLocation(),
                "Transporter " + bid.getTransporter().getFullName() + " assigned for shipment.",
                user
        );
        shipmentEventRepository.save(event);

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Transporter chuna gaya! Shipment assign ho gayi hai.");
        res.put("shipment_code", shipmentCode);
        return res;
    }

    @Transactional(readOnly = true)
    public List<ShipmentResponse> getMyShipments(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        List<Shipment> shipments;
        if (user.getRole() == UserRole.TRANSPORTER) {
            shipments = shipmentRepository.findByTransporterOrderByCreatedAtDesc(user);
        } else {
            shipments = shipmentRepository.findAllByOrderByCreatedAtDesc();
        }

        List<ShipmentResponse> results = new ArrayList<>();
        for (Shipment s : shipments) {
            ShipmentResponse dto = new ShipmentResponse();
            dto.setId(s.getId());
            dto.setShipment_code(s.getShipmentCode());
            dto.setOrder_number(s.getOrder() != null ? s.getOrder().getOrderNumber() : "Direct Transport");
            dto.setCurrent_status(s.getCurrentStatus().name());

            TransportRequest req = s.getTransportRequest();
            dto.setPickup_location(req != null ? req.getPickupLocation() : "N/A");
            dto.setDelivery_location(req != null ? req.getDeliveryLocation() : "N/A");
            dto.setCrop_type(req != null ? req.getCropType() : "Goods");
            dto.setTransporter_name(s.getTransporter() != null ? s.getTransporter().getFullName() : "Transporter");
            dto.setCurrent_lat(s.getCurrentLat());
            dto.setCurrent_lng(s.getCurrentLng());
            dto.setEta_text(s.getEtaText());
            dto.setCreated_at(s.getCreatedAt().format(timeFormatter));

            List<ShipmentEventDto> eventDtos = new ArrayList<>();
            for (ShipmentEvent e : s.getEvents()) {
                eventDtos.add(new ShipmentEventDto(
                        e.getStatus().name(),
                        e.getLocation(),
                        e.getNotes(),
                        e.getTimestamp().format(timeFormatter)
                ));
            }
            dto.setEvents(eventDtos);

            if (s.getDeliveryProof() != null) {
                dto.setDelivery_proof(new DeliveryProofDto(
                        s.getDeliveryProof().getPhotoUrl(),
                        s.getDeliveryProof().getRecipientName(),
                        s.getDeliveryProof().getUploadedAt().format(timeFormatter)
                ));
            }

            results.add(dto);
        }

        return results;
    }

    @Transactional
    public Map<String, Object> updateShipmentStatus(Long userId, Long shipmentId, UpdateStatusRequest request) {
        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found: " + shipmentId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        ShipmentStatus newStatus;
        try {
            newStatus = ShipmentStatus.valueOf(request.getStatus().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid shipment status: " + request.getStatus());
        }

        shipment.setCurrentStatus(newStatus);
        if (newStatus == ShipmentStatus.PICKED_UP && shipment.getPickupTime() == null) {
            shipment.setPickupTime(LocalDateTime.now());
        } else if (newStatus == ShipmentStatus.DELIVERED) {
            shipment.setDeliveredTime(LocalDateTime.now());
            if (shipment.getOrder() != null) {
                shipment.getOrder().setStatus(OrderStatus.DELIVERED);
                orderRepository.save(shipment.getOrder());
            }
        }

        if (request.getLatitude() != null && request.getLongitude() != null) {
            shipment.setCurrentLat(request.getLatitude());
            shipment.setCurrentLng(request.getLongitude());
        }

        shipmentRepository.save(shipment);

        ShipmentEvent event = new ShipmentEvent(
                shipment,
                newStatus,
                request.getLocation() != null ? request.getLocation() : "En Route",
                request.getNotes(),
                user
        );
        shipmentEventRepository.save(event);

        if (shipment.getOrder() != null) {
            Notification notif = new Notification(
                    shipment.getOrder().getBuyer(),
                    "🚚 Delivery Status: " + newStatus.name(),
                    "Shipment #" + shipment.getShipmentCode() + " update: " + (request.getNotes() != null ? request.getNotes() : newStatus.name()),
                    "shipment"
            );
            notificationRepository.save(notif);
        }

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Shipment status update ho gaya!");
        res.put("status", newStatus.name());
        return res;
    }

    @Transactional
    public Map<String, Object> uploadDeliveryProof(Long userId, Long shipmentId, String recipientName, String notes, MultipartFile photo) {
        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found: " + shipmentId));

        String photoUrl;
        try {
            photoUrl = fileUploadUtil.saveFile(photo, "delivery_proofs");
        } catch (IOException e) {
            throw new BadRequestException("Failed to upload delivery photo proof: " + e.getMessage());
        }

        DeliveryProof proof = new DeliveryProof(shipment, photoUrl, recipientName, notes);
        deliveryProofRepository.save(proof);

        shipment.setCurrentStatus(ShipmentStatus.DELIVERED);
        shipment.setDeliveredTime(LocalDateTime.now());
        shipmentRepository.save(shipment);

        if (shipment.getOrder() != null) {
            shipment.getOrder().setStatus(OrderStatus.COMPLETED);
            orderRepository.save(shipment.getOrder());

            // Release escrow payout automatically upon delivery proof
            try {
                escrowService.releasePayout(shipment.getOrder().getId());
            } catch (Exception ex) {
                // logged
            }
        }

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Delivery proof uploaded! Delivery completed successfully.");
        res.put("photo_url", photoUrl);
        return res;
    }
}
