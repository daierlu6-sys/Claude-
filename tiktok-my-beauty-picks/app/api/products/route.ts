import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("q");
  const sort = searchParams.get("sort") ?? "trendScore";
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.trendStatus = status;
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { primaryKeyword: { contains: search } },
      { brand: { contains: search } },
    ];
  }

  const orderBy =
    sort === "gmv" ? { gmv: "desc" as const }
    : sort === "growth" ? { gmvGrowthRate: "desc" as const }
    : sort === "search" ? { searchVolume: "desc" as const }
    : { trendScore: "desc" as const };

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return NextResponse.json({ products, total, page, limit });
}
