"use client";
import { IManufacture } from "@/lib/interfaces/IManufacture";
import { getQueryString } from "@/lib/utils/functions/getQueryString";
import { Chip } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";

type Props = {
  manufacture: IManufacture;
};

const ManufactureItem = ({ manufacture }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const idsParam = searchParams.get("manufactures");
    const idsArray = idsParam ? idsParam.split(",") : [];
    setIsActive(idsArray.includes(manufacture.id.toString()));
  }, [searchParams, manufacture.id]);

  const handleClick = () => {
    isActive ? removeFromParams() : insertInParams();
  };

  const insertInParams = () => {
    const idsParam = searchParams.get("manufactures");
    const idsArray = idsParam ? idsParam.split(",") : [];

    idsArray.push(manufacture.id);

    handleRoute(idsArray);
  };

  const removeFromParams = () => {
    const idsParam = searchParams.get("manufactures");
    const idsArray = idsParam ? idsParam.split(",") : [];

    idsArray.splice(idsArray.indexOf(manufacture.id.toString()), 1);

    handleRoute(idsArray);
  };

  const handleRoute = (idsArray: string[]) => {
    const newIdsParam = idsArray.join(",");
    const urlParamsStr = getQueryString(searchParams.toString(), {
      name: "manufactures",
      value: newIdsParam,
    });

    router.push(pathname + "?" + urlParamsStr);
  };

  const getClassName = () => {
    let baseClass =
      "break-words rounded-md flex flex-wrap justify-between items-center gap-2 text-balance border border-default-200 hover:border-secondary-400 hover:bg-secondary-400 hover:text-default-50 dark:hover:text-white p-2 h-min cursor-pointer";
    return isActive
      ? `${baseClass} bg-secondary-400 text-xs text-white`
      : `${baseClass} text-sm`;
  };

  return (
    <div className={getClassName()} onClick={handleClick}>
      {manufacture.name}{" "}
      {manufacture.product_count !== undefined && (
        <Chip size="sm" color="default" className="text-xs">
          {manufacture.product_count}
        </Chip>
      )}
      {isActive && (
        <span className="p-1 h-max bg-default-50 text-default-800 rounded-full cursor-pointer hover:bg-default-200">
          <FaX size={8} />
        </span>
      )}
    </div>
  );
};

export default ManufactureItem;
