import { getQueryString } from "@/lib/utils/functions/getQueryString";
import { Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  isDisabled?: boolean;
};

const ChangeLimitSelect: React.FC<Props> = ({ isDisabled }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const options = ["10", "20", "50", "100"];

  const handleSelect = (criteria: string) => {
    router.push(
      pathname +
        "?" +
        getQueryString(searchParams.toString(), {
          name: "page_size",
          value: criteria,
        })
    );
  };

  return (
    <Select
      isDisabled={isDisabled}
      selectedKeys={[searchParams.get("page_size") || "50"]}
      selectionMode="single"
      variant="faded"
      label="Mostrando"
      className="w-32"
      onChange={(event) => handleSelect(event.target.value)}
      size="sm"
      labelPlacement="outside"
    >
      {options.map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </Select>
  );
};

export default ChangeLimitSelect;
