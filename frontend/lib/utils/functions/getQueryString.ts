export const getQueryString = (
  searchParams: string,
  param: { name: string; value: string | null } | null = null
) => {
  const paramsOrder = [
    "q",
    "page",
    "page_size",
    "offers",
    "discounts",
    "orderby",
    "mode",
    "price_by_weight",
    "provider",
    "manufactures",
    "category",
    "min_price",
    "max_price",
  ];

  const oldParams = new URLSearchParams(searchParams);
  const newParams = new URLSearchParams();

  if (!param) {
    return oldParams;
  }

  // Si el parámetro entrado es "q" y está vacío, eliminarlo
  if (param.name === "q" && (!param.value || param.value.trim() === "")) {
    oldParams.delete("q");
  }

  if (
    oldParams.get("page") &&
    (param.name === "q" || param.name === "mode" || param.name === "page_size")
  ) {
    oldParams.delete("page");
  }

  paramsOrder.forEach((paramType) => {
    if (param.name === paramType) {
      if (param.value) {
        newParams.set(paramType, param.value);
      }
    } else if (oldParams.has(paramType)) {
      newParams.set(paramType, oldParams.get(paramType) || "");
    }
  });

  const paramNumberValidationList = [
    "page",
    "page_size",
    "min_price",
    "max_price",
  ];

  paramNumberValidationList.forEach((paramType) => {
    if (newParams.get(paramType) !== null) {
      if (Number.isNaN(parseInt(newParams.get(paramType) || "0"))) {
        newParams.delete(paramType);
      }
    }
  });

  return newParams.toString();
};
