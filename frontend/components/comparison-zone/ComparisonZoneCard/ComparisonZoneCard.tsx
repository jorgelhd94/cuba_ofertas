"use client";
import { ProductInfoCard } from "@/components/products/ProductInfoCard/ProductInfoCard";
import { IComparisonZone } from "@/lib/interfaces/IComparisonZone";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { ComparisonCardMenu } from "../ComparisonCardMenu/ComparisonCardMenu";

type ComparisonZoneCardProps = {
  comparisonZone: IComparisonZone;
};

export const ComparisonZoneCard: React.FC<ComparisonZoneCardProps> = ({
  comparisonZone,
}) => {
  const router = useRouter();

  const goToZone = () => {
    router.push("/comparison-zones/" + comparisonZone.id);
  };
  return (
    <div className="relative">
      <div className="absolute top-1 right-1">
        <ComparisonCardMenu comparisonZoneId={comparisonZone.id} />
      </div>

      <Card
        shadow="sm"
        className="w-max cursor-pointer"
        onPress={goToZone}
        isPressable
      >
        <CardHeader className="text-lg text-secondary flex justify-center ">
          {comparisonZone.name}
        </CardHeader>
        <CardBody className="w-80 py-1 flex flex-col justify-center">
          <ProductInfoCard product={comparisonZone.main_product} />
        </CardBody>
        <CardFooter className="flex justify-center">
          <p className="font-medium">
            Comparado con: <b>{comparisonZone.comparison_products?.length}</b>{" "}
            productos
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
