import SimpleMsg from "@/components/shared/messages/SimpleMsg";
import { IManufacture } from "@/lib/interfaces/IManufacture";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import {
  Button,
  Divider,
  Input
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiPlus, HiSearch } from "react-icons/hi";
import useSWRInfinite from "swr/infinite";
import ManufactureItem from "../ManufactureItem";
import ManufactureSelectedList from "../ManufactureSelectedList";
import ManufacturesModal from "../ManufacturesModal";

type Props = {};

interface Data {
  next: string | null;
  results: IManufacture[];
}

const getKey = (
  pageIndex: number,
  previousPageData: Data,
  searchText: string,
  searchParams: URLSearchParams
) => {
  if (previousPageData && !previousPageData.next) return null; // reached the end

  const urlParams = new URLSearchParams(searchParams.toString());
  urlParams.delete("page");
  urlParams.delete("manufactures");

  return getApiUrl(
    `/manufactures-list?page=${
      pageIndex + 1
    }&search=${searchText}&${urlParams.toString()}`
  ); // SWR key
};

const ManufacturesMultipleSelect = (props: Props) => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const listRef = useRef<HTMLDivElement>(null);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, searchText, searchParams),
    fetcher
  );

  const handleScroll = (event: any) => {
    const target = event.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setSize((prevSize) => prevSize + 1);
    }
  };

  useEffect(() => {
    setIsDataEmpty(data && data[0] && data[0].results.length === 0);
  }, [data]);

  useEffect(() => {
    mutate(); // Refetch data when searchText changes
  }, [searchText, mutate]);

  return (
    <>
      <h4 className="text-medium font-medium text-left w-full mt-2">Marcas</h4>
      <Divider />

      {error ? (
        <SimpleMsg message="Error al cargar las marcas" type="error" />
      ) : (
        <>
          <ManufactureSelectedList />

          <div className="flex w-full">
            <Button
              onClick={() => setIsOpen(true)}
              startContent={<HiPlus />}
              aria-label="Add"
              color="secondary"
              isLoading={isLoading}
            >
              Seleccionar
            </Button>
          </div>
        </>
      )}

      <ManufacturesModal
        ref={listRef}
        isOpen={isOpen}
        handleScroll={handleScroll}
        onOpenChange={setIsOpen}
      >
        <>
          <Input
            isClearable
            variant="bordered"
            placeholder="Buscar..."
            size="sm"
            className="sticky top-0 bg-default-50 z-10"
            startContent={<HiSearch />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onClear={() => setSearchText("")}
          />

          {isLoading && (
            <div className="text-default-300 text-center mt-8 w-full">
              Buscando resultados...
            </div>
          )}

          {isDataEmpty && (
            <div className="mt-8 w-full text-center">
              <p className="text-default-400">
                No hay marcas para mostrar
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 min-h-36">
            {data &&
              data.map((response, index) => {
                return response.results.map((manufacture: IManufacture) => (
                  <ManufactureItem
                    manufacture={manufacture}
                    key={manufacture.id}
                  />
                ));
              })}

            {data && data[data.length - 1].next && (
              <p className="mt-4 col-span-3 sm:col-span-4 md:col-span-5 text-default-400 text-sm text-center">
                Cargando más marcas...
              </p>
            )}
          </div>
        </>
      </ManufacturesModal>
    </>
  );
};

export default ManufacturesMultipleSelect;
