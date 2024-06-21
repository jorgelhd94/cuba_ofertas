import { IManufacture } from "@/lib/interfaces/IManufacture";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import useSWRInfinite from "swr/infinite";

type Props = {};

const getKey = (pageIndex: number, previousPageData: IManufacture[]) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return `${getApiUrl()}/manufactures?page=${
    pageIndex + 1
  }&page_size=100`; // SWR key
};

const ManufacturesMultipleSelect = (props: Props) => {
  const { data, error, isLoading, size, setSize } = useSWRInfinite(
    getKey,
    fetcher
  );

  const [isOpen, setIsOpen] = useState(false);

  if (isLoading || !data) return "loading";
  if (error) return "error";

  const handleScroll = (event: any) => {
    if (event.currentTarget) {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight) {
        setSize(size + 1);
      }
    }
  };

  return (
    <>
      <h4 className="text-medium font-medium text-left w-full mt-2">Marcas</h4>
      <Divider />
      <Button
        onClick={() => setIsOpen(true)}
        startContent={<HiPlus />}
        aria-label="Add"
        color="secondary"
      >
        Seleccionar
      </Button>

      <Modal
        size="2xl"
        placement="top"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Seleccionar marca</ModalHeader>
              <ModalBody
                onScrollCapture={(event) => handleScroll(event)}
                className="flex gap-x-4 gap-y-2 flex-row flex-wrap max-h-36'"
              >
                {data.map((response, index) => {
                  return response.results.map((manufacture: IManufacture) => (
                    <Button size="sm" variant="ghost" key={manufacture.id}>
                      {manufacture.name}
                    </Button>
                  ));
                })}
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ManufacturesMultipleSelect;
