const getCleanUrlFilters = (searchParams: URLSearchParams) => {
  const paramsToDelete = [
    "offers",
    "discounts",
    "orderby",
    "mode",
    "price_by_weight",
    "provider",
    "category",
    "manufactures",
  ];
  const newParams = new URLSearchParams(searchParams.toString());

  paramsToDelete.forEach((param) => newParams.delete(param));

  return newParams.toString();
};

export default getCleanUrlFilters;
