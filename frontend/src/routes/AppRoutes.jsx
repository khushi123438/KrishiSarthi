import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Landing Page
import { LandingPage } from '../pages/landing/LandingPage';

// Auth Pages
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { VerifyOtp } from '../pages/auth/VerifyOtp';
import { ResetPassword } from '../pages/auth/ResetPassword';
import { KycVerification } from '../pages/auth/KycVerification';

// Farmer Pages
import { FarmerDashboard } from '../pages/farmer/FarmerDashboard';
import { MyCrops } from '../pages/farmer/MyCrops';
import { FarmerOffers } from '../pages/farmer/FarmerOffers';

// Buyer Pages
import { Marketplace } from '../pages/buyer/Marketplace';
import { BuyerOrders } from '../pages/buyer/BuyerOrders';

// Transporter Pages
import { FreightMarketplace } from '../pages/transporter/FreightMarketplace';
import { Shipments } from '../pages/transporter/Shipments';

// Admin Page
import { AdminDashboard } from '../pages/admin/AdminDashboard';

// Traceability & Agri Pages
import { TraceabilityPage } from '../pages/traceability/TraceabilityPage';
import { WeatherMarketPage } from '../pages/common/WeatherMarketPage';

// Static & Information Pages
import { AboutUs } from '../pages/static/AboutUs';
import { ContactUs } from '../pages/static/ContactUs';
import { Support } from '../pages/static/Support';
import { PrivacyPolicy } from '../pages/static/PrivacyPolicy';
import { TermsConditions } from '../pages/static/TermsConditions';
import { UserProfile } from '../pages/static/UserProfile';
import { NotFound } from '../pages/static/NotFound';

// Protected Route Guard
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/trace" element={<TraceabilityPage />} />
      <Route path="/weather" element={<WeatherMarketPage />} />
      <Route path="/mandi" element={<WeatherMarketPage />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/kyc"
        element={
          <ProtectedRoute>
            <KycVerification />
          </ProtectedRoute>
        }
      />

      {/* Farmer Routes */}
      <Route
        path="/farmer"
        element={
          <ProtectedRoute allowedRoles={['FARMER', 'ADMIN']}>
            <FarmerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/crops"
        element={
          <ProtectedRoute allowedRoles={['FARMER', 'ADMIN']}>
            <MyCrops />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/offers"
        element={
          <ProtectedRoute allowedRoles={['FARMER', 'ADMIN']}>
            <FarmerOffers />
          </ProtectedRoute>
        }
      />

      {/* Buyer Routes */}
      <Route
        path="/buyer"
        element={
          <ProtectedRoute allowedRoles={['BUYER', 'ADMIN']}>
            <BuyerOrders />
          </ProtectedRoute>
        }
      />
      <Route path="/buyer/market" element={<Marketplace />} />
      <Route
        path="/buyer/orders"
        element={
          <ProtectedRoute allowedRoles={['BUYER', 'ADMIN']}>
            <BuyerOrders />
          </ProtectedRoute>
        }
      />

      {/* Transporter Routes */}
      <Route
        path="/transporter"
        element={
          <ProtectedRoute allowedRoles={['TRANSPORTER', 'ADMIN']}>
            <FreightMarketplace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transporter/loads"
        element={
          <ProtectedRoute allowedRoles={['TRANSPORTER', 'ADMIN']}>
            <FreightMarketplace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transporter/shipments"
        element={
          <ProtectedRoute allowedRoles={['TRANSPORTER', 'ADMIN']}>
            <Shipments />
          </ProtectedRoute>
        }
      />

      {/* Admin Route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Static & Support Pages */}
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/support" element={<Support />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      {/* 404 Not Found */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
