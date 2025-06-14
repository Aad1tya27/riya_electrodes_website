import { getProducts } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const selectedBrand = searchParams.get("brand") || undefined;
  const selectedCategory = searchParams.get("category") || undefined;

  const productsList = await getProducts(
    selectedBrand === "All" ? undefined : selectedBrand,
    selectedCategory === "All" ? undefined : selectedCategory
  );

  return NextResponse.json(productsList);
}
