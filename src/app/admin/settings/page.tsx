"use client";

import { useState } from "react";
import { Settings, Save, CheckCircle } from "lucide-react";
import { SITE_NAME, SITE_ADDRESS, SITE_EMAIL, SITE_PHONE } from "@/lib/constants";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"resort" | "email" | "payment" | "analytics" | "features">("resort");

  const [features, setFeatures] = useState({
    roomBooking: true,
    packageBooking: true,
    coupons: true,
    reviews: true,
    onlinePayment: true,
    whatsappWidget: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-charcoal">Resort & Platform Settings</h1>
          <p className="text-xs text-warm-gray mt-1">Configure general details, payment gateway keys, analytics tags, and feature flags</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold text-xs shadow-xs"
        >
          <Save className="size-4" /> Save Settings
        </button>
      </div>

      {saved && (
        <div className="p-3 bg-green-50 border border-green-200 text-success text-xs font-semibold rounded-lg flex items-center gap-2">
          <CheckCircle className="size-4" /> Settings updated successfully!
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-border">
        {[
          { id: "resort", label: "Resort Details" },
          { id: "email", label: "Email & SMTP" },
          { id: "payment", label: "Razorpay Config" },
          { id: "analytics", label: "GA4 & GTM" },
          { id: "features", label: "Feature Flags" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-5 py-2.5 font-medium text-xs border-b-2 transition-colors ${
              activeTab === t.id ? "border-primary text-primary font-bold" : "border-transparent text-warm-gray"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="bg-surface rounded-xl border border-border p-6 shadow-card">
        {activeTab === "resort" && (
          <div className="space-y-4 max-w-2xl text-xs">
            <div>
              <label className="block text-warm-gray font-semibold mb-1">Resort Name</label>
              <input type="text" defaultValue={SITE_NAME} className="w-full px-3 py-2 rounded border border-border text-charcoal" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-warm-gray font-semibold mb-1">Contact Phone</label>
                <input type="text" defaultValue={SITE_PHONE} className="w-full px-3 py-2 rounded border border-border text-charcoal" />
              </div>
              <div>
                <label className="block text-warm-gray font-semibold mb-1">Reservations Email</label>
                <input type="email" defaultValue={SITE_EMAIL} className="w-full px-3 py-2 rounded border border-border text-charcoal" />
              </div>
            </div>
            <div>
              <label className="block text-warm-gray font-semibold mb-1">Physical Address</label>
              <textarea rows={2} defaultValue={SITE_ADDRESS} className="w-full px-3 py-2 rounded border border-border text-charcoal" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-warm-gray font-semibold mb-1">Standard Check-in Time</label>
                <input type="text" defaultValue="02:00 PM" className="w-full px-3 py-2 rounded border border-border text-charcoal" />
              </div>
              <div>
                <label className="block text-warm-gray font-semibold mb-1">Standard Check-out Time</label>
                <input type="text" defaultValue="11:00 AM" className="w-full px-3 py-2 rounded border border-border text-charcoal" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "email" && (
          <div className="space-y-4 max-w-xl text-xs">
            <p className="text-warm-gray">Configure transactional email sender (SendGrid, Postmark, or Custom SMTP).</p>
            <div>
              <label className="block text-warm-gray font-semibold mb-1">From Sender Name</label>
              <input type="text" defaultValue="Vanapriya Reservations" className="w-full px-3 py-2 rounded border border-border text-charcoal" />
            </div>
            <div>
              <label className="block text-warm-gray font-semibold mb-1">SMTP Server Host</label>
              <input type="text" placeholder="smtp.sendgrid.net" className="w-full px-3 py-2 rounded border border-border text-charcoal" />
            </div>
            <div>
              <label className="block text-warm-gray font-semibold mb-1">SMTP API Key / Password</label>
              <input type="password" value="••••••••••••••••••••" readOnly className="w-full px-3 py-2 rounded border border-border text-charcoal" />
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="space-y-4 max-w-xl text-xs">
            <p className="text-warm-gray">Configure Razorpay payment gateway credentials for online bookings.</p>
            <div className="flex items-center gap-4 py-2 border-b border-border">
              <span className="font-semibold text-charcoal">Mode:</span>
              <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="mode" defaultChecked className="accent-primary" /> Test Mode</label>
              <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="mode" className="accent-primary" /> Live Mode</label>
            </div>
            <div>
              <label className="block text-warm-gray font-semibold mb-1">Razorpay Key ID</label>
              <input type="text" defaultValue="rzp_test_9876543210ABC" className="w-full px-3 py-2 rounded border border-border text-charcoal font-mono" />
            </div>
            <div>
              <label className="block text-warm-gray font-semibold mb-1">Razorpay Key Secret</label>
              <input type="password" value="••••••••••••••••••••" readOnly className="w-full px-3 py-2 rounded border border-border text-charcoal font-mono" />
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-4 max-w-xl text-xs">
            <p className="text-warm-gray">Configure tracking codes for analytics and marketing tools.</p>
            <div>
              <label className="block text-warm-gray font-semibold mb-1">Google Analytics 4 (GA4) Measurement ID</label>
              <input type="text" defaultValue="G-VNP8899XX" className="w-full px-3 py-2 rounded border border-border text-charcoal font-mono" />
            </div>
            <div>
              <label className="block text-warm-gray font-semibold mb-1">Google Tag Manager (GTM) Container ID</label>
              <input type="text" defaultValue="GTM-VNP123" className="w-full px-3 py-2 rounded border border-border text-charcoal font-mono" />
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="space-y-3 max-w-xl text-xs">
            <p className="text-warm-gray mb-2">Enable or disable specific features dynamically across the website.</p>
            {[
              { id: "roomBooking", label: "Online Room Bookings" },
              { id: "packageBooking", label: "Package Booking Engine" },
              { id: "coupons", label: "Promotional Coupon System" },
              { id: "reviews", label: "Guest Reviews Display" },
              { id: "onlinePayment", label: "Razorpay Checkout" },
              { id: "whatsappWidget", label: "WhatsApp Concierge Widget" },
            ].map((f) => (
              <label key={f.id} className="flex items-center justify-between p-3 rounded border border-border bg-background cursor-pointer">
                <span className="font-semibold text-charcoal">{f.label}</span>
                <input
                  type="checkbox"
                  checked={(features as any)[f.id]}
                  onChange={() => setFeatures({ ...features, [f.id]: !(features as any)[f.id] })}
                  className="size-4 accent-primary"
                />
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
