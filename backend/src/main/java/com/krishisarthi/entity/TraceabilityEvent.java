package com.krishisarthi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "traceability_events")
public class TraceabilityEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "batch_id", nullable = false)
    private CropBatch batch;

    @Column(nullable = false, length = 50)
    private String stage;

    @Column(nullable = false, length = 150)
    private String location;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "handler_name", length = 100)
    private String handlerName;

    @Column(name = "timestamp")
    private LocalDateTime timestamp = LocalDateTime.now();

    public TraceabilityEvent() {}

    public TraceabilityEvent(CropBatch batch, String stage, String location, String description, String handlerName) {
        this.batch = batch;
        this.stage = stage;
        this.location = location;
        this.description = description;
        this.handlerName = handlerName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public CropBatch getBatch() { return batch; }
    public void setBatch(CropBatch batch) { this.batch = batch; }

    public String getStage() { return stage; }
    public void setStage(String stage) { this.stage = stage; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getHandlerName() { return handlerName; }
    public void setHandlerName(String handlerName) { this.handlerName = handlerName; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
