package com.krishisarthi.dto;

import java.util.List;

public class TraceabilityDtos {

    public static class TraceabilityResponse {
        private String batch_code;
        private String crop_name;
        private String variety;
        private String origin_location;
        private String quality_grade;
        private String harvest_date;
        private String packaging_date;
        private List<TimelineItemDto> timeline;
        private String verified_by = "Farmlink Supply-Chain Integrity Network";

        public String getBatch_code() { return batch_code; }
        public void setBatch_code(String batch_code) { this.batch_code = batch_code; }
        public String getCrop_name() { return crop_name; }
        public void setCrop_name(String crop_name) { this.crop_name = crop_name; }
        public String getVariety() { return variety; }
        public void setVariety(String variety) { this.variety = variety; }
        public String getOrigin_location() { return origin_location; }
        public void setOrigin_location(String origin_location) { this.origin_location = origin_location; }
        public String getQuality_grade() { return quality_grade; }
        public void setQuality_grade(String quality_grade) { this.quality_grade = quality_grade; }
        public String getHarvest_date() { return harvest_date; }
        public void setHarvest_date(String harvest_date) { this.harvest_date = harvest_date; }
        public String getPackaging_date() { return packaging_date; }
        public void setPackaging_date(String packaging_date) { this.packaging_date = packaging_date; }
        public List<TimelineItemDto> getTimeline() { return timeline; }
        public void setTimeline(List<TimelineItemDto> timeline) { this.timeline = timeline; }
        public String getVerified_by() { return verified_by; }
        public void setVerified_by(String verified_by) { this.verified_by = verified_by; }
    }

    public static class TimelineItemDto {
        private String stage;
        private String location;
        private String description;
        private String handler_name;
        private String timestamp;

        public TimelineItemDto() {}
        public TimelineItemDto(String stage, String location, String description, String handler_name, String timestamp) {
            this.stage = stage;
            this.location = location;
            this.description = description;
            this.handler_name = handler_name;
            this.timestamp = timestamp;
        }

        public String getStage() { return stage; }
        public void setStage(String stage) { this.stage = stage; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getHandler_name() { return handler_name; }
        public void setHandler_name(String handler_name) { this.handler_name = handler_name; }
        public String getTimestamp() { return timestamp; }
        public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
    }
}
