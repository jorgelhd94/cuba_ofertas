"use client";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import React from "react";
import useSWR from "swr";
import { ProductsSkeleton } from "../products/ProductsSkeleton/ProductsSkeleton";
import { ErrorMsg } from "../shared/messages/ErrorMsg/ErrorMsg";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { ProductCard } from "../products/ProductCard/ProductCard";
import Link from "next/link";
import { EmptyMsg } from "../shared/messages/empty-msg/empty-msg";

type Props = {};

const WeekOffers = (props: Props) => {
  const { data, isLoading, error } = useSWR(
    getApiUrl("/products/week_offers/"),
    fetcher
  );

  return (
    <Card isBlurred>
      <CardHeader className="flex justify-between w-full">
        <h1 className="text-2xl">Ofertas de la semana</h1>
        <Button
          variant="ghost"
          as={Link}
          href="/search?offers=7"
          color="primary"
        >
          Ver todas
        </Button>
      </CardHeader>
      <Divider />

      <CardBody>
        {error && <ErrorMsg message="Error al cargar las ofertas de hoy" />}

        <div className="gap-4 flex flex-col sm:flex-row justify-evenly flex-wrap lg:columns-4 p-4">
          {isLoading && <ProductsSkeleton />}

          {data &&
            data.map((product: any) => (
              <ProductCard key={product.id} product={product} hideSetPin />
            ))}

          {data && data.length === 0 && (
            <EmptyMsg message="No hay ofertas de la semana" />
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default WeekOffers;
