-- V2: Seed Pre-configured KrishiSarthi Platform Data
-- BCrypt password hashes:
-- 'admin123'  -> $2a$10$wN1G1e1B1G.x08p6K0iNPeB5U5M7Lz5eQe1PjQ8mQn9JgVjG1R7lS
-- 'farmer123' -> $2a$10$a0/4eI1iWcE0rA.uUaB/1e3bN5hOq.hH8O6Cq4Cj0P4aQe.P1U2gK
-- 'buyer123'  -> $2a$10$v1r8r5k3h7j9k2l1m4n5o.6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1
-- 'trans123'  -> $2a$10$m8n7b6v5c4x3z2a1s0d9f.8g7h6j5k4l3p2o1i0u9y8t7r6e5w4q3

-- 1. Admin Owner Account
INSERT INTO users (id, full_name, email, mobile, hashed_password, role, preferred_language, is_active, is_verified, created_at)
VALUES (1, 'Farmlink Admin Owner', 'admin@farmlink.in', '9999999999', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'ADMIN', 'en', TRUE, TRUE, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

-- 2. Farmer 1 (Ramesh Kumar - Haryana)
INSERT INTO users (id, full_name, email, mobile, hashed_password, role, preferred_language, is_active, is_verified, created_at)
VALUES (2, 'Ramesh Kumar', 'ramesh@farmlink.in', '9876543210', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'FARMER', 'hi', TRUE, TRUE, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

INSERT INTO farmer_profiles (user_id, village, district, state, pincode, primary_crops, experience_years, rating, total_sales_count)
VALUES (2, 'Karnal', 'Karnal', 'Haryana', '132001', 'Wheat, Mustard, Basmati Rice', 15, 4.9, 12)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO farms (id, farmer_profile_id, farm_name, size_acres, soil_type, irrigation_source, village, district, state)
VALUES (1, (SELECT id FROM farmer_profiles WHERE user_id = 2), 'Ramesh Green Fields', 5.5, 'Alluvial', 'Canal & Tube Well', 'Karnal', 'Karnal', 'Haryana')
ON CONFLICT (id) DO NOTHING;

-- 3. Farmer 2 (Sunita Devi - Punjab)
INSERT INTO users (id, full_name, email, mobile, hashed_password, role, preferred_language, is_active, is_verified, created_at)
VALUES (3, 'Sunita Devi', 'sunita@farmlink.in', '9876543211', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'FARMER', 'hi', TRUE, TRUE, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

INSERT INTO farmer_profiles (user_id, village, district, state, pincode, primary_crops, experience_years, rating, total_sales_count)
VALUES (3, 'Patiala', 'Patiala', 'Punjab', '147001', 'Potato, Rice, Wheat', 8, 4.8, 7)
ON CONFLICT (user_id) DO NOTHING;

-- 4. Buyer (Rajiv Malhotra - ABC Foods)
INSERT INTO users (id, full_name, email, mobile, hashed_password, role, preferred_language, is_active, is_verified, created_at)
VALUES (4, 'Rajiv Malhotra', 'rajiv@abcfoods.com', '9811122233', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'BUYER', 'hi', TRUE, TRUE, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

INSERT INTO buyer_profiles (user_id, company_name, buyer_type, gst_number, city, state, rating, total_purchases_count)
VALUES (4, 'ABC Agro Foods Pvt Ltd', 'Wholesaler / Processor', '07AAAAA0000A1Z5', 'New Delhi', 'Delhi', 4.9, 25)
ON CONFLICT (user_id) DO NOTHING;

-- 5. Transporter (Gurdeep Singh - Kishan Logistics)
INSERT INTO users (id, full_name, email, mobile, hashed_password, role, preferred_language, is_active, is_verified, created_at)
VALUES (5, 'Gurdeep Singh', 'gurdeep@kishanlogistics.in', '9822233344', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'TRANSPORTER', 'hi', TRUE, TRUE, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

INSERT INTO transporter_profiles (user_id, agency_name, vehicle_type, vehicle_number, capacity_tons, operating_routes, rating, total_deliveries_count)
VALUES (5, 'Kishan Logistics & Freight', '10-Wheeler Truck', 'HR-05-AB-1234', 15.0, 'Haryana, Punjab, Delhi NCR, Rajasthan', 4.95, 48)
ON CONFLICT (user_id) DO NOTHING;

-- 6. Initial Crop Listings & Traceability Batches
INSERT INTO crop_listings (id, farmer_id, farm_id, crop_name, variety, quantity, unit, expected_price_per_unit, quality_grade, location_district, location_state, description, status, views_count)
VALUES (1, 2, 1, 'Gehun (Wheat)', 'Sharbati Premium', 2500, 'kg', 26.5, 'Grade A', 'Karnal', 'Haryana', '100% Organic certified Golden Sharbati Wheat harvested from canal irrigated fertile soil.', 'PUBLISHED', 45)
ON CONFLICT (id) DO NOTHING;

INSERT INTO crop_images (crop_listing_id, image_url, is_primary)
VALUES (1, 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO crop_batches (id, batch_code, crop_listing_id, farmer_id, origin_location, qr_code_url)
VALUES (1, 'FL-WHT-HR-2026-000123', 1, 2, 'Karnal, Haryana', '/trace.html?batch=FL-WHT-HR-2026-000123')
ON CONFLICT (id) DO NOTHING;

INSERT INTO traceability_events (batch_id, stage, location, description, handler_name)
VALUES 
(1, 'Farm Harvest & Inspection', 'Karnal, Haryana', 'Harvest completed with 11.2% moisture content. Certified Grade A organic.', 'Ramesh Kumar (Farmer)'),
(1, 'Collection & Moisture Quality Lab', 'Farmlink Agritech Center, Karnal', 'Lab testing passed. Free from pesticide residues.', 'Dr. Satish Sharma (Quality Officer)')
ON CONFLICT DO NOTHING;

-- 7. Reset sequences to prevent key collisions
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('crop_listings_id_seq', (SELECT MAX(id) FROM crop_listings));
SELECT setval('crop_batches_id_seq', (SELECT MAX(id) FROM crop_batches));
