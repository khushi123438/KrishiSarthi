package com.krishisarthi.repository;

import com.krishisarthi.entity.CropListing;
import com.krishisarthi.entity.CropListingStatus;
import com.krishisarthi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropListingRepository extends JpaRepository<CropListing, Long> {

    List<CropListing> findByFarmerAndStatusNotOrderByCreatedAtDesc(User farmer, CropListingStatus status);

    List<CropListing> findByFarmerOrderByCreatedAtDesc(User farmer);

    List<CropListing> findByStatusOrderByCreatedAtDesc(CropListingStatus status);

    @Query("SELECT c FROM CropListing c WHERE c.status = :status " +
           "AND (:crop IS NULL OR LOWER(c.cropName) LIKE LOWER(CONCAT('%', :crop, '%'))) " +
           "AND (:variety IS NULL OR LOWER(c.variety) LIKE LOWER(CONCAT('%', :variety, '%'))) " +
           "AND (:district IS NULL OR LOWER(c.locationDistrict) LIKE LOWER(CONCAT('%', :district, '%'))) " +
           "AND (:state IS NULL OR LOWER(c.locationState) LIKE LOWER(CONCAT('%', :state, '%'))) " +
           "AND (:minPrice IS NULL OR c.expectedPricePerUnit >= :minPrice) " +
           "AND (:maxPrice IS NULL OR c.expectedPricePerUnit <= :maxPrice) " +
           "AND (:qualityGrade IS NULL OR c.qualityGrade = :qualityGrade) " +
           "ORDER BY c.createdAt DESC")
    List<CropListing> searchMarketplace(
            @Param("status") CropListingStatus status,
            @Param("crop") String crop,
            @Param("variety") String variety,
            @Param("district") String district,
            @Param("state") String state,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("qualityGrade") String qualityGrade
    );

    long countByStatus(CropListingStatus status);
}
