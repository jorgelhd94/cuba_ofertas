const getApiUrl = (endpoint?: string) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1";
  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  if (endpoint) {
    return `${url}${endpoint}`;
  }

  return url;
};

export { getApiUrl };
