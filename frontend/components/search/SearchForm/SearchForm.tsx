"use client";
import { SubmitBtn } from "@/components/shared/buttons/SubmitBtn/SubmitBtn";
import { SearchIcon } from "@/components/shared/icons/SearchIcon";
import { getQueryString } from "@/lib/utils/functions/getQueryString";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";

type SearchFormProps = {
  loading: boolean;
};

export const SearchForm: React.FC<SearchFormProps> = (props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchText, setSearchText] = useState(searchParams.get("q") || "");
  const handleSearch = (formData: FormData) => {
    setSearchText(formData.get("searchText")?.toString() || "");
    router.push(
      pathname +
        "?" +
        getQueryString(searchParams.toString(), {
          name: "q",
          value: searchText.trim(),
        })
    );
  };

  return (
    <form
      action={handleSearch}
      className="w-full flex max-md:flex-col max-md:px-4 gap-4 items-center"
    >
      <Input
        name="searchText"
        variant="bordered"
        autoFocus
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
        isClearable
        onChange={(event) => setSearchText(event.target.value)}
        onClear={() => setSearchText("")}
        value={searchText}
      />

      <SubmitBtn loading={props.loading} />
    </form>
  );
};
