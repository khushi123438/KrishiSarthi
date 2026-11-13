package com.krishisarthi.repository;

import com.krishisarthi.entity.CropImage;
import com.krishisarthi.entity.CropListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropImageRepository extends JpaRepository<CropImage, Long> {
    List<CropImage> findByCropListing(CropListing cropListing);
}
