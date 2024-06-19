import { ManageComparisonZone } from "@/components/comparison-zone/ManageComparisonZone";

export default async function ComparisonZoneManagePage({
  params,
}: {
  params: { id: string | number };
}) {
  return (
    <div className="container mx-auto max-w-screen-xl p-8">
      <ManageComparisonZone id={params.id} />
    </div>
  );
}
