import React from 'react';
import { HelpCircle, ChevronDown, Phone, Mail } from 'lucide-react';

export const Support = () => {
  const faqs = [
    {
      q: "How does the KrishiSarthi Escrow payment work?",
      a: "When a buyer accepts a crop offer, payment is placed into KrishiSarthi Escrow. The funds remain locked until the transporter delivers the produce and the buyer verifies weight and quality. Upon verification, the payment is released immediately to the farmer's bank or UPI account."
    },
    {
      q: "How does the public QR Traceability certificate work?",
      a: "Every time a farmer lists a crop, a unique Batch Code is generated (e.g. KB-2026-WHT-001). As the crop is harvested, tested in labs, loaded on trucks, and delivered, each event is cryptographically recorded. Anyone can scan the QR code or enter the batch code at /trace without requiring login."
    },
    {
      q: "How can farmers use the Voice AI listing feature?",
      a: "When adding a crop, simply click the 'Speak (बोलकर बेचें)' button and say your crop details in Hindi or English (for example: 'मेरे पास 50 क्विंटल शरबती गेहूँ ₹2400 में है'). Google Gemini parses your speech into crop name, quantity, variety, and expected price automatically."
    },
    {
      q: "Who pays for the transport and freight charges?",
      a: "Freight quotes are submitted by commercial transporters during bidding. Depending on delivery preference, freight is clearly itemized in the order breakdown and disbursed to the driver upon uploading the Proof of Delivery (POD)."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider bg-[#E3F0E5] px-3 py-1 rounded-full border border-[#C8E1CC]">
          Help & Support Center
        </span>
        <h1 className="text-3xl font-black text-[#104B32]">Frequently Asked Questions</h1>
        <p className="text-xs text-slate-600">
          Everything you need to know about trading, escrow settlements, and traceability on KrishiSarthi.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((f, idx) => (
          <div key={idx} className="card-krishi p-6 bg-white border border-[#E3F0E5] space-y-2">
            <h3 className="font-extrabold text-sm sm:text-base text-[#104B32] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#176B45] flex-shrink-0" />
              <span>{f.q}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
              {f.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
