import { mockPackages } from "@/data/mock/packages";
import { PackageCard } from "@/components/website/PackageCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holiday Packages",
  description: "Explore our curated holiday packages for couples, families, and nature lovers.",
};

export default function PackagesPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary-dark text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Packages" }]} variant="dark" className="mb-4" />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">Holiday Packages</h1>
          <p className="text-white/70 max-w-xl">
            Thoughtfully curated packages that bring together accommodation, activities, and experiences into one seamless escape.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
}
