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
  isPriceByWeight?: boolean;
};

const RankingByPrice = (props: Props) => {
  const { data, isLoading, error } = useSWR(
    `${getApiUrl()}/product-ranking/${props.product.id}${
      props.isPriceByWeight ? "?filter=price_by_weight" : ""
    }`,
    fetcher
  );
  const [showModal, setShowModal] = useState(false);
  const highlightedProductRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (showModal && highlightedProductRef.current) {
      highlightedProductRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      const observer = new IntersectionObserver(
        () => {
          setIsSticky(true);
          observer.disconnect();
        },
        { threshold: 1 }
      );

      observer.observe(highlightedProductRef.current);

      return () => {
        if (highlightedProductRef.current) {
          observer.unobserve(highlightedProductRef.current);
        }
      };
    } else {
      setIsSticky(false);
    }
  }, [showModal]);

  if (error) {
    if (props.isPriceByWeight) {
      return (
        <p className="text-red-500 text-xs">
          No se pudo cargar el ranking por libra
        </p>
      );
    }
    return <p className="text-red-500 text-xs">No se pudo cargar el ranking</p>;
  }

  if (isLoading) {
    if (props.isPriceByWeight) {
      return (
        <p className="text-gray-500 text-xs">
          Cargando el ranking por libra...
        </p>
      );
    }
    return <p className="text-gray-500 text-xs">Cargando el ranking...</p>;
  }

  return (
    <>
      <div className="flex gap-2 items-center flex-wrap">
        <p className="text-xs font-bold">
          Ranking * {props.isPriceByWeight ? "precio/lb" : "precio"}:
        </p>
        <Chip
          onClick={() => setShowModal(true)}
          className="cursor-pointer hover:bg-primary-400 pr-2"
          color={props.isPriceByWeight ? "secondary" : "primary"}
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
        title={`Ranking por ${props.isPriceByWeight ? "precio/lb" : "precio"}`}
      >
        <div className="max-h-96 space-y-4 overflow-y-auto p-2 scrollbar-custom">
          {data.products.map((product: IProduct, index: number) => {
            const isHighlighted = product.id === props.product.id;
            return (
              <div
                key={product.id}
                ref={isHighlighted ? highlightedProductRef : null}
                className={
                  isHighlighted && isSticky ? "sticky top-0 z-40 bottom-0" : ""
                }
              >
                <ProductInfoCard
                  position={index + 1}
                  product={product}
                  highlight={isHighlighted}
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
