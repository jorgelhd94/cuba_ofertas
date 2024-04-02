import { IComparisonZone } from "@/lib/interfaces/IComparisonZone";
import { revalidatePath } from "next/cache";

export async function GET() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL! + "api/v1/comparation_zones/",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return Response.json({ comparisonZones: data }, { status: 200 });
}

export async function DELETE(request: Request) {
  const req = await request.json();
  const id = req.id;

  await fetch(
    process.env.NEXT_PUBLIC_API_URL! + `api/v1/comparation_zones/${id}/`,
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
