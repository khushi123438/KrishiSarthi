package com.krishisarthi.service;

import com.krishisarthi.dto.TraceabilityDtos.*;
import com.krishisarthi.entity.CropBatch;
import com.krishisarthi.entity.CropListing;
import com.krishisarthi.entity.TraceabilityEvent;
import com.krishisarthi.exception.ResourceNotFoundException;
import com.krishisarthi.repository.CropBatchRepository;
import com.krishisarthi.repository.TraceabilityEventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class TraceabilityService {

    private final CropBatchRepository cropBatchRepository;
    private final TraceabilityEventRepository traceabilityEventRepository;

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public TraceabilityService(CropBatchRepository cropBatchRepository,
                               TraceabilityEventRepository traceabilityEventRepository) {
        this.cropBatchRepository = cropBatchRepository;
        this.traceabilityEventRepository = traceabilityEventRepository;
    }

    @Transactional(readOnly = true)
    public TraceabilityResponse getBatchTraceability(String batchCode) {
        CropBatch batch = cropBatchRepository.findByBatchCode(batchCode)
                .orElseThrow(() -> new ResourceNotFoundException("Batch ID not found in KrishiSarthi Traceability Registry: " + batchCode));

        CropListing listing = batch.getCropListing();
        List<TraceabilityEvent> events = traceabilityEventRepository.findByBatchOrderByTimestampAsc(batch);

        TraceabilityResponse res = new TraceabilityResponse();
        res.setBatch_code(batch.getBatchCode());
        res.setCrop_name(listing != null ? listing.getCropName() : "Agricultural Crop");
        res.setVariety(listing != null ? listing.getVariety() : "Standard");
        res.setOrigin_location(batch.getOriginLocation());
        res.setQuality_grade(listing != null ? listing.getQualityGrade() : "Grade A");
        res.setHarvest_date(batch.getHarvestDate() != null ? batch.getHarvestDate().format(dateFormatter) : "N/A");
        res.setPackaging_date(batch.getPackagingDate() != null ? batch.getPackagingDate().format(dateFormatter) : "N/A");

        List<TimelineItemDto> timeline = new ArrayList<>();
        for (TraceabilityEvent e : events) {
            timeline.add(new TimelineItemDto(
                    e.getStage(),
                    e.getLocation(),
                    e.getDescription(),
                    e.getHandlerName() != null ? e.getHandlerName() : "Verified KrishiSarthi Node",
                    e.getTimestamp().format(timeFormatter)
            ));
        }
        res.setTimeline(timeline);
        res.setVerified_by("KrishiSarthi Supply-Chain Integrity Network");

        return res;
    }

    @Transactional
    public void addTraceabilityEvent(Long batchId, String stage, String location, String description, String handlerName) {
        CropBatch batch = cropBatchRepository.findById(batchId)
                .orElseThrow(() -> new ResourceNotFoundException("Batch not found: " + batchId));

        TraceabilityEvent event = new TraceabilityEvent(batch, stage, location, description, handlerName);
        traceabilityEventRepository.save(event);
    }
}
