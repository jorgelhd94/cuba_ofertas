"use client";
import SimpleModal from "@/components/shared/modals/SimpleModal";
import { IProduct } from "@/lib/interfaces/IProduct";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import { Chip } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useSWR from "swr";
import { ProductInfoCard } from "../ProductInfoCard/ProductInfoCard";

type Props = {
  product: IProduct;
};

const RankingByPrice = (props: Props) => {
  const { data, isLoading, error } = useSWR(
    `${getApiUrl()}/product-ranking/${props.product.id}`,
    fetcher
  );
  const [showModal, setShowModal] = useState(false);
  const highlightedProductRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showModal && highlightedProductRef.current) {
      highlightedProductRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showModal]);

  if (error) {
    return <p className="text-red-500 text-xs">No se pudo cargar el ranking</p>;
  }

  if (isLoading) {
    return <p className="text-gray-500 text-xs">Cargando el ranking...</p>;
  }

  return (
    <>
      <div className="flex gap-2 items-center flex-wrap">
        <p className="text-xs font-bold">Ranking * precio:</p>
        <Chip
          onClick={() => setShowModal(true)}
          className="cursor-pointer hover:bg-primary-400 pr-2"
          color="primary"
          size="sm"
          endContent={<FaSearch />}
        >
          <span className="pr-1">
            {data.rank} / {data.products.length}
          </span>
        </Chip>
      </div>

      <SimpleModal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Ranking por precio"
      >
        <div className="max-h-96 space-y-4 overflow-y-auto p-2 scrollbar-custom">
          {data.products.map((product: IProduct, index: number) => {
            const isHighlighted = product.id === props.product.id;
            return (
              <div
                key={product.id}
                ref={isHighlighted ? highlightedProductRef : null}
                className={product.id === props.product.id ? "sticky top-0 z-30 bottom-0" : ""}
              >
                <ProductInfoCard
                  position={index + 1}
                  product={product}
                  highlight={product.id === props.product.id}
                  compareToProduct={props.product}
                  hidePriceByWeightPercent
                />
              </div>
            );
          })}
        </div>
      </SimpleModal>
    </>
  );
};

export default RankingByPrice;
