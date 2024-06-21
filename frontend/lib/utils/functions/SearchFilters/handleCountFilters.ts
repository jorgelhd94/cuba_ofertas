const handleCountFilters = (searchParams: URLSearchParams) => {
  let newCount = 0;

  if (
    searchParams.get("orderby") &&
    searchParams.get("orderby") !== "default"
  ) {
    newCount += 1;
  }

  if (searchParams.get("mode") && searchParams.get("mode") !== "show_all") {
    newCount += 1;
  }

  if (searchParams.get("price_by_weight") && searchParams.get("price_by_weight") !== "show_all") {
    newCount += 1;
  }

  if (searchParams.get("provider")) {
    newCount += 1;
  }

  return newCount;
};

export default handleCountFilters;
