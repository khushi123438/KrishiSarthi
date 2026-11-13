package com.krishisarthi.repository;

import com.krishisarthi.entity.Negotiation;
import com.krishisarthi.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NegotiationRepository extends JpaRepository<Negotiation, Long> {
    List<Negotiation> findByOfferOrderByCreatedAtAsc(Offer offer);
}
