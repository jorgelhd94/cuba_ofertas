import { Chip } from "@nextui-org/react";
import { UpIcon } from "../icons/UpIcon";
import { DownIcon } from "../icons/DownIcon";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

type Props = {
  price: number | null | undefined;
  compareToPrice: number | null | undefined;
  showArrow?: boolean;
};

const PercentDifferenceShip = (props: Props) => {
  const getPricePercentDifference = (
    price: number,
    compareToPrice: number
  ) => {
    if (price > compareToPrice) {
      const percent = 100 - (compareToPrice / price) * 100;
      return (
        <Chip
          startContent={props.showArrow && <FaArrowDown />}
          color="success"
          size="sm"
        >
          {percent.toFixed(2)}%
        </Chip>
      );
    } else if (price < compareToPrice) {
      const percent = 100 - (price / compareToPrice) * 100;

      return (
        <Chip
          startContent={props.showArrow && <FaArrowUp />}
          color="danger"
          size="sm"
        >
          {percent.toFixed(2)} %
        </Chip>
      );
    }
  };

  if (!props.price || !props.compareToPrice) {
    return;
  }

  return getPricePercentDifference(props.price, props.compareToPrice);
};

export default PercentDifferenceShip;
