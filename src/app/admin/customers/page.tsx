"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Download, User } from "lucide-react";
import { mockCustomers } from "@/data/mock/customers";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function CustomersManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockCustomers.filter((c) =>
    `${c.firstName} ${c.lastName} ${c.email} ${c.phone}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-charcoal">Customer Directory</h1>
          <p className="text-xs text-warm-gray mt-1">Manage guest profiles, loyalty history, and spending records</p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-border bg-surface text-charcoal text-xs font-semibold hover:bg-background">
          <Download className="size-3.5" /> Export Guests CSV
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border p-4 shadow-xs">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-warm-gray" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-md border border-border text-xs text-charcoal focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-background border-b border-border text-warm-gray font-semibold uppercase tracking-wider">
                <th className="p-3.5">Guest</th>
                <th className="p-3.5">Contact</th>
                <th className="p-3.5">Total Bookings</th>
                <th className="p-3.5">Total Spend</th>
                <th className="p-3.5">Last Booking</th>
                <th className="p-3.5">Tags</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-charcoal font-medium">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-background/50">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      {c.avatar ? (
                        <Image src={c.avatar} alt={c.firstName} width={32} height={32} className="rounded-full size-8 object-cover" />
                      ) : (
                        <div className="size-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                          {c.firstName[0]}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">{c.firstName} {c.lastName}</p>
                        <p className="text-[11px] text-warm-gray">{c.city}, {c.country}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <p>{c.email}</p>
                    <p className="text-[11px] text-warm-gray">{c.phone}</p>
                  </td>
                  <td className="p-3.5 font-bold">{c.totalBookings}</td>
                  <td className="p-3.5 font-bold text-primary">{formatCurrency(c.totalSpend)}</td>
                  <td className="p-3.5">{c.lastBookingDate ? formatDate(c.lastBookingDate) : "—"}</td>
                  <td className="p-3.5">
                    <div className="flex gap-1">
                      {c.tags?.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-accent/15 text-accent font-semibold text-[10px]">{t}</span>
                      )) || "—"}
                    </div>
                  </td>
                  <td className="p-3.5"><StatusBadge status={c.status} size="sm" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
