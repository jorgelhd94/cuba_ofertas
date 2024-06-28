import { ProductInfoCard } from "@/components/products/ProductInfoCard/ProductInfoCard";
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
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="auto"
      isDismissable={false}
      className="mx-2"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Productos con mejor precio - {mainProduct?.current_price}{" "}
              {mainProduct?.currency}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-2 max-h-96 overflow-y-auto pb-2">
                {sortedProducts().map((product, index) => (
                  <ProductInfoCard
                    key={product.product_id + "-" + index}
                    product={product}
                    mainProduct={mainProduct}
                  />
                ))}
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="bordered" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default HighRankedProductsModal;
