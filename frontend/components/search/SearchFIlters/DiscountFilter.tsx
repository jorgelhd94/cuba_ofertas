import { getQueryString } from "@/lib/utils/functions/getQueryString";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

const DiscountFilter = (props: Props) => {
  const discounts = [
    { name: "10%", value: 10 },
    { name: "20%", value: 20 },
    { name: "30%", value: 30 },
    { name: "40%", value: 40 },
    { name: "50%", value: 50 },
    { name: "60%", value: 60 },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleRoute = (value: string) => {
    let urlParamsStr: string | URLSearchParams = searchParams.toString();

    if (searchParams.get("discounts") === value) {
      const urlParams = new URLSearchParams(urlParamsStr);
      urlParams.delete("discounts");

      urlParamsStr = urlParams.toString();
    } else {
      urlParamsStr = getQueryString(searchParams.toString(), {
        name: "discounts",
        value,
      });
    }

    router.push(pathname + "?" + urlParamsStr);
  };

  return (
    <div>
      <h4 className="text-medium font-medium text-left w-full mb-2">
        Descuentos desde
      </h4>

      <div className="flex flex-wrap gap-2 justify-center">
        {discounts.map((discount) => (
          <Button
            variant={
              discount.value.toString() === searchParams.get("discounts")
                ? "solid"
                : "ghost"
            }
            color={
              discount.value.toString() === searchParams.get("discounts")
                ? "secondary"
                : "default"
            }
            size="sm"
            onClick={() => handleRoute(discount.value.toString())}
          >
            {discount.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DiscountFilter;
