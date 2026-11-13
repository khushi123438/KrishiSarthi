package com.krishisarthi.dto;

public class AgriDataDtos {

    public static class WeatherResponse {
        private String location;
        private Double temperature_c;
        private Double feels_like_c;
        private Integer humidity_pct;
        private String weather_condition;
        private String description;
        private Double wind_speed_kmh;
        private Integer rain_probability_pct;
        private String source;
        private String last_updated;

        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public Double getTemperature_c() { return temperature_c; }
        public void setTemperature_c(Double temperature_c) { this.temperature_c = temperature_c; }
        public Double getFeels_like_c() { return feels_like_c; }
        public void setFeels_like_c(Double feels_like_c) { this.feels_like_c = feels_like_c; }
        public Integer getHumidity_pct() { return humidity_pct; }
        public void setHumidity_pct(Integer humidity_pct) { this.humidity_pct = humidity_pct; }
        public String getWeather_condition() { return weather_condition; }
        public void setWeather_condition(String weather_condition) { this.weather_condition = weather_condition; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public Double getWind_speed_kmh() { return wind_speed_kmh; }
        public void setWind_speed_kmh(Double wind_speed_kmh) { this.wind_speed_kmh = wind_speed_kmh; }
        public Integer getRain_probability_pct() { return rain_probability_pct; }
        public void setRain_probability_pct(Integer rain_probability_pct) { this.rain_probability_pct = rain_probability_pct; }
        public String getSource() { return source; }
        public void setSource(String source) { this.source = source; }
        public String getLast_updated() { return last_updated; }
        public void setLast_updated(String last_updated) { this.last_updated = last_updated; }
    }

    public static class MandiPriceResponse {
        private String crop_name;
        private String category;
        private String mandi;
        private String state;
        private Double min_price;
        private Double max_price;
        private Double modal_price;
        private String unit;
        private String price_trend;
        private String trend_direction;
        private String last_updated;

        public MandiPriceResponse() {}

        public MandiPriceResponse(String crop_name, String category, String mandi, String state,
                                  Double min_price, Double max_price, Double modal_price,
                                  String unit, String price_trend, String trend_direction, String last_updated) {
            this.crop_name = crop_name;
            this.category = category;
            this.mandi = mandi;
            this.state = state;
            this.min_price = min_price;
            this.max_price = max_price;
            this.modal_price = modal_price;
            this.unit = unit;
            this.price_trend = price_trend;
            this.trend_direction = trend_direction;
            this.last_updated = last_updated;
        }

        public String getCrop_name() { return crop_name; }
        public void setCrop_name(String crop_name) { this.crop_name = crop_name; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public String getMandi() { return mandi; }
        public void setMandi(String mandi) { this.mandi = mandi; }
        public String getState() { return state; }
        public void setState(String state) { this.state = state; }
        public Double getMin_price() { return min_price; }
        public void setMin_price(Double min_price) { this.min_price = min_price; }
        public Double getMax_price() { return max_price; }
        public void setMax_price(Double max_price) { this.max_price = max_price; }
        public Double getModal_price() { return modal_price; }
        public void setModal_price(Double modal_price) { this.modal_price = modal_price; }
        public String getUnit() { return unit; }
        public void setUnit(String unit) { this.unit = unit; }
        public String getPrice_trend() { return price_trend; }
        public void setPrice_trend(String price_trend) { this.price_trend = price_trend; }
        public String getTrend_direction() { return trend_direction; }
        public void setTrend_direction(String trend_direction) { this.trend_direction = trend_direction; }
        public String getLast_updated() { return last_updated; }
        public void setLast_updated(String last_updated) { this.last_updated = last_updated; }
    }
}
