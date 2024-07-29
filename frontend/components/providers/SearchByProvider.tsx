import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ProviderSelect from "./ProviderSelect";
import { IProvider } from "@/lib/interfaces/IProvider";
import { Divider } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getQueryString } from "@/lib/utils/functions/getQueryString";

type Props = {
  isDisabled?: boolean;
};

const SearchByProvider = (props: Props) => {
  const { data, isLoading, error } = useSWR(getApiUrl("/providers"), fetcher);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const provider = searchParams.get("provider");
  const [providers, setProviders] = useState<IProvider[]>([]);

  useEffect(() => {
    if (data) {
      setProviders(data);
    }
  }, [data]);

  const handleSelect = (value: string) => {
    router.push(
      pathname +
        "?" +
        getQueryString(searchParams.toString(), {
          name: "provider",
          value,
        })
    );
  };

  const isProviderInList = (providerId: number) => {
    return providers.some((provider) => provider.id === providerId);
  };

  return (
    <>
      <p className="text-sm font-medium text-left w-full mt-2">
        Mis Proveedores
      </p>
      <Divider />
      <ProviderSelect
        providers={providers}
        isDisabled={isLoading || props.isDisabled}
        handleSelect={handleSelect}
        errorMessage={error && "Error al cargar los proveedores"}
        selectedKey={isProviderInList(Number(provider)) ? provider : null}
      />
    </>
  );
};

export default SearchByProvider;
