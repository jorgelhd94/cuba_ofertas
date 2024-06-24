import { IProvider } from "@/lib/interfaces/IProvider";
import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

type Props = {
  providers: IProvider[];
  isDisabled?: boolean;
  handleSelect: Function;
  selectedKey?: string | null;
  errorMessage?: string;
};

const ProviderSelect = (props: Props) => {
  return (
    <Select
      isDisabled={props.isDisabled}
      selectedKeys={props.selectedKey ? [props.selectedKey] : []}
      selectionMode="single"
      placeholder="Seleccione un proveedor"
      variant="faded"
      label="Seleccionar proveedor"
      className="max-w-64"
      onChange={(event) => props.handleSelect(event.target.value)}
      errorMessage={props.errorMessage}
      color={props.selectedKey ? "primary" : "default"}
    >
      {props.providers.map((provider) => (
        <SelectItem key={provider.id} value={provider.id}>
          {provider.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default ProviderSelect;
