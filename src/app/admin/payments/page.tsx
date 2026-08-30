"use client";

import { useState } from "react";
import { CreditCard, IndianRupee, RefreshCw, CheckCircle } from "lucide-react";
import { mockPayments, mockRefunds } from "@/data/mock/payments";
import { KpiCard } from "@/components/admin/KpiCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-charcoal">Payments & Transactions</h1>
        <p className="text-xs text-warm-gray mt-1">Payment logs, Razorpay transactions, refunds, and financial metrics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Collected" value="₹3,35,900" isPositive icon={<IndianRupee className="size-4" />} />
        <KpiCard title="Successful Payments" value="3" icon={<CheckCircle className="size-4 text-success" />} />
        <KpiCard title="Refunded Amount" value="₹17,640" icon={<RefreshCw className="size-4 text-info" />} />
        <KpiCard title="Pending Payments" value="₹1,65,200" icon={<CreditCard className="size-4 text-warning" />} />
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-card overflow-hidden">
        <div className="p-4 border-b border-border font-serif font-bold text-charcoal text-base">Payment Logs</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-background border-b border-border text-warm-gray font-semibold uppercase tracking-wider">
                <th className="p-3.5">Payment ID</th>
                <th className="p-3.5">Booking #</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Method</th>
                <th className="p-3.5">Gateway</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-charcoal font-medium">
              {mockPayments.map((p) => (
                <tr key={p.id} className="hover:bg-background/50">
                  <td className="p-3.5 font-mono font-bold text-primary">{p.paymentId}</td>
                  <td className="p-3.5 font-mono text-warm-gray">{p.bookingNumber}</td>
                  <td className="p-3.5">{p.customerName}</td>
                  <td className="p-3.5 font-bold">{formatCurrency(p.amount)}</td>
                  <td className="p-3.5 uppercase">{p.method}</td>
                  <td className="p-3.5 capitalize">{p.gateway}</td>
                  <td className="p-3.5"><StatusBadge status={p.status} size="sm" /></td>
                  <td className="p-3.5">{formatDate(p.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
