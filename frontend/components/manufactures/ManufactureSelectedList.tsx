"use client";
import { IManufacture } from "@/lib/interfaces/IManufacture";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import ManufactureItem from "./ManufactureItem";

type Props = {};

const ManufactureSelectedList = (props: Props) => {
  const searchParams = useSearchParams();

  const getParams = () => {
    return searchParams.get("manufactures")
      ? "?b=" + searchParams.get("manufactures")
      : "";
  };

  const { data, isLoading, error } = useSWR(
    getApiUrl("/manufactures/list_by_ids/" + getParams()),
    fetcher
  );

  

  if (error) {
    <p className="text-sm text-danger">Error al cargar las marcas</p>;
  }

  if (isLoading) {
    <p className="text-sm text-default-300">Cargando marcas...</p>;
  }

  if (data && data.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex gap-2 flex-wrap">
      {data &&
        data.length > 0 &&
        data.map((manufacture: IManufacture) => (
          <ManufactureItem
            key={manufacture.id}
            manufacture={manufacture}
          />
        ))}
    </div>
  );
};

export default ManufactureSelectedList;
