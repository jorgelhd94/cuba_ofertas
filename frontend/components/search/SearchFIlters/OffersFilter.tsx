"use client";
import { getQueryString } from "@/lib/utils/functions/getQueryString";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

const OffersFilter = (props: Props) => {
  const offers = [
    { name: "Hoy", value: 0 },
    { name: "3 días", value: 3 },
    { name: "7 días", value: 7 },
    { name: "30 días", value: 30 },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleRoute = (value: string) => {
    let urlParamsStr: string | URLSearchParams = searchParams.toString();

    if (searchParams.get("offers") === value) {
      const urlParams = new URLSearchParams(urlParamsStr);
      urlParams.delete("offers");

      urlParamsStr = urlParams.toString();
    } else {
      urlParamsStr = getQueryString(searchParams.toString(), {
        name: "offers",
        value,
      });
    }

    router.push(pathname + "?" + urlParamsStr);
  };

  return (
    <div>
      <h4 className="text-medium font-medium text-left w-full mb-2">
        Sólo ofertas
      </h4>

      <div className="flex flex-wrap gap-2 justify-center">
        {offers.map((offer) => (
          <Button
            variant={
              offer.value.toString() === searchParams.get("offers")
                ? "solid"
                : "ghost"
            }
            color={
              offer.value.toString() === searchParams.get("offers")
                ? "primary"
                : "default"
            }
            size="sm"
            onClick={() => handleRoute(offer.value.toString())}
          >
            {offer.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default OffersFilter;
