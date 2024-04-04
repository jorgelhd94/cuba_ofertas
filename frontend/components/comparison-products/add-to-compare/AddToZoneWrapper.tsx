import React, { useContext } from "react";
import { AddToCurrentZoneModal } from "./AddToCurrentZoneModal";
import { AddToSelectZoneModal } from "./AddToSelectZoneModal";
import { IProduct } from "@/lib/interfaces/IProduct";
import { ComparisonZoneContext } from "@/lib/context/ComparisonZoneContext";

type Props = {
  isOpen: boolean;
  onOpenChange: ((isOpen: boolean) => void) | undefined;
  product: IProduct;
};

export const AddToZoneWrapper: React.FC<Props> = (props) => {
  const comparisonZone = useContext(ComparisonZoneContext);

  return comparisonZone ? (
    <AddToCurrentZoneModal
      product={props.product}
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
    />
  ) : (
    <AddToSelectZoneModal
      product={props.product}
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
    />
  );
};
