import { ComparisonZoneCard } from "@/components/comparison-zone/ComparisonZoneCard/ComparisonZoneCard";
import { EmptyMsg } from "@/components/shared/messages/empty-msg/empty-msg";
import { IComparisonZone } from "@/lib/interfaces/IComparisonZone";

async function getData(): Promise<IComparisonZone[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL! + "api/v1/comparation_zones/"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ComparisonZonesPage() {
  const comparisonZones = await getData();

  return (
    <div className="min-h-max lg:min-h-screen bg-gradient-to-tr from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-800 via-transparent dark:to-black">
      <div className="py-24 lg:py-12 container mx-auto max-w-screen-xl">
        <div className="w-full md:pt-8 space-y-8">
          <h1 className="text-3xl w-full text-center">Zonas de comparación</h1>
          <div className="gap-4 flex flex-col sm:flex-row items-center justify-evenly flex-wrap">
            {comparisonZones.map((zone) => {
              return <ComparisonZoneCard key={zone.id} comparisonZone={zone} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
