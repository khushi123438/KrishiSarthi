package com.krishisarthi.repository;

import com.krishisarthi.entity.DeliveryProof;
import com.krishisarthi.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeliveryProofRepository extends JpaRepository<DeliveryProof, Long> {
    Optional<DeliveryProof> findByShipment(Shipment shipment);
    Optional<DeliveryProof> findByShipmentId(Long shipmentId);
}
