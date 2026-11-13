package com.krishisarthi.repository;

import com.krishisarthi.entity.Shipment;
import com.krishisarthi.entity.ShipmentEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShipmentEventRepository extends JpaRepository<ShipmentEvent, Long> {
    List<ShipmentEvent> findByShipmentOrderByTimestampAsc(Shipment shipment);
    List<ShipmentEvent> findByShipmentIdOrderByTimestampAsc(Long shipmentId);
}
