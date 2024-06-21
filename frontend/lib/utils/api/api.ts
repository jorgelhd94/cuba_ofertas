const getApiUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  return url + "/api/v1";
};

export { getApiUrl };
