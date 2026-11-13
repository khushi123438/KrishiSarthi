import React from 'react';

export const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="space-y-2 border-b border-[#E3F0E5] pb-6">
        <h1 className="text-3xl font-black text-[#104B32]">Terms & Conditions</h1>
        <p className="text-xs text-slate-500">Effective Date: October 2026 &bull; KrishiSarthi Platform Guidelines</p>
      </div>

      <div className="prose text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
        <p>
          By accessing or trading on KrishiSarthi (FarmLink.in), you agree to comply with and be bound by the following terms of agricultural commerce.
        </p>

        <h3 className="font-extrabold text-base text-[#104B32] pt-2">1. User Verification & KYC</h3>
        <p>
          All registered participants must complete KYC verification prior to executing transactions. Farmers must provide genuine crop harvest representations. Misrepresenting grain grade or origin is strictly prohibited.
        </p>

        <h3 className="font-extrabold text-base text-[#104B32] pt-2">2. Escrow & Settlement</h3>
        <p>
          All marketplace payments are held securely in the KrishiSarthi Escrow Shield. Payout is released to the seller upon confirmation of physical delivery and receipt verification by the buyer or authorized receiver.
        </p>

        <h3 className="font-extrabold text-base text-[#104B32] pt-2">3. Dispute Resolution</h3>
        <p>
          In the event of quality discrepancies or transport damages, the platform dispute management protocol will review weighment slips and laboratory sample test certificates to issue binding reconciliations.
        </p>
      </div>
    </div>
  );
};
