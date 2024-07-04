const handleCountFilters = (searchParams: URLSearchParams) => {
  const conditions = [
    { param: "orderby", exclude: "default" },
    { param: "mode", exclude: "show_all" },
    { param: "price_by_weight", exclude: "show_all" },
    { param: "provider" },
    { param: "category" },
    { param: "manufactures" },
  ];

  return conditions.reduce((count, { param, exclude }) => {
    const value = searchParams.get(param);
    if (value && (!exclude || value !== exclude)) {
      return count + 1;
    }
    return count;
  }, 0);
};

export default handleCountFilters;
