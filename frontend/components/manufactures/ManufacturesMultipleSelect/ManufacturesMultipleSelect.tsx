import { EmptyMsg } from "@/components/shared/messages/empty-msg/empty-msg";
import { ErrorMsg } from "@/components/shared/messages/ErrorMsg/ErrorMsg";
import { IManufacture } from "@/lib/interfaces/IManufacture";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { HiPlus, HiSearch } from "react-icons/hi";
import useSWRInfinite from "swr/infinite";
import ManufactureItem from "../ManufactureItem";
import ManufacturesModal from "../ManufacturesModal";
import ManufactureSelectedList from "../ManufactureSelectedList";

type Props = {};

interface Data {
  next: string | null;
  results: IManufacture[];
}

const getKey = (
  pageIndex: number,
  previousPageData: Data,
  searchText: string
) => {
  if (previousPageData && !previousPageData.next) return null; // reached the end
  return getApiUrl(`/manufactures?page=${pageIndex + 1}&search=${searchText}`); // SWR key
};

const ManufacturesMultipleSelect = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const listRef = useRef<HTMLDivElement>(null);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, searchText),
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

  if (error) return <ErrorMsg message="Error al cargar las marcas" />;

  return (
    <>
      <h4 className="text-medium font-medium text-left w-full mt-2">Marcas</h4>
      <Divider />

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
            <div className="mt-8">
              <EmptyMsg
                title="Sin resultados"
                message="No hay marcas para mostrar"
              />
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
