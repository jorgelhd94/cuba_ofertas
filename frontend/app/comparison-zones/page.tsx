import { ComparisonZoneList } from "@/components/comparison-zone/ComparisonZoneList/ComparisonZoneList";

export default async function ComparisonZonesPage() {
  return (
    <div className="min-h-max lg:min-h-screen bg-gradient-to-tr from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-800 via-transparent dark:to-black">
      <div className="py-24 lg:py-12 container mx-auto max-w-screen-xl">
        <ComparisonZoneList />
      </div>
    </div>
  );
}
