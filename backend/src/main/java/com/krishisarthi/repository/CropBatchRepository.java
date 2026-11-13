package com.krishisarthi.repository;

import com.krishisarthi.entity.CropBatch;
import com.krishisarthi.entity.CropListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CropBatchRepository extends JpaRepository<CropBatch, Long> {
    Optional<CropBatch> findByBatchCode(String batchCode);
    Optional<CropBatch> findByCropListing(CropListing cropListing);
}
