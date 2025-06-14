import { getBrands } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET(){
    const brandList = await getBrands()
    return NextResponse.json({ brands: brandList })
}