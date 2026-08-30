"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit, Clock, Check } from "lucide-react";
import { mockPackages } from "@/data/mock/packages";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency } from "@/lib/utils";

export default function PackagesManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-charcoal">Resort Packages</h1>
          <p className="text-xs text-warm-gray mt-1">Manage experiential packages, itineraries, and inclusions</p>
        </div>
        <button
          onClick={() => alert("Open Package Creation Wizard")}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-accent text-white text-xs font-semibold hover:bg-accent-dark transition-colors"
        >
          <Plus className="size-3.5" /> Create New Package
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPackages.map((pkg) => (
          <div key={pkg.id} className="bg-surface rounded-xl border border-border overflow-hidden shadow-card flex flex-col">
            <div className="relative aspect-[16/10]">
              <Image src={pkg.images[0]} alt={pkg.name} fill className="object-cover" />
              <div className="absolute top-3 left-3">
                <StatusBadge status={pkg.status} />
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-1 text-xs text-accent font-semibold mb-1">
                <Clock className="size-3.5" /> {pkg.durationNights}N / {pkg.durationDays}D
              </div>
              <h2 className="font-serif text-lg font-bold text-charcoal mb-2">{pkg.name}</h2>
              <p className="text-xs text-warm-gray line-clamp-2 mb-4">{pkg.description}</p>
              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-xs text-warm-gray">Price</p>
                  <p className="text-lg font-bold text-charcoal">{formatCurrency(pkg.price)}</p>
                </div>
                <button onClick={() => alert(`Edit ${pkg.name}`)} className="p-2 rounded border border-border hover:bg-background text-warm-gray hover:text-charcoal">
                  <Edit className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
