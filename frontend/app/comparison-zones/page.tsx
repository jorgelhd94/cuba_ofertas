import { ComparisonZoneCard } from "@/components/comparison-zone/ComparisonZoneCard/ComparisonZoneCard";
import { EmptyMsg } from "@/components/shared/messages/empty-msg/empty-msg";
import { IComparisonZone } from "@/lib/interfaces/IComparisonZone";

export default async function ComparisonZonesPage() {
  const data = await fetch(
    process.env.NEXT_PUBLIC_API_URL! + "api/v1/comparation_zones/"
  );

  const comparisonZones = (await data.json()) as IComparisonZone[];

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
