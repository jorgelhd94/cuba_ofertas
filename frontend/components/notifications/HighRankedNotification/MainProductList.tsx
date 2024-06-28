"use client";
import { ProductCard } from "@/components/products/ProductCard/ProductCard";
import { ErrorMsg } from "@/components/shared/messages/ErrorMsg/ErrorMsg";
import NotificationsSkeleton from "@/components/shared/skeletons/NotificationsSkeleton";
import INotification from "@/lib/interfaces/INotification";
import { IProduct } from "@/lib/interfaces/IProduct";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import useSWR from "swr";
import ProductNotificationCard from "./ProductNotificationCard";

type Props = {
  notification: INotification;
};

interface HighRankedNotification {
  id: number;
  main_product: IProduct;
  higher_ranked_products: IProduct[];
}

const MainProductList = (props: Props) => {
  const { data, error, isLoading } = useSWR(
    getApiUrl("/higher-ranked-notification/" + props.notification.id),
    fetcher
  );

  if (isLoading) {
    return <NotificationsSkeleton />;
  }

  if (error) {
    return <ErrorMsg message="Error al cargar los productos afectados" />;
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Productos afectados</h1>
      <div className="gap-4 flex flex-col md:grid md:grid-cols-2">
        {data.map((item: HighRankedNotification, index: number) => (
          <ProductNotificationCard
            key={item.id}
            product={item.main_product}
            higherProducts={item.higher_ranked_products}
          />
        ))}
      </div>
    </>
  );
};

export default MainProductList;
