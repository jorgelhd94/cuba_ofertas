"use client";
import CustomTooltipChart from "@/components/shared/chart/CustomTooltipChart";
import { IProduct } from "@/lib/interfaces/IProduct";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import { convertToDayMonth } from "@/lib/utils/functions/dates";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useSWR from "swr";

type Props = {
  product: IProduct;
};

const ProductPriceHistory = (props: Props) => {
  const { data, error, isLoading } = useSWR(
    getApiUrl("/products/" + props.product.id + "/price-history/"),
    fetcher
  );

  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState<string | null>(null);

  const [minPrice, setMinPrice] = useState<number>(Infinity);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [minPriceIndex, setMinPriceIndex] = useState<number | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setCurrentPrice(data[data.length - 1].price ?? null);
      setCurrentDate(
        convertToDayMonth(new Date(data[data.length - 1].date) ?? null)
      );

      const prices = data.map(
        (entry: { date: string; price: number }) => entry.price
      ) as number[];

      const minPriceValue = Math.min(...prices);
      const maxPriceValue = Math.max(...prices);

      setMaxPrice(maxPriceValue);
      setMinPriceIndex(prices.lastIndexOf(minPriceValue));
      setMinPrice(minPriceValue);
    }
  }, [data]);

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
        date: convertToDayMonth(new Date(entry.date)),
        price: entry.price,
      }))
    : [];

  const handleMouseMove = (e: any) => {
    if (e && e.activePayload && e.activePayload.length > 0) {
      const price = e.activePayload[0].payload.price;
      setCurrentPrice(price);
      setCurrentDate(e.activeLabel);
    }
  };

  return (
    <Card shadow="sm" className="px-2">
      <CardHeader className="flex flex-col items-start gap-2">
        <p className="text-md font-medium">Historial de precios</p>

        {currentPrice !== null && currentDate !== null && (
          <div className="flex flex-nowrap gap-3 items-center">
            <div>
              <p className="text-xs">Fecha</p>
              <p className="text-sm font-medium">{currentDate}</p>
            </div>

            <Divider orientation="vertical" className="h-8" />

            <div>
              <p className="text-xs">Precio</p>
              <p className="text-sm font-medium">
                {currentPrice} {props.product.currency}
              </p>
            </div>
          </div>
        )}
      </CardHeader>
      <CardBody>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                setCurrentPrice(chartData[chartData.length - 1].price);
                setCurrentDate(chartData[chartData.length - 1].date);
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis
                dataKey={"price"}
                tickFormatter={(tick) => `$ ${parseFloat(tick).toFixed(2)}`}
                fontSize={12}
              />
              <Tooltip
                content={(external) => (
                  <CustomTooltipChart
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    currency={props.product.currency}
                    external={external}
                  />
                )}
              />

              {minPriceIndex !== null && (
                <ReferenceLine
                  x={chartData[minPriceIndex].date}
                  stroke="green"
                  strokeDasharray="3 3"
                />
              )}

              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductPriceHistory;
