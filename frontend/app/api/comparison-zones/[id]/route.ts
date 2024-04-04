import { revalidatePath } from "next/cache";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL! + "api/v1/comparison_zones/" + id,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return Response.json({ comparisonZone: data }, { status: 200 });
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await request.json();

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL! +
      "api/v1/comparison_zones/" +
      id +
      "/add_product_to_compare/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return Response.json({ data }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  await fetch(
    process.env.NEXT_PUBLIC_API_URL! + `api/v1/comparison_zones/${id}/`,
    {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  revalidatePath("/comparison-zones");

  return Response.json({}, { status: 200 });
}
