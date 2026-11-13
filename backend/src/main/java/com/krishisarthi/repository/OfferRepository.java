package com.krishisarthi.repository;

import com.krishisarthi.entity.CropListing;
import com.krishisarthi.entity.Offer;
import com.krishisarthi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findByFarmerOrderByCreatedAtDesc(User farmer);
    List<Offer> findByBuyerOrderByCreatedAtDesc(User buyer);
    List<Offer> findByCropListingOrderByCreatedAtDesc(CropListing cropListing);
}
