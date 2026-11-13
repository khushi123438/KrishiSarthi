package com.krishisarthi.repository;

import com.krishisarthi.entity.Order;
import com.krishisarthi.entity.TransportRequest;
import com.krishisarthi.entity.TransportRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransportRequestRepository extends JpaRepository<TransportRequest, Long> {
    Optional<TransportRequest> findByOrder(Order order);
    Optional<TransportRequest> findByOrderId(Long orderId);
    List<TransportRequest> findByStatusInOrderByCreatedAtDesc(Collection<TransportRequestStatus> statuses);
    List<TransportRequest> findAllByOrderByCreatedAtDesc();
}
