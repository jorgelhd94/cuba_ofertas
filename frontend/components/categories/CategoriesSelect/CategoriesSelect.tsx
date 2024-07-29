"use client";
import SimpleMsg from "@/components/shared/messages/SimpleMsg";
import { ICategory } from "@/lib/interfaces/ICategory";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import { getQueryString } from "@/lib/utils/functions/getQueryString";
import { Divider } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import CategoryActiveChip from "../CategoryActiveChip";
import CategoryItem from "../CategoryItem";

type Props = {};

const CategoriesSelect = (props: Props) => {
  const searchParams = useSearchParams();

  const getParams = () => {
    const urlParams = new URLSearchParams(searchParams.toString());

    urlParams.delete("category");
    urlParams.delete("page");
    urlParams.delete("page_size");

    if (urlParams.toString()) return "?" + urlParams.toString();

    return "";
  };

  const { data, isLoading, error } = useSWR(
    getApiUrl("/categories-menu/" + getParams()),
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
        <SimpleMsg message="Error al cargar las categorías" type="error" />
      )}

      {!error && data && data.length > 0 && (
        <div className="w-full flex flex-col gap-3 px-1">
          {data.map((category: ICategory) => renderCategories(category))}
        </div>
      )}

      {!error && data && data.length === 0 && (
        <SimpleMsg message="No hay categorías para esta búsqueda" />
      )}
    </>
  );
};

export default CategoriesSelect;
