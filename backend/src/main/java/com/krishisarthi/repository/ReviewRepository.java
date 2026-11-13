package com.krishisarthi.repository;

import com.krishisarthi.entity.Order;
import com.krishisarthi.entity.Review;
import com.krishisarthi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByOrder(Order order);
    List<Review> findByRevieweeOrderByCreatedAtDesc(User reviewee);
}
