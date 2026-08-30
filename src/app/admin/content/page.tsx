"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Edit, Plus } from "lucide-react";
import { mockBlogPosts, mockFAQs, mockAttractions } from "@/data/mock/content";

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState<"blog" | "faqs" | "attractions">("blog");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-charcoal">Content Management</h1>
          <p className="text-xs text-warm-gray mt-1">Manage website copy, blog posts, FAQs, and nearby sightseeing listings</p>
        </div>
        <button onClick={() => alert("Add content entry")} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-primary text-white text-xs font-semibold hover:bg-primary-dark">
          <Plus className="size-3.5" /> Add New Content
        </button>
      </div>

      <div className="flex border-b border-border">
        {[
          { id: "blog", label: `Blog Articles (${mockBlogPosts.length})` },
          { id: "faqs", label: `FAQs (${mockFAQs.length})` },
          { id: "attractions", label: `Attractions (${mockAttractions.length})` },
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

      <div className="bg-surface rounded-xl border border-border shadow-card overflow-hidden">
        {activeTab === "blog" && (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-background border-b border-border text-warm-gray font-semibold uppercase">
                <th className="p-3.5">Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Author</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-medium">
              {mockBlogPosts.map((post) => (
                <tr key={post.id} className="hover:bg-background/50">
                  <td className="p-3.5 font-bold text-charcoal">{post.title}</td>
                  <td className="p-3.5">{post.category}</td>
                  <td className="p-3.5">{post.author}</td>
                  <td className="p-3.5 capitalize text-success">{post.status}</td>
                  <td className="p-3.5 text-right">
                    <button className="px-2.5 py-1 rounded border border-border">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "faqs" && (
          <div className="divide-y divide-border">
            {mockFAQs.map((faq) => (
              <div key={faq.id} className="p-4 hover:bg-background/50 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-charcoal mb-1">{faq.question}</p>
                  <p className="text-warm-gray">{faq.answer}</p>
                </div>
                <button className="px-2.5 py-1 rounded border border-border flex-shrink-0 ml-4">Edit</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "attractions" && (
          <div className="divide-y divide-border">
            {mockAttractions.map((att) => (
              <div key={att.id} className="p-4 hover:bg-background/50 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-charcoal mb-1">{att.name} ({att.distance})</p>
                  <p className="text-warm-gray">{att.description}</p>
                </div>
                <button className="px-2.5 py-1 rounded border border-border flex-shrink-0 ml-4">Edit</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
