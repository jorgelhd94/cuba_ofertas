"use server";

export async function searchAllProducts(prevState: any, formData: FormData) {
  try {
    const searchText = formData.get("searchText");

    const params = {
      searchParam: searchText ? "search_text=" + searchText : "",
    };

    const data = await fetch(
      process.env.NEXT_PUBLIC_API_URL! + "api/v1/search?" + params.searchParam
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        throw error;
      });

    return {
      data,
    };
  } catch (error) {
    return {
      message: "Error de comunicación con el servidor " + process.env.NEXT_PUBLIC_API_URL,
    };
  }
}
