package com.krishisarthi.service;

import com.krishisarthi.dto.EscrowDtos.*;
import com.krishisarthi.entity.*;
import com.krishisarthi.exception.BadRequestException;
import com.krishisarthi.exception.ResourceNotFoundException;
import com.krishisarthi.repository.EscrowPayoutRepository;
import com.krishisarthi.repository.NotificationRepository;
import com.krishisarthi.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
public class EscrowService {

    private final EscrowPayoutRepository escrowPayoutRepository;
    private final OrderRepository orderRepository;
    private final NotificationRepository notificationRepository;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public EscrowService(EscrowPayoutRepository escrowPayoutRepository,
                         OrderRepository orderRepository,
                         NotificationRepository notificationRepository) {
        this.escrowPayoutRepository = escrowPayoutRepository;
        this.orderRepository = orderRepository;
        this.notificationRepository = notificationRepository;
    }

    @Transactional
    public EscrowPayout holdInEscrow(Order order) {
        double platformFee = Math.round(order.getTotalAmount() * 0.02 * 100.0) / 100.0;
        double netPayout = order.getTotalAmount() - platformFee;

        EscrowPayout payout = escrowPayoutRepository.findByOrderId(order.getId()).orElseGet(() -> {
            EscrowPayout p = new EscrowPayout();
            p.setOrder(order);
            p.setFarmer(order.getFarmer());
            p.setAmount(order.getTotalAmount());
            p.setPlatformFee(platformFee);
            p.setNetPayout(netPayout);
            p.setStatus(EscrowStatus.HELD_IN_ESCROW);
            p.setHeldAt(LocalDateTime.now());
            return p;
        });

        return escrowPayoutRepository.save(payout);
    }

    @Transactional
    public EscrowPayoutResponse releasePayout(Long orderId) {
        EscrowPayout payout = escrowPayoutRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Escrow record not found for order: " + orderId));

        if (payout.getStatus() == EscrowStatus.SETTLED) {
            return mapToDto(payout);
        }

        payout.setStatus(EscrowStatus.SETTLED);
        payout.setReleasedAt(LocalDateTime.now());
        String settlementRef = "SETTL-UPI-" + UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();
        payout.setSettlementReference(settlementRef);
        payout = escrowPayoutRepository.save(payout);

        Notification notif = new Notification(
                payout.getFarmer(),
                "💵 Payout Settled to Bank/UPI!",
                "Order #" + payout.getOrder().getOrderNumber() + " ka net payout ₹" + payout.getNetPayout() + " aapke registered account mein transfer ho gaya hai. Ref: " + settlementRef,
                "payment"
        );
        notificationRepository.save(notif);

        return mapToDto(payout);
    }

    @Transactional(readOnly = true)
    public EscrowPayoutResponse getEscrowForOrder(Long orderId) {
        EscrowPayout payout = escrowPayoutRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Escrow record not found for order: " + orderId));
        return mapToDto(payout);
    }

    private EscrowPayoutResponse mapToDto(EscrowPayout payout) {
        EscrowPayoutResponse dto = new EscrowPayoutResponse();
        dto.setId(payout.getId());
        dto.setOrder_id(payout.getOrder().getId());
        dto.setOrder_number(payout.getOrder().getOrderNumber());
        dto.setFarmer_name(payout.getFarmer().getFullName());
        dto.setTotal_amount(payout.getAmount());
        dto.setPlatform_fee(payout.getPlatformFee());
        dto.setNet_payout(payout.getNetPayout());
        dto.setStatus(payout.getStatus().name());
        dto.setSettlement_reference(payout.getSettlementReference());
        dto.setHeld_at(payout.getHeldAt() != null ? payout.getHeldAt().format(formatter) : null);
        dto.setReleased_at(payout.getReleasedAt() != null ? payout.getReleasedAt().format(formatter) : null);
        return dto;
    }
}
