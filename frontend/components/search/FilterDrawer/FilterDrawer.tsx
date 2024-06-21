import { Drawer } from "flowbite-react";
import { HiAdjustments } from "react-icons/hi";
import { OrderBy } from "../SearchFIlters/OrderBy";
import { ProductModeSelect } from "../SearchFIlters/ProductModeSelect";
import SearchByProvider from "@/components/providers/SearchByProvider";

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  handleClose: Function;
};

const FilterDrawer = (props: Props) => {
  return (
    <Drawer
      open={props.isOpen}
      onClose={() => props.handleClose()}
      position="right"
      className="mt-14 max-sm:w-full z-50"
    >
      <Drawer.Header title="Filtros" titleIcon={HiAdjustments} />
      <Drawer.Items>
        <div className="flex flex-col items-center gap-4">
          <OrderBy isDisabled={props.isLoading} />
          <ProductModeSelect isDisabled={props.isLoading} />

          <SearchByProvider isDisabled={props.isLoading} />

          {/* <ManufacturesMultipleSelect />

          <h4 className="text-medium font-medium text-left w-full mt-2">
            Categorías
          </h4>
          <Divider />
          <CategoriesChecklist /> */}
        </div>
      </Drawer.Items>
    </Drawer>
  );
};

export default FilterDrawer;
