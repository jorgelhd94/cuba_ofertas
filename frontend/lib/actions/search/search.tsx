"use server";

export async function searchAllProducts(prevState: any, formData: FormData) {
  try {
    const searchText = formData.get("searchText");

    const data = await fetch(process.env.NEXT_PUBLIC_API_URL! + "/search").then(
      (response) => {
        return response.json();
      }
    );

    return {
      data,
    };
  } catch (error) {
    return {
      message: "Error de comunicación con el servidor",
    };
  }
}
