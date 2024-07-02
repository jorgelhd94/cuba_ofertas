"use client";
import { SearchBtn } from "@/components/shared/buttons/SubmitBtn/SearchBtn";
import { getQueryString } from "@/lib/utils/functions/getQueryString";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type SearchFormProps = {
  loading: boolean;
  hideSaveSearch?: boolean;
  handleSearchText?: Function;
  standalone?: boolean;
  path?: string;
};

export const SearchForm: React.FC<SearchFormProps> = (props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchText, setSearchText] = useState(searchParams.get("q") || "");

  const handleSearch = (formData: FormData) => {
    const inputText = formData.get("searchText")?.toString() || "";

    setSearchText(inputText);
    changeRoute(inputText, props.path);
  };

  const changeRoute = (searchText: string, path?: string) => {
    let queryString = getQueryString(searchParams.toString(), {
      name: "q",
      value: searchText.trim(),
    });
    console.log(path);
    if (path) {
      router.push(path + "?" + queryString);
    } else {
      router.push(pathname + "?" + queryString);
    }
  };

  useEffect(() => {
    setSearchText(searchParams.get("q") || "");
  }, [searchParams.toString()]);

  return (
    <>
      <form action={handleSearch} className="w-full flex gap-4 items-center">
        <Input
          size="sm"
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
          placeholder="Buscar producto..."
          isClearable
          onChange={(event) => setSearchText(event.target.value)}
          onClear={() => setSearchText("")}
          value={searchText}
        />
        <SearchBtn loading={props.loading} />
      </form>

      {/* <div className="flex gap-2 items-center">
        {!props.hideSaveSearch && <SaveBtn />}
      </div> */}
    </>
  );
};
