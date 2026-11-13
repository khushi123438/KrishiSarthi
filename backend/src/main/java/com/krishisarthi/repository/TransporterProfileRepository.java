package com.krishisarthi.repository;

import com.krishisarthi.entity.TransporterProfile;
import com.krishisarthi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransporterProfileRepository extends JpaRepository<TransporterProfile, Long> {
    Optional<TransporterProfile> findByUser(User user);
    Optional<TransporterProfile> findByUserId(Long userId);
}
