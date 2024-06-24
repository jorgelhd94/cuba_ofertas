"use client";
import { Chip } from "@nextui-org/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {};

const RankingByPriceWeight = (props: Props) => {
  const [rankingByPrice, setRankingByPrice] = useState(0);
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <p className="text-xs font-bold">Ranking - precio/lb:</p>
      <Chip
        className="cursor-pointer hover:bg-secondary-400 pr-2"
        color="secondary"
        size="sm"
        endContent={<FaSearch />}
      >
        <span className="pr-1">
          {rankingByPrice} - {rankingByPrice}
        </span>
      </Chip>
    </div>
  );
};

export default RankingByPriceWeight;
