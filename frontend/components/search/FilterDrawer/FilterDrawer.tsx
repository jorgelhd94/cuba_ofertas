import CategoriesSelect from "@/components/categories/CategoriesSelect/CategoriesSelect";
import SearchByProvider from "@/components/providers/SearchByProvider";
import { HiAdjustments } from "react-icons/hi";
import { OrderBy } from "../SearchFIlters/OrderBy";
import { PriceByWeightSelect } from "../SearchFIlters/PriceByWeightSelect";
import { ProductModeSelect } from "../SearchFIlters/ProductModeSelect";
import { Drawer } from "flowbite-react";
import { Button } from "@nextui-org/react";
import getCleanUrlFilters from "@/lib/utils/functions/SearchFilters/getCleanUrlFilters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import handleCountFilters from "@/lib/utils/functions/SearchFilters/handleCountFilters";
import ManufacturesMultipleSelect from "@/components/manufactures/ManufacturesMultipleSelect/ManufacturesMultipleSelect";

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  handleClose: Function;
};

const FilterDrawer = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const cleanFilters = () => {
    router.push(pathname + "?" + getCleanUrlFilters(searchParams));
  };
  return (
    <Drawer
      open={props.isOpen}
      onClose={() => props.handleClose()}
      position="right"
      className="mt-16 max-sm:w-full w-80 z-40 p-0 overflow-y-hidden"
    >
      <Drawer.Header
        title="Filtros"
        titleIcon={HiAdjustments}
        className="p-4 pb-0"
      />
      <Drawer.Items className="relative scrollbar-custom overflow-y-auto h-[90vh]">
        <div className="flex flex-col items-center gap-4 pb-16 px-4">
          <OrderBy isDisabled={props.isLoading} />
          <ProductModeSelect isDisabled={props.isLoading} />
          <PriceByWeightSelect isDisabled={props.isLoading} />

          <SearchByProvider isDisabled={props.isLoading} />

          <ManufacturesMultipleSelect />

          <CategoriesSelect />
        </div>
        <div className="sticky bottom-12 z-40 w-full h-16 bg-default-50 flex justify-center items-center gap-4">
          <Button
            startContent={<HiAdjustments />}
            endContent={<span>{handleCountFilters(searchParams)}</span>}
            color="danger"
            onClick={cleanFilters}
          >
            Limpiar filtros
          </Button>
          <Button
            variant="bordered"
            color="primary"
            onClick={() => props.handleClose()}
          >
            Cerrar
          </Button>
        </div>
      </Drawer.Items>
    </Drawer>
  );
};

export default FilterDrawer;
