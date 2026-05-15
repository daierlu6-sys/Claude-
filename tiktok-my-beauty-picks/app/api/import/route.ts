import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseCSV } from "@/lib/csv-parser";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const mode = (formData.get("mode") as string) ?? "append"; // "append" | "replace"

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const text = await file.text();
  const products = parseCSV(text);

  if (products.length === 0) {
    return NextResponse.json({ error: "No valid rows found" }, { status: 400 });
  }

  if (mode === "replace") {
    await prisma.product.deleteMany();
  }

  const created = await prisma.product.createMany({
    data: products,
    skipDuplicates: false,
  });

  return NextResponse.json({ imported: created.count, total: products.length });
}
