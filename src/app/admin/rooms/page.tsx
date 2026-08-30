"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit, Trash2, BedDouble, Maximize, Users } from "lucide-react";
import { mockRooms } from "@/data/mock/rooms";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency } from "@/lib/utils";

export default function RoomsManagementPage() {
  const [rooms, setRooms] = useState(mockRooms);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-charcoal">Room Types & Villas</h1>
          <p className="text-xs text-warm-gray mt-1">Manage resort room inventory, base rates, amenities, and status</p>
        </div>
        <button
          onClick={() => alert("Open Add Room Modal")}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors"
        >
          <Plus className="size-3.5" /> Add New Room
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-surface rounded-xl border border-border overflow-hidden shadow-card flex flex-col">
            <div className="relative aspect-[16/10]">
              <Image src={room.images[0]} alt={room.name} fill className="object-cover" />
              <div className="absolute top-3 left-3">
                <StatusBadge status={room.status} />
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <span className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-1">{room.type}</span>
              <h2 className="font-serif text-lg font-bold text-charcoal mb-2">{room.name}</h2>
              <div className="flex items-center gap-4 text-xs text-warm-gray mb-4">
                <span className="flex items-center gap-1"><Users className="size-3.5" /> Max {room.maxOccupancy}</span>
                <span className="flex items-center gap-1"><Maximize className="size-3.5" /> {room.size} sq ft</span>
              </div>
              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-xs text-warm-gray">Base Rate</p>
                  <p className="text-lg font-bold text-charcoal">{formatCurrency(room.basePrice)}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => alert(`Edit ${room.name}`)} className="p-2 rounded border border-border hover:bg-background text-warm-gray hover:text-charcoal">
                    <Edit className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
