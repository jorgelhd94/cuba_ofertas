import { OrderBy } from "@/components/shared/selects/order-by/OrderBy";
import { ProductModeSelect } from "@/components/shared/selects/product-mode-select/ProductModeSelect";
import { Drawer } from "flowbite-react";
import { HiAdjustments } from "react-icons/hi";

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
      className="mt-14 max-sm:w-full"
    >
      <Drawer.Header title="Filtros" titleIcon={HiAdjustments} />
      <Drawer.Items>
        <div className="flex flex-col items-center gap-4">
          <ProductModeSelect isDisabled={props.isLoading} />
          <OrderBy isDisabled={props.isLoading} />
        </div>
      </Drawer.Items>
    </Drawer>
  );
};

export default FilterDrawer;
