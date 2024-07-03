"use client";
import { ICategory } from "@/lib/interfaces/ICategory";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import { Divider, Skeleton } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import CategoryItem from "../CategoryItem";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getQueryString } from "@/lib/utils/functions/getQueryString";
import CategoryActiveChip from "../CategoryActiveChip";

type Props = {};

const CategoriesSelect = (props: Props) => {
  const searchParams = useSearchParams();

  const getParams = () => {
    const urlParams = new URLSearchParams();

    if (searchParams.get("provider")) {
      urlParams.set("provider", searchParams.get("provider") as string);
    }

    if (urlParams.toString()) return "?" + urlParams.toString();

    return "";
  };

  const { data, isLoading, error } = useSWR(
    getApiUrl("/categories/" + getParams()),
    fetcher
  );

  const router = useRouter();
  const pathname = usePathname();

  const [activeCategoryId, setActiveCategoryId] = useState(
    searchParams.get("category") || ""
  );

  useEffect(() => {
    if (activeCategoryId !== searchParams.get("category")) {
      setActiveCategoryId(searchParams.get("category") || "");
    }
  }, [searchParams]);

  const handleCategoryClick = (categoryId: number) => {
    const params = getQueryString(searchParams.toString(), {
      name: "category",
      value: categoryId.toString(),
    });

    router.push(pathname + "?" + params);
  };

  const renderCategories = (category: ICategory, level: number = 0) => {
    if (category.products_count === 0) {
      return null;
    }

    if (category.children && category.children.length === 0) {
      return (
        <CategoryItem
          category={category}
          level={level}
          handleClick={() => handleCategoryClick(category.id)}
          isActive={activeCategoryId === category.id.toString()}
          key={category.id}
        />
      );
    }

    return (
      <CategoryItem
        key={category.id}
        category={category}
        level={level}
        handleClick={() => handleCategoryClick(category.id)}
        isActive={activeCategoryId === category.id.toString()}
      >
        {category.children &&
          category.children.map((child: ICategory) =>
            renderCategories(child, level + 1)
          )}
      </CategoryItem>
    );
  };

  return (
    <>
      <h4 className="text-sm font-medium text-left w-full mt-2">Categorías</h4>
      <Divider />

      {activeCategoryId && (
        <div className="w-full">
          <CategoryActiveChip categoryId={activeCategoryId} />
        </div>
      )}

      {isLoading && (
        <p className="text-xs text-default">Cargando categorías...</p>
      )}

      {error && (
        <p className="text-danger text-sm">Error al cargar las categorías</p>
      )}

      {data && data.length > 0 && (
        <div className="w-full flex flex-col gap-3 px-1">
          {data.map((category: ICategory) => renderCategories(category))}
        </div>
      )}
    </>
  );
};

export default CategoriesSelect;
