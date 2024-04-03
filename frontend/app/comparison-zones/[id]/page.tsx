import { ManageComparisonZone } from "@/components/comparison-zone/ManageComparisonZone";

export default async function ComparisonZoneManagePage({
  params,
}: {
  params: { id: string | number };
}) {
  return (
    <div className="min-h-max lg:min-h-screen bg-gradient-to-tr from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-800 via-transparent dark:to-black">
      <div className="py-20 px-4 container mx-auto max-w-screen-xl space-y-4">
        <ManageComparisonZone id={params.id} />
      </div>
    </div>
  );
}
