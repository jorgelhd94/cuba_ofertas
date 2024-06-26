"use client";
import { IProduct } from "@/lib/interfaces/IProduct";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import useSWR from "swr";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import {
  convertToDayMonth,
  convertToReadableDate,
} from "@/lib/utils/functions/dates";

type Props = {
  product: IProduct;
};

const ProductPriceHistory = (props: Props) => {
  const { data, error, isLoading } = useSWR(
    getApiUrl("/products/" + props.product.id + "/price-history/"),
    fetcher
  );

  if (isLoading) {
    return <p className="text-default-800">Cargando historial de precios...</p>;
  }

  if (error) {
    return (
      <p className="text-danger text-xs">
        No se pudo cargar el historial de precios
      </p>
    );
  }

  const chartData = data
    ? data.map((entry: { date: string; price: number }) => ({
        date: new Date(entry.date),
        price: entry.price,
      }))
    : [];

  const options: AgChartOptions = {
    data: chartData,
    series: [
      {
        xKey: "date",
        yKey: "price",
        title: "Precio",
        tooltip: {
          renderer: (params) => {
            return {
              title: convertToDayMonth(params.datum.date),
              content: `${params.datum.price} ${props.product.currency}`,
            };
          },
        },
      },
    ],
    axes: [
      {
        type: "time",
        position: "bottom",
        title: {
          text: "Fecha",
        },
        label: {
          formatter: (params) => convertToDayMonth(new Date(params.value)),
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "Precio",
        },
        min: 0,
      },
    ],
  };

  return (
    <Card shadow="sm" className="px-2">
      <CardHeader>
        <p className="text-md font-medium">Historial de precios</p>
      </CardHeader>
      <CardBody>
        <div className="h-64">
          <AgChartsReact options={options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductPriceHistory;
