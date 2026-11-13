package com.krishisarthi.repository;

import com.krishisarthi.entity.Order;
import com.krishisarthi.entity.OrderStatus;
import com.krishisarthi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderNumber(String orderNumber);
    List<Order> findByBuyerOrderByCreatedAtDesc(User buyer);
    List<Order> findByFarmerOrderByCreatedAtDesc(User farmer);
    List<Order> findByBuyerOrFarmerOrderByCreatedAtDesc(User buyer, User farmer);
    List<Order> findAllByOrderByCreatedAtDesc();

    long countByStatusIn(Collection<OrderStatus> statuses);

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0.0) FROM Order o WHERE o.status IN ('PAID', 'TRANSPORT_ASSIGNED', 'IN_TRANSIT', 'DELIVERED', 'COMPLETED')")
    Double calculateGrossMerchandiseValue();
}
