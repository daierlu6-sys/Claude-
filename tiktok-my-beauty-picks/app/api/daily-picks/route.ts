import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Returns today's 10-15 curated trending products
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const count = parseInt(searchParams.get("count") ?? "12");

  const picks = await prisma.product.findMany({
    where: {
      trendStatus: { in: ["trending", "emerging"] },
      searchVolume: { gt: 0 },
    },
    orderBy: [
      { trendScore: "desc" },
      { gmvGrowthRate: "desc" },
    ],
    take: Math.min(count, 15),
  });

  return NextResponse.json({ picks, date: new Date().toISOString().split("T")[0] });
}
