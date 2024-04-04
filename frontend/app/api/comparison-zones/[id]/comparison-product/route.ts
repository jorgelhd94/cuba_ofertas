import { revalidatePath } from "next/cache";

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
