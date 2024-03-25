import { IProduct } from "@/lib/interfaces/IProduct";

export const filterProducts = (
  products: IProduct[] | undefined,
  productMode: string
) => {
  if (!products) {
    return [];
  }

  if (productMode === "0") {
    return filterProductsByCombo(products);
  } else if (productMode === "1") {
    return filterSingleProducts(products);
  }

  return products || [];
};

export function filterProductsByCombo(products: IProduct[]) {
  const regex = /\(.*\)/;

  const filter = products.filter((value) => {
    const match = regex.exec(value.name);

    if (match?.length && match[0].includes("x")) return value;

    return false;
  });

  return filter || [];
}

export function filterSingleProducts(products: IProduct[]) {
  const regex = /\(.*\)/;

  const filter = products.filter((value) => {
    const match = regex.exec(value.name);

    if (!match?.length || !match[0].includes("x")) {
      return value;
    }

    return false;
  });

  return filter || [];
}
