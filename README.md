# 🌾 KrishiSarthi (FarmLink.in) – Smart Agricultural Marketplace & Supply Chain Platform

> **Full-Stack Enterprise Migration: Python FastAPI & Vanilla JS &rarr; Java 21 + Spring Boot 3 & React 18 + Tailwind CSS**

KrishiSarthi connects farmers directly with buyers and transporters with transparent wholesale pricing, 100% escrow-backed instant settlements, and cryptographic crop batch QR traceability.

---

## 🏗️ Architecture & Technology Stack

### Backend
- **Language**: Java 21 (LTS)
- **Framework**: Spring Boot 3.3.4
- **Security**: Spring Security 6 + JJWT 0.12.6 + BCrypt Password Hashing
- **Data Persistence**: Spring Data JPA + Hibernate ORM
- **Database**: PostgreSQL 16 + Flyway Schema Migrations (`V1__initial_schema.sql`, `V2__seed_initial_data.sql`)
- **API Documentation**: OpenAPI 3.0 / Swagger UI (`/swagger-ui.html`)
- **Build Tool**: Apache Maven

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom Emerald Theme (`#059669`, `#047857`, `#D97706`)
- **Routing**: React Router DOM v6 with Role-Based Route Guards
- **Icons**: Lucide React
- **HTTP Client**: Axios with JWT Interceptors & Auto Token Refresh
- **Maps**: Leaflet + OpenStreetMap for Live GPS Vehicle Telemetry
- **Voice AI**: Web Speech API (Speech-to-Text & Text-to-Speech in Hindi & English)
- **Payments**: Razorpay Checkout SDK + HMAC SHA-256 Server Verification

### Orchestration & Deployment
- **Containerization**: Docker Multi-Stage Builds (Maven + Alpine JRE, Node + Nginx)
- **Service Mesh**: Docker Compose (PostgreSQL, Spring Boot Backend, Nginx React Frontend)

---

## 🚀 Quick Start with Docker Compose

Launch the entire ecosystem (Database, Java Spring Boot Backend, and React Frontend) with a single command:

```bash
docker-compose up --build
```

- **Frontend Application**: [http://localhost](http://localhost) (or port 80)
- **Backend API**: [http://localhost:8080/api/v1](http://localhost:8080/api/v1)
- **Swagger UI**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **Public Traceability Verification**: [http://localhost/trace?batch=KB-2026-WHT-001](http://localhost/trace?batch=KB-2026-WHT-001)

---

## 🛠️ Local Development Setup

### 1. Backend (Spring Boot 3)
```bash
cd backend

# Run with development profile (H2 in-memory or local Postgres)
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```
The server will start on `http://localhost:8080`.

### 2. Frontend (React + Vite)
```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server with backend proxy
npm run dev
```
The client will start on `http://localhost:5173` with automatic `/api` proxy to `http://localhost:8080`.

---

## 👥 Seed Accounts for Testing

| Role | Username / Phone | Password | Features Tested |
| :--- | :--- | :--- | :--- |
| **Farmer** | `9876543210` | `password123` | Sell Crop (+ Voice AI), Batch QR, Received Offers, Counter-Offers, Escrow Payout |
| **Farmer 2** | `9876543211` | `password123` | Active listings, batch certificates |
| **Buyer** | `9876543212` | `password123` | Marketplace search, Price Offers, Razorpay Checkout, GPS Tracking |
| **Transporter** | `9876543213` | `password123` | Freight Loads, Freight Bidding, Broadcast Live GPS, POD Upload |
| **Platform Admin** | `admin@farmlink.in` | `Admin@12345` | Master Console, KYC Approval Queue, GMV & 2% Revenue, Security Audit Logs |

*Note: One-click demo login buttons are provided directly inside the UI login modal for instantaneous testing.*

---

## 📦 Preserved & Enhanced Workflows

### 1. Farmer Crop Listing & Cryptographic Traceability
1. Farmer lists crop via typing or speaking via **Voice AI** (e.g., *"मेरे पास 50 क्विंटल शरबती गेहूँ ₹2400 में है"*).
2. Gemini AI parses the voice into structured crop attributes.
3. System automatically generates a **Unique Batch ID** (`KB-YYYY-CROP-SEQ`) and stores the **Initial Harvest Event**.
4. The QR code is instantly verifiable via the public route `/trace?batch=...` **without requiring authentication**.

### 2. Buyer Offer, Negotiation & Order Creation
1. Buyer searches marketplace with filters (Grade, Crop, State).
2. Submits a price offer per quintal with requested quantity.
3. Farmer receives notification and can **Accept**, **Reject**, or propose a **Counter-Offer**.
4. Upon Farmer acceptance, a confirmed **Order** is automatically generated.

### 3. Razorpay Payment & Escrow Protection
1. Buyer initiates checkout via `/api/v1/payment/create-order`.
2. Completes payment via Razorpay.
3. Spring Boot backend performs **HMAC SHA-256 Signature Verification** to ensure zero fraud.
4. Funds are placed into **KrishiSarthi Escrow Shield** (2% platform commission deducted, net payout held safely for farmer).
5. A **Transport Request** is automatically triggered for transporters to bid.

### 4. Transporter Bidding, Live GPS & Delivery Proof
1. Transporters view open freight loads and submit quotes.
2. Winning transporter picks up the cargo and updates milestone (`PICKED_UP`, `IN_TRANSIT`, `ARRIVED`, `DELIVERED`).
3. Buyer and farmer view real-time **Leaflet GPS route visualization** with vehicle number and live coordinates.
4. Driver uploads physical **Proof of Delivery (POD)** with receiver signature.
5. Buyer confirms handover, automatically releasing **Escrow Payout** to the farmer's bank/UPI account.

### 5. Kisan Mitra AI (Google Gemini)
- Available 24/7 at the bottom-right floating button.
- Multilingual conversational agricultural advisor in **Hindi and Hinglish**.
- Database-aware context: incorporates active orders, listings, and live weather.
- Web Speech API integration for voice speech output (TTS) and voice question input (STT).

---

## 🔒 Security & Compliance
- Full Role-Based Access Control (`FARMER`, `BUYER`, `TRANSPORTER`, `ADMIN`).
- Zero API secrets or Razorpay keys exposed in frontend code.
- Public QR traceability route decoupled from JWT authentication filters.
- Global exception handling with clean REST JSON responses.
- Database auditing records with immutable user timestamps and IP tracking.
