const getCleanUrlFilters = (searchParams: URLSearchParams) => {
  const paramsToDelete = [
    "orderby",
    "mode",
    "price_by_weight",
    "provider",
    "category",
  ];
  const newParams = new URLSearchParams(searchParams.toString());

  paramsToDelete.forEach((param) => newParams.delete(param));

  return newParams.toString();
};

export default getCleanUrlFilters;
