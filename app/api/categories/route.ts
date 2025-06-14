import { getCategories } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET(){
    const categoryList = await getCategories()
    return NextResponse.json(categoryList)
}