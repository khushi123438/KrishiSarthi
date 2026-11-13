package com.krishisarthi.repository;

import com.krishisarthi.entity.Dispute;
import com.krishisarthi.entity.DisputeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface DisputeRepository extends JpaRepository<Dispute, Long> {
    Optional<Dispute> findByDisputeNumber(String disputeNumber);
    List<Dispute> findAllByOrderByCreatedAtDesc();
    long countByStatusIn(Collection<DisputeStatus> statuses);
}
