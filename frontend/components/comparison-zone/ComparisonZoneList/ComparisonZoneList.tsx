"use client";
import React, { useEffect, useState } from "react";
import { ComparisonZoneCard } from "../ComparisonZoneCard/ComparisonZoneCard";
import { EmptyMsg } from "@/components/shared/messages/empty-msg/empty-msg";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import useSWR from "swr";
import { IComparisonZone } from "@/lib/interfaces/IComparisonZone";
import { fetcher } from "@/lib/utils/api/fetcher";

export const ComparisonZoneList = () => {
  const { data, error, isLoading } = useSWR("/comparison-zones/api/", fetcher);
  const [comparisonZones, setComparisonZones] = useState<IComparisonZone[]>([]);

  useEffect(() => {
    if (data) {
      setComparisonZones(data.comparisonZones);
    }
  }, [data]);

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>failed to load</div>;

  return (
    <div>
      {comparisonZones && comparisonZones.length ? (
        <div className="w-full md:pt-8 space-y-8">
          <h1 className="text-3xl w-full text-center">Zonas de comparación</h1>
          <div className="gap-8 flex flex-col sm:flex-row max-sm:items-center justify-center flex-wrap">
            {comparisonZones.map((zone: IComparisonZone) => {
              return <ComparisonZoneCard key={zone.id} comparisonZone={zone} />;
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
  );
};
