
export async function GET() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL! + "api/v1/comparison_zones/",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return Response.json({ comparisonZones: data }, { status: 200 });
}