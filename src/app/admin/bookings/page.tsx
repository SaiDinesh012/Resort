"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Download, Filter, Eye } from "lucide-react";
import { mockBookings } from "@/data/mock/bookings";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function BookingsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = mockBookings.filter((b) => {
    const matchesSearch =
      b.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guestDetails.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guestDetails.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || b.bookingStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-charcoal">Booking Management</h1>
          <p className="text-xs text-warm-gray mt-1">View, manage, filter, and export resort reservations</p>
        </div>
        <button
          onClick={() => alert("Exporting bookings report to CSV...")}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-border bg-surface text-charcoal text-xs font-semibold hover:bg-background transition-colors"
        >
          <Download className="size-3.5" /> Export Bookings CSV
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface rounded-xl border border-border p-4 shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-warm-gray" />
          <input
            type="text"
            placeholder="Search by ID or guest name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-md border border-border text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="size-4 text-warm-gray" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-md border border-border text-xs text-charcoal bg-background focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-background border-b border-border text-warm-gray font-semibold uppercase tracking-wider">
                <th className="p-3.5">Booking ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Item</th>
                <th className="p-3.5">Dates</th>
                <th className="p-3.5">Guests</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Payment</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-charcoal font-medium">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-background/60 transition-colors">
                  <td className="p-3.5 font-mono text-primary font-bold">{b.bookingNumber}</td>
                  <td className="p-3.5">
                    <p className="font-semibold">{b.guestDetails.firstName} {b.guestDetails.lastName}</p>
                    <p className="text-[11px] text-warm-gray">{b.guestDetails.email}</p>
                  </td>
                  <td className="p-3.5">{b.roomName || b.packageName}</td>
                  <td className="p-3.5">{formatDate(b.checkIn)} → {formatDate(b.checkOut)}</td>
                  <td className="p-3.5">{b.adults}A, {b.children}C</td>
                  <td className="p-3.5 font-bold">{formatCurrency(b.priceBreakdown.total)}</td>
                  <td className="p-3.5"><StatusBadge status={b.paymentStatus} size="sm" /></td>
                  <td className="p-3.5"><StatusBadge status={b.bookingStatus} size="sm" /></td>
                  <td className="p-3.5 text-right">
                    <Link
                      href={`/admin/bookings/${b.id}`}
                      className="px-2.5 py-1 rounded border border-border text-charcoal hover:bg-primary hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="size-3" /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
