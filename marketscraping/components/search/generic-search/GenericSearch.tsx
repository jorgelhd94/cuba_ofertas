"use client";
import { SubmitBtn } from "@/components/shared/buttons/SubmitBtn/SubmitBtn";
import { SearchIcon } from "@/components/shared/icons/SearchIcon";
import { searchAllProducts } from "@/lib/actions/search/search";
import { Input } from "@nextui-org/react";
import { useEffect } from "react";
import { useFormState } from "react-dom";

type GenericSearchProps = {
  handleProducts: Function;
};

type StateProps = {
  message: string;
  data: any;
};

const initialState: StateProps = {
  message: "",
  data: null,
};

export const GenericSearch: React.FC<GenericSearchProps> = (props) => {
  const [state, searchAction] = useFormState(searchAllProducts, initialState);

  useEffect(() => {
    if (state?.data) {
      props.handleProducts(state.data);
    }
  }, [props, state]);

  return (
    <div className="max-w-2xl w-full flex flex-col max-md:items-center">
      <form
        action={searchAction}
        className="w-full flex max-md:flex-col max-md:px-4 gap-4 items-center"
      >
        <Input
          name="searchText"
          variant="bordered"
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
          }}
          placeholder="Escribe el nombre del producto..."
          startContent={<SearchIcon />}
        />

        <SubmitBtn />
      </form>

      {state?.message && (
        <p className="bg-red-400 text-white py-2 px-4 rounded-lg w-max mt-4">
          {state?.message}
        </p>
      )}
    </div>
  );
};
