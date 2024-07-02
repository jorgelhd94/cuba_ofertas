import CategoriesSelect from "@/components/categories/CategoriesSelect/CategoriesSelect";
import SearchByProvider from "@/components/providers/SearchByProvider";
import { Drawer } from "flowbite-react";
import { HiAdjustments } from "react-icons/hi";
import { OrderBy } from "../SearchFIlters/OrderBy";
import { PriceByWeightSelect } from "../SearchFIlters/PriceByWeightSelect";
import { ProductModeSelect } from "../SearchFIlters/ProductModeSelect";

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
      className="mt-16 max-sm:w-full z-40 scrollbar-custom"
    >
      <Drawer.Header title="Filtros" titleIcon={HiAdjustments} />
      <Drawer.Items>
        <div className="flex flex-col items-center gap-4 pb-24">
          <OrderBy isDisabled={props.isLoading} />
          <ProductModeSelect isDisabled={props.isLoading} />
          <PriceByWeightSelect isDisabled={props.isLoading} />

          <SearchByProvider isDisabled={props.isLoading} />

          {/* <ManufacturesMultipleSelect /> */}

          <CategoriesSelect />
        </div>
      </Drawer.Items>
    </Drawer>
  );
};

export default FilterDrawer;
