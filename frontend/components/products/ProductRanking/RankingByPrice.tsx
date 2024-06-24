"use client";
import { Chip } from "@nextui-org/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {};

const RankingByPrice = (props: Props) => {
  const [rankingByPrice, setRankingByPrice] = useState(0);
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <p className="text-xs font-bold">Ranking - precio:</p>
      <Chip
        className="cursor-pointer hover:bg-primary-400 pr-2"
        color="primary"
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

export default RankingByPrice;
