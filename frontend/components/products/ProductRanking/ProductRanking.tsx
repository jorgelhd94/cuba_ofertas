import { IProduct } from "@/lib/interfaces/IProduct";
import { Chip, Divider } from "@nextui-org/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import RankingByPrice from "./RankingByPrice";
import RankingByPriceWeight from "./RankingByPriceWeight";

type Props = {
  product: IProduct;
};

const ProductRanking = (props: Props) => {
  const [showRanking, setShowRanking] = useState(false);

  const handleShowRanking = () => {
    setShowRanking(!showRanking);
  };

  const getRankingComponents = () => {
    return (
      <>
        <RankingByPrice product={props.product} />
        {props.product.price_by_weight && (
          <RankingByPriceWeight product={props.product} />
        )}
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-2 max-md:hidden">
        <Divider />
        {getRankingComponents()}
      </div>

      <div className="flex flex-col gap-2 md:hidden">
        <Divider />
        <Chip
          size="sm"
          onClick={handleShowRanking}
          color={showRanking ? "danger" : "primary"}
          startContent={!showRanking ? <FaEye /> : <FaEyeSlash />}
          className="space-x-1"
        >
          Ranking
        </Chip>

        {showRanking && getRankingComponents()}
      </div>
    </>
  );
};

export default ProductRanking;
