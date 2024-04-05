import { IComparisonZone } from "@/lib/interfaces/IComparisonZone";

export const getComparisonZoneById = (
  comparisonZoneId: string,
  comparisonZones: IComparisonZone[]
) => {
  return comparisonZones.find(
    (zone) => zone.id.toString() === comparisonZoneId
  );
};

export const isProductInZone = (
  productId: string,
  comparisonZone: IComparisonZone
) => {
  if (!comparisonZone.comparison_products) return false;
  if (comparisonZone.main_product.product_id === productId) return true;
  
  return (
    comparisonZone.comparison_products.find(
      (product) => product.product_id === productId
    ) !== undefined
  );
};
