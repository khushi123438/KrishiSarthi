package com.krishisarthi.repository;

import com.krishisarthi.entity.Farm;
import com.krishisarthi.entity.FarmerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmRepository extends JpaRepository<Farm, Long> {
    List<Farm> findByFarmer(FarmerProfile farmer);
}
