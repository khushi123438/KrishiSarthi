import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactUs = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider bg-[#E3F0E5] px-3 py-1 rounded-full border border-[#C8E1CC]">
          Get in Touch
        </span>
        <h1 className="text-3xl font-black text-[#104B32]">Contact KrishiSarthi Support</h1>
        <p className="text-xs text-slate-600">
          Have questions regarding crop listing, bulk buyer procurement, or transporter logistics? Reach out anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact info cards */}
        <div className="space-y-4">
          <div className="card-krishi p-5 bg-white space-y-2 border border-[#E3F0E5]">
            <div className="flex items-center gap-2 text-[#176B45] font-bold text-sm">
              <Phone className="w-4 h-4" />
              <span>Toll-Free Kisan Support</span>
            </div>
            <p className="text-xs text-slate-600">
              Toll-Free: <strong>1800-FARMLINK (1800-327-6546)</strong>
            </p>
            <p className="text-[11px] text-slate-400">Available Monday to Saturday, 7:00 AM – 8:00 PM IST</p>
          </div>

          <div className="card-krishi p-5 bg-white space-y-2 border border-[#E3F0E5]">
            <div className="flex items-center gap-2 text-[#176B45] font-bold text-sm">
              <Mail className="w-4 h-4" />
              <span>Direct Email Inquiries</span>
            </div>
            <p className="text-xs text-slate-600">General Support: <strong>support@krishisarthi.in</strong></p>
            <p className="text-xs text-slate-600">Buyer Procurement: <strong>procure@krishisarthi.in</strong></p>
          </div>

          <div className="card-krishi p-5 bg-white space-y-2 border border-[#E3F0E5]">
            <div className="flex items-center gap-2 text-[#176B45] font-bold text-sm">
              <MapPin className="w-4 h-4" />
              <span>Central Agricultural Grid Office</span>
            </div>
            <p className="text-xs text-slate-600">
              KrishiSarthi Grid Centre, Grand Trunk Road, Near New Grain Market, Karnal, Haryana – 132001
            </p>
          </div>
        </div>

        {/* Message Form */}
        <div className="card-krishi p-6 bg-white border border-[#E3F0E5]">
          {sent ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#176B45] mx-auto" />
              <h3 className="font-extrabold text-base text-[#104B32]">Message Sent!</h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Thank you for contacting us. A KrishiSarthi agriculture specialist will call you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-extrabold text-base text-[#104B32] mb-2">Send us a Message</h3>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full py-2 px-3 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full py-2 px-3 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message or Query *</label>
                <textarea
                  rows={4}
                  required
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Tell us what crop you are selling or looking to buy..."
                  className="w-full py-2 px-3 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-forest py-2.5 text-xs font-bold shadow-md cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
