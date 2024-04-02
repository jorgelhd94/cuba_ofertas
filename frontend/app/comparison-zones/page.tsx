import { ComparisonZoneCard } from "@/components/comparison-zone/ComparisonZoneCard/ComparisonZoneCard";
import { EmptyMsg } from "@/components/shared/messages/empty-msg/empty-msg";
import { IComparisonZone } from "@/lib/interfaces/IComparisonZone";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getData(): Promise<IComparisonZone[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL! + "api/v1/comparation_zones/",
    { cache: "no-store" }
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
        {comparisonZones.length ? (
          <div className="w-full md:pt-8 space-y-8">
            <h1 className="text-3xl w-full text-center">
              Zonas de comparación
            </h1>
            <div className="gap-8 flex flex-col sm:flex-row max-sm:items-center justify-center flex-wrap">
              {comparisonZones.map((zone) => {
                return (
                  <ComparisonZoneCard key={zone.id} comparisonZone={zone} />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-4">
            <EmptyMsg
              title="Opps!!"
              message="No se han creado Zonas de comparación"
            />
            <Button color="primary" variant="ghost" size="lg">
              <Link href="/search">Ir a la búsqueda general</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
