"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Calendar, Users, Shield, CreditCard, ChevronRight, BedDouble, ArrowLeft } from "lucide-react";
import { mockRooms } from "@/data/mock/rooms";
import { mockPackages } from "@/data/mock/packages";
import { formatCurrency, calculateNights } from "@/lib/utils";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState<"room" | "package">("room");
  const [selectedItemSlug, setSelectedItemSlug] = useState<string>(mockRooms[0].slug);

  // Dates
  const today = new Date().toISOString().split("T")[0];
  const threeDaysLater = new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(threeDaysLater);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Guest Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Payment mock state
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const selectedRoom = mockRooms.find((r) => r.slug === selectedItemSlug);
  const selectedPackage = mockPackages.find((p) => p.slug === selectedItemSlug);

  const nights = calculateNights(checkIn, checkOut) || 1;
  const baseRate = bookingType === "room" ? (selectedRoom?.basePrice || 8500) : (selectedPackage?.price || 32000);
  const subtotal = bookingType === "room" ? baseRate * nights : baseRate;
  const taxRate = bookingType === "room" ? (selectedRoom?.taxRate || 0.12) : 0.18;
  const taxAmount = subtotal * taxRate;
  const grandTotal = Math.max(0, subtotal + taxAmount - discount);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "WELCOME10") {
      setDiscount(subtotal * 0.1);
    } else if (couponCode.toUpperCase() === "VANAPRIYA") {
      setDiscount(5000);
    } else {
      alert("Invalid code. Try WELCOME10 or VANAPRIYA");
    }
  };

  const handleCompleteBooking = () => {
    setBookingConfirmed(true);
    setStep(6);
  };

  const steps = [
    { num: 1, name: "Select Dates" },
    { num: 2, name: "Choose Stay" },
    { num: 3, name: "Guest Details" },
    { num: 4, name: "Summary" },
    { num: 5, name: "Payment" },
  ];

  return (
    <div className="bg-background min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Booking" }]} className="mb-6" />

        {/* Stepper Header */}
        {!bookingConfirmed && (
          <div className="bg-surface rounded-xl border border-border p-6 mb-8 shadow-card">
            <div className="flex items-center justify-between max-w-4xl mx-auto overflow-x-auto scrollbar-hide py-2">
              {steps.map((s, idx) => (
                <div key={s.num} className="flex items-center flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        step > s.num
                          ? "bg-success text-white"
                          : step === s.num
                          ? "bg-primary text-white"
                          : "bg-border text-warm-gray"
                      }`}
                    >
                      {step > s.num ? <Check className="size-4" /> : s.num}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        step === s.num ? "text-charcoal font-semibold" : "text-warm-gray"
                      }`}
                    >
                      {s.name}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`w-10 sm:w-16 h-0.5 mx-3 ${
                        step > s.num ? "bg-success" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            {/* STEP 1: Select Dates */}
            {step === 1 && (
              <div className="bg-surface rounded-xl border border-border p-6 shadow-card space-y-6">
                <h2 className="font-serif text-2xl font-semibold text-charcoal">Select Stay Dates & Guests</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-warm-gray uppercase tracking-wider mb-2">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={today}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-border text-charcoal bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-warm-gray uppercase tracking-wider mb-2">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-border text-charcoal bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-warm-gray uppercase tracking-wider mb-2">
                      Adults (Ages 12+)
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-md border border-border text-charcoal bg-background focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} Adult{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-warm-gray uppercase tracking-wider mb-2">
                      Children (Ages 0-11)
                    </label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-md border border-border text-charcoal bg-background focus:outline-none"
                    >
                      {[0, 1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "Child" : "Children"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-colors flex items-center gap-2"
                  >
                    Continue to Choose Room / Package <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Select Room / Package */}
            {step === 2 && (
              <div className="bg-surface rounded-xl border border-border p-6 shadow-card space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-semibold text-charcoal">Choose Accommodation / Package</h2>
                  <div className="flex rounded-md border border-border overflow-hidden">
                    <button
                      onClick={() => { setBookingType("room"); setSelectedItemSlug(mockRooms[0].slug); }}
                      className={`px-4 py-2 text-xs font-semibold transition-colors ${
                        bookingType === "room" ? "bg-primary text-white" : "bg-background text-warm-gray"
                      }`}
                    >
                      Rooms
                    </button>
                    <button
                      onClick={() => { setBookingType("package"); setSelectedItemSlug(mockPackages[0].slug); }}
                      className={`px-4 py-2 text-xs font-semibold transition-colors ${
                        bookingType === "package" ? "bg-primary text-white" : "bg-background text-warm-gray"
                      }`}
                    >
                      Packages
                    </button>
                  </div>
                </div>

                {bookingType === "room" ? (
                  <div className="space-y-4">
                    {mockRooms.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => setSelectedItemSlug(room.slug)}
                        className={`cursor-pointer rounded-lg border p-4 flex flex-col sm:flex-row gap-4 items-center transition-all ${
                          selectedItemSlug === room.slug
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border hover:border-secondary"
                        }`}
                      >
                        <div className="relative size-24 sm:size-28 rounded-md overflow-hidden flex-shrink-0">
                          <Image src={room.images[0]} alt={room.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif font-semibold text-charcoal text-base">{room.name}</h3>
                          <p className="text-xs text-warm-gray mb-2">{room.type} · Up to {room.maxOccupancy} guests</p>
                          <p className="text-xs text-warm-gray line-clamp-1">{room.description}</p>
                        </div>
                        <div className="text-right sm:border-l sm:border-border sm:pl-4">
                          <p className="text-lg font-bold text-charcoal">{formatCurrency(room.basePrice)}</p>
                          <p className="text-xs text-warm-gray">/ night</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockPackages.map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedItemSlug(pkg.slug)}
                        className={`cursor-pointer rounded-lg border p-4 flex flex-col sm:flex-row gap-4 items-center transition-all ${
                          selectedItemSlug === pkg.slug
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border hover:border-secondary"
                        }`}
                      >
                        <div className="relative size-24 sm:size-28 rounded-md overflow-hidden flex-shrink-0">
                          <Image src={pkg.images[0]} alt={pkg.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif font-semibold text-charcoal text-base">{pkg.name}</h3>
                          <p className="text-xs text-accent font-medium">{pkg.durationNights}N / {pkg.durationDays}D · {pkg.meals.label}</p>
                          <p className="text-xs text-warm-gray line-clamp-1 mt-1">{pkg.tagline}</p>
                        </div>
                        <div className="text-right sm:border-l sm:border-border sm:pl-4">
                          <p className="text-lg font-bold text-charcoal">{formatCurrency(pkg.price)}</p>
                          <p className="text-xs text-warm-gray">total package</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-md border border-border text-charcoal text-sm font-medium hover:bg-border/30 transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft className="size-4" /> Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-colors flex items-center gap-2"
                  >
                    Continue to Guest Details <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Guest Information */}
            {step === 3 && (
              <div className="bg-surface rounded-xl border border-border p-6 shadow-card space-y-6">
                <h2 className="font-serif text-2xl font-semibold text-charcoal">Guest Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-warm-gray uppercase tracking-wider mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Arjun"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-md border border-border text-charcoal bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-warm-gray uppercase tracking-wider mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sharma"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-md border border-border text-charcoal bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-warm-gray uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="arjun@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-md border border-border text-charcoal bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-warm-gray uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-md border border-border text-charcoal bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warm-gray uppercase tracking-wider mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Late arrival, high floor, dietary preferences, honeymoon setup, etc."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-border text-charcoal bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-md border border-border text-charcoal text-sm font-medium hover:bg-border/30 transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft className="size-4" /> Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-3 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-colors flex items-center gap-2"
                  >
                    Review Booking Summary <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Booking Summary */}
            {step === 4 && (
              <div className="bg-surface rounded-xl border border-border p-6 shadow-card space-y-6">
                <h2 className="font-serif text-2xl font-semibold text-charcoal">Review Booking Summary</h2>

                <div className="bg-background p-4 rounded-lg border border-border space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-gray">Selected Item:</span>
                    <span className="font-semibold text-charcoal">
                      {bookingType === "room" ? selectedRoom?.name : selectedPackage?.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-gray">Dates:</span>
                    <span className="font-medium text-charcoal">{checkIn} to {checkOut} ({nights} nights)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-gray">Guests:</span>
                    <span className="font-medium text-charcoal">{adults} Adults, {children} Children</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-gray">Primary Guest:</span>
                    <span className="font-medium text-charcoal">{firstName || "Arjun"} {lastName || "Sharma"} ({email || "arjun@example.com"})</span>
                  </div>
                </div>

                {/* Coupon Code section */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code (try WELCOME10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-md border border-border text-sm bg-background uppercase focus:outline-none"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2.5 rounded-md bg-accent text-white text-sm font-semibold hover:bg-accent-dark transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <p className="text-xs text-success font-medium">Coupon applied! Discount: -{formatCurrency(discount)}</p>
                )}

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-md border border-border text-charcoal text-sm font-medium hover:bg-border/30 transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft className="size-4" /> Back
                  </button>
                  <button
                    onClick={() => setStep(5)}
                    className="px-6 py-3 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-colors flex items-center gap-2"
                  >
                    Proceed to Payment <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Payment Placeholder */}
            {step === 5 && (
              <div className="bg-surface rounded-xl border border-border p-6 shadow-card space-y-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="size-6 text-primary" />
                  <h2 className="font-serif text-2xl font-semibold text-charcoal">Payment Placeholder</h2>
                </div>
                <p className="text-xs text-warm-gray bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-md">
                  💡 This is a frontend demo UI only. No real payment gateways or Razorpay accounts will be charged.
                </p>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-warm-gray uppercase tracking-wider mb-2">
                    Select Payment Method
                  </label>
                  {[
                    { id: "upi", label: "UPI (Google Pay, PhonePe, Paytm)" },
                    { id: "card", label: "Credit / Debit Card" },
                    { id: "netbanking", label: "Net Banking" },
                  ].map((m) => (
                    <label key={m.id} className="flex items-center gap-3 p-3 rounded-md border border-border cursor-pointer hover:bg-background">
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id)}
                        className="accent-primary"
                      />
                      <span className="text-sm font-medium text-charcoal">{m.label}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(4)}
                    className="px-5 py-2.5 rounded-md border border-border text-charcoal text-sm font-medium hover:bg-border/30 transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft className="size-4" /> Back
                  </button>
                  <button
                    onClick={handleCompleteBooking}
                    className="px-8 py-3.5 rounded-md bg-success hover:bg-green-700 text-white font-bold text-base transition-colors flex items-center gap-2 shadow-sm"
                  >
                    Pay {formatCurrency(grandTotal)} & Confirm Booking
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: Confirmation Screen */}
            {step === 6 && (
              <div className="bg-surface rounded-xl border border-border p-8 shadow-card text-center space-y-6">
                <div className="size-16 rounded-full bg-success/15 text-success mx-auto flex items-center justify-center">
                  <Check className="size-8" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-charcoal">Booking Confirmed!</h2>
                <p className="text-warm-gray text-sm max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-charcoal">{firstName || "Arjun"}</span>. Your booking reference number is{" "}
                  <span className="font-mono text-primary font-bold">VNP-2024-8899</span>.
                </p>

                <div className="p-4 bg-background rounded-lg border border-border max-w-md mx-auto text-left text-xs space-y-2 text-warm-gray">
                  <div className="flex justify-between"><span className="font-medium text-charcoal">Resort:</span> <span>Vanapriya Resort, Western Ghats</span></div>
                  <div className="flex justify-between"><span className="font-medium text-charcoal">Item:</span> <span>{bookingType === "room" ? selectedRoom?.name : selectedPackage?.name}</span></div>
                  <div className="flex justify-between"><span className="font-medium text-charcoal">Check-in:</span> <span>{checkIn}</span></div>
                  <div className="flex justify-between"><span className="font-medium text-charcoal">Check-out:</span> <span>{checkOut}</span></div>
                  <div className="flex justify-between"><span className="font-medium text-charcoal">Amount Paid:</span> <span className="font-bold text-charcoal">{formatCurrency(grandTotal)}</span></div>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <Link href="/account" className="px-6 py-3 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold text-sm">
                    Go to My Account
                  </Link>
                  <Link href="/" className="px-6 py-3 rounded-md border border-border text-charcoal hover:bg-border/30 text-sm font-semibold">
                    Return to Home
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar */}
          {!bookingConfirmed && (
            <div className="lg:col-span-1">
              <div className="bg-surface rounded-xl border border-border p-6 shadow-card sticky top-24 space-y-4">
                <h3 className="font-serif text-lg font-semibold text-charcoal border-b border-border pb-3">
                  Summary
                </h3>

                <div className="flex items-center gap-3">
                  <div className="relative size-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={bookingType === "room" ? (selectedRoom?.images[0] || "") : (selectedPackage?.images[0] || "")}
                      alt="Selected item"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal text-sm">
                      {bookingType === "room" ? selectedRoom?.name : selectedPackage?.name}
                    </h4>
                    <p className="text-xs text-warm-gray">
                      {bookingType === "room" ? `${selectedRoom?.type}` : `${selectedPackage?.durationNights}N / ${selectedPackage?.durationDays}D`}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-warm-gray pt-3 border-t border-border">
                  <div className="flex justify-between">
                    <span>Dates</span>
                    <span className="font-medium text-charcoal">{checkIn} → {checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span className="font-medium text-charcoal">{nights} night{nights > 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests</span>
                    <span className="font-medium text-charcoal">{adults} Adults, {children} Kids</span>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-border text-sm">
                  <div className="flex justify-between text-warm-gray">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-warm-gray">
                    <span>Tax & Charges</span>
                    <span>{formatCurrency(taxAmount)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-charcoal text-lg pt-3 border-t border-border">
                    <span>Total Amount</span>
                    <span className="text-primary">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-warm-gray pt-2">
                  <Shield className="size-4 text-success flex-shrink-0" />
                  <span>Free cancellation up to 7 days before check-in.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
