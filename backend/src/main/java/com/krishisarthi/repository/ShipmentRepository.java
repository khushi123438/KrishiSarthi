package com.krishisarthi.repository;

import com.krishisarthi.entity.Order;
import com.krishisarthi.entity.Shipment;
import com.krishisarthi.entity.TransportRequest;
import com.krishisarthi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    Optional<Shipment> findByShipmentCode(String shipmentCode);
    Optional<Shipment> findByTransportRequest(TransportRequest transportRequest);
    Optional<Shipment> findByOrder(Order order);
    Optional<Shipment> findByOrderId(Long orderId);
    List<Shipment> findByTransporterOrderByCreatedAtDesc(User transporter);
    List<Shipment> findAllByOrderByCreatedAtDesc();
}
