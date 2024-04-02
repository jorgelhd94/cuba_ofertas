"use client";
import { ProductInfoCard } from "@/components/products/ProductInfoCard/ProductInfoCard";
import { IComparisonZone } from "@/lib/interfaces/IComparisonZone";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React from "react";
import { ComparisonCardMenu } from "../ComparisonCardMenu/ComparisonCardMenu";

type ComparisonZoneCardProps = {
  comparisonZone: IComparisonZone;
};

export const ComparisonZoneCard: React.FC<ComparisonZoneCardProps> = ({
  comparisonZone,
}) => {
  return (
    <Card shadow="sm" className="w-max">
      <CardHeader className="text-lg text-secondary flex justify-center relative">
        {comparisonZone.name}

        <div className="absolute top-1 right-1">
          <ComparisonCardMenu comparisonZoneId={comparisonZone.id} />
        </div>
      </CardHeader>
      <CardBody className="w-80 py-1 flex flex-col justify-center">
        <ProductInfoCard product={comparisonZone.main_product} />
      </CardBody>
      <CardFooter className="flex justify-center">
        <p className="font-medium">
          Comparado con: {comparisonZone.comparison_products?.length} productos
        </p>
      </CardFooter>
    </Card>
  );
};
