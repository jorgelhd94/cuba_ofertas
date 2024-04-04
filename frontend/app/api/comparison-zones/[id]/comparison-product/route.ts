import { revalidatePath } from "next/cache";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await request.json();

  await fetch(
    process.env.NEXT_PUBLIC_API_URL! +
      `api/v1/comparison_zones/${id}/remove_product_from_compare/`,
    {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  revalidatePath("/comparison-zones");

  return Response.json({}, { status: 200 });
}
