import { ProductInfoCard } from "@/components/products/ProductInfoCard/ProductInfoCard";
import SimpleModal from "@/components/shared/modals/SimpleModal";
import { IProduct } from "@/lib/interfaces/IProduct";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

type Props = {
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  mainProduct: IProduct | null;
  products: IProduct[] | null;
};

const HighRankedProductsModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  mainProduct,
  products,
}) => {
  // Order products by current price
  const sortedProducts = () => {
    if (!products) {
      return [];
    }
    return products?.sort((a, b) => {
      return a.current_price - b.current_price;
    });
  };

  return (
    <SimpleModal
      showModal={isOpen}
      setShowModal={(showModal) =>
        onOpenChange ? onOpenChange(showModal) : null
      }
      title={`Productos con mejor precio: ${mainProduct?.current_price} 
    ${mainProduct?.currency}`}
    >
      <div className="max-h-96 space-y-4 overflow-y-auto p-2 scrollbar-custom">
        {sortedProducts().map((product, index) => (
          <ProductInfoCard
            key={product.product_id + "-" + index}
            product={product}
            compareToProduct={mainProduct}
          />
        ))}
      </div>
    </SimpleModal>
  );
};

export default HighRankedProductsModal;
