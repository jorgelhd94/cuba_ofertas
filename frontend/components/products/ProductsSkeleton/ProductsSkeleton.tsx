import { ProductSkeleton } from "@/components/shared/skeletons/ProductSkeleton";

export const ProductsSkeleton = () => {
  const cards = Array(8).fill(null);

  return (
    <div className="gap-4 flex flex-col sm:flex-row justify-evenly flex-wrap lg:columns-4">
      {cards.map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};
