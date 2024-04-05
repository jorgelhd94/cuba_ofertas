import { IComparisonZone } from "@/lib/interfaces/IComparisonZone";
import { IProduct } from "@/lib/interfaces/IProduct";
import { fetcher } from "@/lib/utils/api/fetcher";
import {
  getComparisonZoneById,
  isProductInZone,
} from "@/lib/utils/functions/comparison-zone";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

type Props = {
  onSelectChange: (id: string) => void;
  product?: IProduct;
};

export const ZoneSelect: React.FC<Props> = (props) => {
  const { data, error, isLoading } = useSWR("/api/comparison-zones/", fetcher);
  const [comparisonZones, setComparisonZones] = useState<IComparisonZone[]>([]);
  const [isInComparisonZone, setIsInComparisonZone] = useState(false);

  useEffect(() => {
    if (data) {
      setComparisonZones(data.comparisonZones);
    }
  }, [data]);

  if (error) {
    return <p className="text-danger">Error al cargar las zonas</p>;
  }

  const handleSelect = (value: string) => {
    const zone = getComparisonZoneById(value, comparisonZones);
    const isInZone =
      zone && isProductInZone(props.product?.product_id || "", zone);

    if (isInZone) {
      setIsInComparisonZone(true);
    } else {
      setIsInComparisonZone(false);
      props.onSelectChange(value);
    }
  };

  return (
    <Select
      variant="bordered"
      label="Seleccione una zona"
      isLoading={isLoading}
      onChange={(event) => handleSelect(event.target.value)}
      isRequired
      isInvalid={isInComparisonZone}
      errorMessage={isInComparisonZone && "El producto ya está en esta zona"}
    >
      {comparisonZones.map((zone) => (
        <SelectItem key={zone.id} value={zone.id}>
          {zone.name}
        </SelectItem>
      ))}
    </Select>
  );
};
