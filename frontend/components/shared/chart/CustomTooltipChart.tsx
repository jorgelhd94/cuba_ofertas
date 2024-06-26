import { TooltipProps } from "recharts";
import {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type Props = {
  maxPrice: number;
  minPrice: number;
  external: TooltipProps<ValueType, NameType>;
  currency: string;
};

const CustomTooltipChart = ({
  maxPrice,
  minPrice,
  external,
  currency,
}: Props) => {
  const getPriceMsg = (price: number) => {
    if (price === maxPrice) {
      return "Peor precio";
    }

    if (price === minPrice) {
      return "Mejor precio";
    }
  };

  const isMaxPrice = (price: number) => {
    return price === maxPrice;
  };

  const isMinPrice = (price: number) => {
    return price === minPrice;
  };

  if (external.active && external.payload && external.payload.length) {
    const checkPrice =
      isMaxPrice(external.payload[0].value as number) ||
      isMinPrice(external.payload[0].value as number);

    const tootlipBg = () => {
      if (!external.payload) {
        return "";
      }

      if (maxPrice === minPrice || !checkPrice) {
        return "bg-primary";
      }

      if (isMaxPrice(external.payload[0].value as number)) {
        return "bg-danger";
      }

      if (isMinPrice(external.payload[0].value as number)) {
        return "bg-success";
      }
    };

    return (
      <div className={`${tootlipBg()} p-2 px-3 rounded-md text-white`}>
        {checkPrice && maxPrice !== minPrice && (
          <p className="text-xs">
            {getPriceMsg(external.payload[0].value as number)}
          </p>
        )}

        <p>{external.label}</p>
        <p>
          {external.payload[0].value} {currency}
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltipChart;
