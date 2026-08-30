"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Search, Grid, List, Trash2, Check, Star, Filter, Eye } from "lucide-react";
import { mockMediaItems } from "@/data/mock/content";
import { Modal } from "@/components/shared/Modal";
import type { MediaItem } from "@/types/media";

export default function MediaLibraryPage() {
  const [items, setItems] = useState<MediaItem[]>(mockMediaItems);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const categories = ["all", "resort", "rooms", "packages", "activities", "blog", "seo"];

  const filtered = items.filter((m) => {
    const matchesCat = selectedCategory === "all" || m.category === selectedCategory;
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || m.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-charcoal">Media Library</h1>
          <p className="text-xs text-warm-gray mt-1">Manage resort photography, alt texts, image optimization, and CDN assets</p>
        </div>
        <button
          onClick={() => alert("Simulating upload process...")}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors shadow-xs"
        >
          <Upload className="size-3.5" /> Upload Media
        </button>
      </div>

      {/* Drag and Drop Zone */}
      <div className="border-2 border-dashed border-border hover:border-primary rounded-xl p-8 bg-surface text-center transition-colors cursor-pointer">
        <Upload className="size-8 text-primary mx-auto mb-2" />
        <p className="font-serif font-semibold text-charcoal text-sm">Drag and drop images here, or browse</p>
        <p className="text-xs text-warm-gray mt-1">Supports JPG, PNG, WebP up to 10MB each</p>
      </div>

      {/* Controls Bar */}
      <div className="bg-surface rounded-xl border border-border p-4 shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-warm-gray" />
          <input
            type="text"
            placeholder="Search media files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-md border border-border text-xs text-charcoal focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto">
          {/* Category Filter */}
          <div className="flex rounded-md border border-border overflow-hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  selectedCategory === cat ? "bg-primary text-white" : "bg-background text-warm-gray hover:text-charcoal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex rounded-md border border-border overflow-hidden flex-shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 transition-colors ${viewMode === "grid" ? "bg-primary text-white" : "text-warm-gray"}`}
            >
              <Grid className="size-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 transition-colors ${viewMode === "list" ? "bg-primary text-white" : "text-warm-gray"}`}
            >
              <List className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or List View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="group relative bg-surface rounded-lg border border-border overflow-hidden shadow-xs cursor-pointer hover:border-primary transition-all aspect-square"
            >
              <Image src={item.url} alt={item.altText} fill className="object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-white">
                <span className="text-[10px] font-semibold uppercase bg-accent/80 px-1.5 py-0.5 rounded self-start">{item.category}</span>
                <p className="text-xs font-medium truncate">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-xl border border-border shadow-card overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-background border-b border-border text-warm-gray font-semibold uppercase">
                <th className="p-3.5">Preview</th>
                <th className="p-3.5">Title / File</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Dimensions</th>
                <th className="p-3.5">Size</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-charcoal font-medium">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-background/50">
                  <td className="p-3.5">
                    <div className="relative size-10 rounded overflow-hidden">
                      <Image src={item.url} alt={item.altText} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="p-3.5">
                    <p className="font-bold">{item.title}</p>
                    <p className="text-[11px] text-warm-gray">{item.fileName}</p>
                  </td>
                  <td className="p-3.5 capitalize">{item.category}</td>
                  <td className="p-3.5">{item.width} x {item.height}</td>
                  <td className="p-3.5">{item.fileSizeKb} KB</td>
                  <td className="p-3.5 text-right">
                    <button onClick={() => setSelectedMedia(item)} className="px-2.5 py-1 rounded border border-border text-xs">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Image Details Modal */}
      {selectedMedia && (
        <Modal isOpen={Boolean(selectedMedia)} onClose={() => setSelectedMedia(null)} title="Media Asset Details" size="lg">
          <div className="grid sm:grid-cols-2 gap-6 text-xs">
            <div className="relative aspect-square rounded-lg overflow-hidden border border-border">
              <Image src={selectedMedia.url} alt={selectedMedia.altText} fill className="object-cover" />
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-warm-gray font-semibold block mb-1">Title</label>
                <input type="text" defaultValue={selectedMedia.title} className="w-full px-3 py-1.5 rounded border border-border text-charcoal" />
              </div>
              <div>
                <label className="text-warm-gray font-semibold block mb-1">Alt Text (SEO)</label>
                <textarea rows={2} defaultValue={selectedMedia.altText} className="w-full px-3 py-1.5 rounded border border-border text-charcoal" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-warm-gray pt-2 border-t border-border">
                <div><span className="font-semibold text-charcoal">Dimensions:</span> {selectedMedia.width}×{selectedMedia.height}</div>
                <div><span className="font-semibold text-charcoal">Size:</span> {selectedMedia.fileSizeKb} KB</div>
                <div><span className="font-semibold text-charcoal">Format:</span> {selectedMedia.format.toUpperCase()}</div>
                <div><span className="font-semibold text-charcoal">Category:</span> {selectedMedia.category}</div>
              </div>
              <div className="pt-4 flex gap-2">
                <button onClick={() => setSelectedMedia(null)} className="flex-1 py-2 rounded bg-primary text-white font-semibold">Save Details</button>
                <button onClick={() => { setItems(items.filter(i => i.id !== selectedMedia.id)); setSelectedMedia(null); }} className="px-3 py-2 rounded border border-red-200 text-error hover:bg-red-50">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
