"use client";
import { IManufacture } from "@/lib/interfaces/IManufacture";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import ManufactureItem from "./ManufactureItem";
import SimpleMsg from "../shared/messages/SimpleMsg";

type Props = {};

const getUrlParams = (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  urlParams.delete("page");

  if (urlParams.get("manufactures")) {
    return urlParams;
  }

  return null;
};

const ManufactureSelectedList = (props: Props) => {
  const searchParams = useSearchParams();
  const urlParams = getUrlParams(searchParams.toString());

  const shouldFetch = urlParams !== null;

  const { data, isLoading, error } = useSWR(
    shouldFetch
      ? getApiUrl("/manufactures-list/?" + urlParams.toString())
      : null,
    fetcher
  );

  if (!shouldFetch) {
    return null;
  }

  if (isLoading) {
    return <p className="text-sm text-default-300">Cargando marcas...</p>;
  }

  if (error) {
    return <p className="text-sm text-danger">Error al cargar las marcas</p>;
  }

  if (data && data.length === 0 && shouldFetch) {
    return <SimpleMsg message="No hay marcas para esta búsqueda" />;
  }

  if (data && data.length === 0) return null;

  return (
    <div className="w-full flex gap-2 flex-wrap">
      {data &&
        data.length > 0 &&
        data.map((manufacture: IManufacture) => (
          <ManufactureItem key={manufacture.id} manufacture={manufacture} />
        ))}
    </div>
  );
};

export default ManufactureSelectedList;
