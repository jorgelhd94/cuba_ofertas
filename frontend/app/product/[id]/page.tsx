import OnSaleChip from "@/components/products/OnSaleChip/OnSaleChip";
import PriceFixedCard from "@/components/products/PriceFixedCard/PriceFixedCard";
import ProductCategories from "@/components/products/ProductDetails/ProductCategories";
import ProductDetailsPrice from "@/components/products/ProductDetails/ProductDetailsPrice";
import ProductPriceHistoryChart from "@/components/products/ProductPriceHistory/ProductPriceHistoryChart";
import ProductRanking from "@/components/products/ProductRanking/ProductRanking";
import { ProductsSkeleton } from "@/components/products/ProductsSkeleton/ProductsSkeleton";
import RelatedProducts from "@/components/products/RelatedProducts/RelatedProducts";
import { IProduct } from "@/lib/interfaces/IProduct";
import { getApiUrl } from "@/lib/utils/api/api";
import { convertToReadableDate } from "@/lib/utils/functions/dates";
import { Button, Chip, Image } from "@nextui-org/react";
import Link from "next/link";
import { FaShare } from "react-icons/fa6";

async function getData(productId: string) {
  const res = await fetch(getApiUrl("/products/" + productId));

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const dynamic = "force-dynamic";

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const product = (await getData(params.id)) as IProduct;

  if (product.image_url.includes("thumbs") && product.shop.slug === "sm23") {
    product.image_url = product.image_url.replace("thumbs", "middle");
  }

  return (
    <section className=" body-font overflow-hidden">
      <PriceFixedCard product={product} />
      <div className="container px-5 mx-auto">
        <div className="w-[4/5] max-w-screen-xl mx-auto flex flex-wrap">
          <div className="md:w-1/2 w-full md:h-auto object-cover object-center rounded relative">
            <Image
              radius="lg"
              alt={product.name}
              src={product.image_url}
              className="object-cover object-center rounded"
            />

            <div className="absolute top-2 left-2 z-30">
              <OnSaleChip product={product} showOfferDays />
            </div>
          </div>

          <div className="md:w-1/2 w-full md:pl-10 md:py-6 mt-6 md:mt-0 space-y-4">
            <h1 className="text-lg md:text-2xl title-font font-medium mb-1">
              {product.name}
            </h1>

            <div className="flex flex-col gap-2">
              <ProductDetailsPrice product={product} />
              {product.price_by_weight !== null && (
                <p className="text-xl">
                  {product.price_by_weight} {product.currency_by_weight}
                </p>
              )}
            </div>

            <div className="flex gap-2 flex-col">
              <ProductRanking product={product} />
            </div>

            <div className="pt-2 space-y-1">
              <p>
                <b>Marca: </b> {product.manufacture?.name}
              </p>

              {product.provider && (
                <p>
                  <b>Proveedor: </b> {product.provider?.name}
                </p>
              )}
            </div>

            {product.categories.length && (
              <ProductCategories product={product} />
            )}

            <div className="pt-2 space-y-1">
              <p className="text-sm">
                <b>Última actualización: </b>
                {convertToReadableDate(product.updated_at)}
              </p>

              <p
                className={
                  "text-xs " +
                  (product.days_since_last_update > 0
                    ? "text-danger"
                    : "text-primary")
                }
              >
                {!product.days_since_last_update
                  ? "El producto está actualizado"
                  : `El producto fue actualizado hace ${product.days_since_last_update} días`}
              </p>
            </div>

            <Button
              as={Link}
              href={product.product_url}
              target="_blank"
              color="danger"
              startContent={<FaShare />}
              size="sm"
            >
              Ver en {product.shop.name}
            </Button>
          </div>

          <div className="w-full my-8">
            <ProductPriceHistoryChart product={product} />
          </div>

          <RelatedProducts product={product} />
        </div>
      </div>
    </section>
  );
}
