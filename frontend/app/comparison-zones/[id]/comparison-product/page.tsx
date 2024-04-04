import { ComparisonProductsSearch } from "@/components/comparison-products/ComparisonProductsSearch";

export default async function AddProductToComparisonPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-max lg:min-h-screen bg-gradient-to-tr from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-800 via-transparent dark:to-black">
      <div className="py-20 px-4 container mx-auto max-w-screen-xl space-y-4">
        <ComparisonProductsSearch zoneId={params.id} />
      </div>
    </div>
  );
}
