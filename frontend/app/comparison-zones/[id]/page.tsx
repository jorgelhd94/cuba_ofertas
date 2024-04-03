import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function ComparisonZoneManagePage({
  params,
}: {
  params: { id: string | number };
}) {
  return (
    <div className="min-h-max lg:min-h-screen bg-gradient-to-tr from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-800 via-transparent dark:to-black">
      <div className="py-20 px-4 container mx-auto max-w-screen-xl space-y-4">
        <div className="flex flex-col gap-2">
          <Link href="/comparison-zones">
            <Button color="primary" variant="ghost">
              Todas las zonas
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl sm:text-center">
              Administrar zona: {params.id}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
