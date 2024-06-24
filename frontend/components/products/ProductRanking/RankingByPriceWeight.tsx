"use client";
import SimpleModal from "@/components/shared/modals/SimpleModal";
import { IProduct } from "@/lib/interfaces/IProduct";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import { Chip } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useSWR from "swr";
import ProductRankingCard from "../ProductRankingCard/ProductRankingCard";

type Props = {
  product: IProduct;
};

const RankingByPriceWeight = (props: Props) => {
  const { data, isLoading, error } = useSWR(
    `${getApiUrl()}/product-ranking/${props.product.id}?filter=price_by_weight`,
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
    return (
      <p className="text-red-500 text-xs">
        No se pudo cargar el ranking por libra
      </p>
    );
  }

  if (isLoading) {
    return (
      <p className="text-gray-500 text-xs">Cargando el ranking por libra...</p>
    );
  }

  return (
    <>
      <div className="flex gap-2 items-center flex-wrap">
        <p className="text-xs font-bold">Ranking * precio/lb:</p>
        <Chip
          onClick={() => setShowModal(true)}
          className="cursor-pointer hover:bg-secondary-400 pr-2"
          color="secondary"
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
        title="Ranking por precio/lb"
      >
        <div className="max-h-72 space-y-4 overflow-y-auto p-2 scrollbar-custom">
          {data.products.map((product: IProduct, index: number) => {
            const isHighlighted = product.id === props.product.id;
            return (
              <div
                key={product.id}
                ref={isHighlighted ? highlightedProductRef : null}
              >
                <ProductRankingCard
                  position={index + 1}
                  product={product}
                  highlight={product.id === props.product.id}
                />
              </div>
            );
          })}
        </div>
      </SimpleModal>
    </>
  );
};

export default RankingByPriceWeight;
