const getCleanUrlFilters = (searchParams: URLSearchParams) => {
  const newParams = new URLSearchParams(searchParams.toString());
  newParams.delete("orderby");
  newParams.delete("mode");
  newParams.delete("price_by_weight");
  newParams.delete("provider");

  return newParams.toString();
};

export default getCleanUrlFilters;
