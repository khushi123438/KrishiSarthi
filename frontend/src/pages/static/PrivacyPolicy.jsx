import React from 'react';

export const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="space-y-2 border-b border-[#E3F0E5] pb-6">
        <h1 className="text-3xl font-black text-[#104B32]">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Effective Date: October 2026 &bull; KrishiSarthi (FarmLink.in)</p>
      </div>

      <div className="prose text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
        <p>
          At KrishiSarthi, we are deeply committed to protecting the privacy, identity, and financial security of Indian farmers, wholesale buyers, and commercial transporters. This policy explains how we collect, store, and process your data.
        </p>

        <h3 className="font-extrabold text-base text-[#104B32] pt-2">1. Information We Collect</h3>
        <p>
          We collect personal identification data (name, phone number, village/city, state), KYC documents (Aadhaar, PAN, 7/12 Land Records, Commercial Driving Licenses), crop harvest details, and geo-location coordinates for GPS shipment tracking.
        </p>

        <h3 className="font-extrabold text-base text-[#104B32] pt-2">2. Crop Traceability & Public Data</h3>
        <p>
          In accordance with our mission of transparency, harvest batch codes, crop variety, harvest dates, and supply chain journey milestones are publicly verifiable via QR codes. Farmer personal contact details (such as direct phone numbers) are masked to ensure privacy.
        </p>

        <h3 className="font-extrabold text-base text-[#104B32] pt-2">3. Financial & Escrow Data</h3>
        <p>
          Payment processing is powered by Razorpay using bank-grade 256-bit SSL encryption. We do not store raw credit card numbers or UPI PINs on our servers.
        </p>
      </div>
    </div>
  );
};
