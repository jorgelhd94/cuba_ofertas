"use client";
import SimpleMsg from "@/components/shared/messages/SimpleMsg";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import { getQueryString } from "@/lib/utils/functions/getQueryString";
import { Input } from "@nextui-org/react";
import debounce from "lodash/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";

const PriceRangeFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isLoading, error } = useSWR(
    getApiUrl("/products/range_prices/"),
    fetcher
  );

  const [min, setMin] = useState(0.0);
  const [max, setMax] = useState(10000);

  useEffect(() => {
    if (data && data.max_price > 0) {
      if (!parseInt(searchParams.get("max_price") || "0")) {
        setMax(data.max_price);
      }
    }
  }, [data]);

  useEffect(() => {
    const minParam = parseInt(searchParams.get("min_price") || "0");
    const maxParam = parseInt(searchParams.get("max_price") || "0");

    if (minParam < data.max_price) {
      setMin(minParam);
    }

    if (maxParam > 0 && maxParam < data.max_price) {
      setMax(maxParam);
    } else {
      setMax(data.max_price);
    }
  }, [searchParams]);

  const debouncedHandle = useCallback(
    debounce((value: number, isMin: boolean) => {
      const urlParams =
        value === 0
          ? new URLSearchParams(searchParams.toString())
          : getQueryString(searchParams.toString(), {
              name: isMin ? "min_price" : "max_price",
              value: value.toString(),
            });

      if (value === 0) {
        (urlParams as URLSearchParams).delete(
          isMin ? "min_price" : "max_price"
        );
      }

      router.replace(pathname + "?" + urlParams.toString());
    }, 300),
    [pathname, searchParams, router]
  );
  const handleMin = (value: number) => {
    if (value <= data.max_price) {
      debouncedHandle(value, true);
    } else {
      setMin(0.0);
    }
  };

  const handleMax = (value: number) => {
    if (value <= data.max_price) {
      debouncedHandle(value, false);
    } else {
      setMax(data.max_price);
    }
  };

  if (isLoading) return <SimpleMsg message="Cargando..." />;

  if (error)
    return (
      <SimpleMsg message="Error al mostrar el rango de precios" type="error" />
    );

  return (
    <div className="w-full">
      <h4 className="text-medium font-medium text-left w-full mb-2">Precio</h4>

      <div className="flex gap-2">
        <Input
          type="number"
          variant="underlined"
          description="mínimo"
          value={min.toString()}
          onChange={(event) => {
            setMin(Number(event.target.value));
          }}
          min={0.0}
          max={max}
          step={1}
          startContent={"$"}
          lang="en"
          onBlur={(event) => {
            handleMin(Number((event.target as HTMLInputElement).value));
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleMin(Number((event.target as HTMLInputElement).value));
            }
          }}
        />

        <Input
          startContent={"$"}
          type="number"
          variant="underlined"
          description="máximo"
          value={max.toString()}
          onChange={(event) => {
            setMax(Number(event.target.value));
          }}
          min={0.0}
          max={max}
          step={1}
          lang="en"
          onBlur={(event) => {
            handleMax(Number((event.target as HTMLInputElement).value));
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleMax(Number((event.target as HTMLInputElement).value));
            }
          }}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
