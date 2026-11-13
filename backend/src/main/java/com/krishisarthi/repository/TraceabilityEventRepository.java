package com.krishisarthi.repository;

import com.krishisarthi.entity.CropBatch;
import com.krishisarthi.entity.TraceabilityEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TraceabilityEventRepository extends JpaRepository<TraceabilityEvent, Long> {
    List<TraceabilityEvent> findByBatchOrderByTimestampAsc(CropBatch batch);
    List<TraceabilityEvent> findByBatchIdOrderByTimestampAsc(Long batchId);
}
