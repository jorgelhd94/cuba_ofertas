"use client";
import { ICategory } from "@/lib/interfaces/ICategory";
import { Chip } from "@nextui-org/react";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

type Props = {
  category: ICategory;
  children?: React.ReactNode;
  quantity?: number;
  level?: number;
  isActive?: boolean;
  handleClick?: () => void;
};

const CategoryItem = (props: Props) => {
  const [isChildrenOpen, setIsChildrenOpen] = useState(false);

  return (
    <div className="space-y-1">
      <div
        className={`text-sm flex justify-between items-center p-1 pl-${
          props.level ? props.level * 2 : 0
        }`}
      >
        <div
          className={`w-3/4 flex items-center gap-1 cursor-pointer ${
            props.isActive ? "text-primary" : "text-primary-800"
          } hover:text-primary-600`}
          onClick={props.handleClick}
        >
          {props.category.name}
        </div>

        <div className="flex items-center gap-2">
          <Chip
            size="sm"
            className="text-xs"
            variant={props.isActive ? "solid" : "flat"}
            color="primary"
          >
            {props.category.products_count}
          </Chip>

          {props.category.children && props.category.children.length > 0 && (
            <div
              className="p-1 cursor-pointer border-1 border-primary rounded-lg text-primary hover:text-white hover:bg-primary transition-all"
              onClick={() => setIsChildrenOpen(!isChildrenOpen)}
            >
              {!isChildrenOpen ? <FaPlus size={12} /> : <FaMinus size={12} />}
            </div>
          )}
        </div>
      </div>

      {isChildrenOpen && props.children}
    </div>
  );
};

export default CategoryItem;
