import { IProduct } from "@/lib/interfaces/IProduct";
import { Chip } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

type Props = {
  product: IProduct;
};

const ProductCategories: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex flex-col gap-1 ">
      <b>Categorias: </b>
      <div>
        {product.categories.map((category) => (
          <Chip
            as={Link}
            href={`/search?category=${category.id}`}
            size="sm"
            color="secondary"
            key={category.id}
            className="cursor-pointer hover:bg-secondary-400 "
          >
            {category.name}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
