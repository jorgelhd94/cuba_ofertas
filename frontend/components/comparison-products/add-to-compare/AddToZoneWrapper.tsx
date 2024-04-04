import React, { useContext } from "react";
import { AddToCurrentZoneModal } from "./AddToCurrentZoneModal";
import { AddToSelectZoneModal } from "./AddToSelectZoneModal";
import { ComparisonZoneIdContext } from "@/lib/context/ComparisonZoneIdContext";
import { IProduct } from "@/lib/interfaces/IProduct";

type Props = {
  isOpen: boolean;
  onOpenChange: ((isOpen: boolean) => void) | undefined;
  product: IProduct;
};

export const AddToZoneWrapper: React.FC<Props> = (props) => {
  const zoneId = useContext(ComparisonZoneIdContext);

  return zoneId ? (
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
