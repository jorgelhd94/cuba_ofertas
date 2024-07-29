"use client";
import { IProduct } from "@/lib/interfaces/IProduct";
import React, { useState } from "react";
import { ProductsSkeleton } from "../ProductsSkeleton/ProductsSkeleton";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/api/fetcher";
import { getApiUrl } from "@/lib/utils/api/api";
import { ErrorMsg } from "@/components/shared/messages/ErrorMsg/ErrorMsg";
import { ProductCard } from "../ProductCard/ProductCard";
import { PinProductContext } from "@/lib/context/PinProductContext";
import { EmptyMsg } from "@/components/shared/messages/empty-msg/empty-msg";

type Props = {
  product: IProduct;
};

const RelatedProducts = (props: Props) => {
  const { data, error, isLoading } = useSWR(
    getApiUrl(`/products/${props.product.id}/related`),
    fetcher
  );

  const [pinProduct, setPinProduct] = useState<IProduct | null>(props.product);

  return (
    <div className="w-full py-4 space-y-8 relative">
      <h1 className="text-2xl font-bold">Productos relacionados</h1>

      {isLoading && <ProductsSkeleton />}
      {error && <ErrorMsg message="No se encontraron productos relacionados" />}

      {data && (
        <PinProductContext.Provider value={{ pinProduct, setPinProduct }}>
          <div className="gap-4 flex flex-col sm:flex-row justify-evenly flex-wrap lg:columns-4">
            {data.map((product: IProduct) => (
              <ProductCard key={product.id} product={product} hideSetPin />
            ))}

            {data.length === 0 && (
              <EmptyMsg message="No hay productos relacionados" />
            )}
          </div>
        </PinProductContext.Provider>
      )}
    </div>
  );
};

export default RelatedProducts;
