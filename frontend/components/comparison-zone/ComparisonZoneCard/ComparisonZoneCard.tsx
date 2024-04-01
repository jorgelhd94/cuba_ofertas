import { ProductInfoCard } from "@/components/products/ProductInfoCard/ProductInfoCard";
import { IComparisonZone } from "@/lib/interfaces/IComparisonZone";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React from "react";

type ComparisonZoneCardProps = {
  comparisonZone: IComparisonZone;
};

export const ComparisonZoneCard: React.FC<ComparisonZoneCardProps> = ({
  comparisonZone,
}) => {
  return (
    <Card shadow="sm" className="w-max" isPressable>
      <CardHeader className="text-lg text-secondary flex justify-center">{comparisonZone.name}</CardHeader>
      <CardBody className="w-80 py-1">
        <ProductInfoCard product={comparisonZone.main_product} />
      </CardBody>
      <CardFooter className="flex justify-center">
        <p className="font-medium">Comparado con: {comparisonZone.comparison_products?.length} productos</p>
      </CardFooter>
    </Card>
  );
};
