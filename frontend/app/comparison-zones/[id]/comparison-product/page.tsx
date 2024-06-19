import { ComparisonProductsSearch } from "@/components/comparison-products/ComparisonProductsSearch";

export default async function AddProductToComparisonPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto max-w-screen-xl p-8">
      <ComparisonProductsSearch zoneId={params.id} />
    </div>
  );
}
