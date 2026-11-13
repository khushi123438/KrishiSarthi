package com.krishisarthi.repository;

import com.krishisarthi.entity.TransportRequest;
import com.krishisarthi.entity.TransporterBid;
import com.krishisarthi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransporterBidRepository extends JpaRepository<TransporterBid, Long> {
    List<TransporterBid> findByTransportRequest(TransportRequest transportRequest);
    List<TransporterBid> findByTransportRequestId(Long transportRequestId);
    List<TransporterBid> findByTransporterOrderByCreatedAtDesc(User transporter);
    Optional<TransporterBid> findByIdAndTransportRequestId(Long id, Long transportRequestId);
}
