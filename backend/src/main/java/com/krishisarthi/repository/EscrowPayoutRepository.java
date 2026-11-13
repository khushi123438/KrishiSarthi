package com.krishisarthi.repository;

import com.krishisarthi.entity.EscrowPayout;
import com.krishisarthi.entity.EscrowStatus;
import com.krishisarthi.entity.Order;
import com.krishisarthi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EscrowPayoutRepository extends JpaRepository<EscrowPayout, Long> {
    Optional<EscrowPayout> findByOrder(Order order);
    Optional<EscrowPayout> findByOrderId(Long orderId);
    List<EscrowPayout> findByFarmerOrderByHeldAtDesc(User farmer);
    List<EscrowPayout> findByStatusOrderByHeldAtDesc(EscrowStatus status);
}
