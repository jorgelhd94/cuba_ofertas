import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const data = await fetch(
      process.env.NEXT_PUBLIC_API_URL! +
        "api/v1/search/?" +
        request.nextUrl.searchParams
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        throw error;
      });

    return new NextResponse(JSON.stringify({ data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Error al realizar la búsqueda" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
