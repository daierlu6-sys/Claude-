export interface TrendInput {
  gmvGrowthRate?: number | null;
  salesGrowthRate?: number | null;
  creatorGrowthRate?: number | null;
  searchVolume?: number | null;
  searchTrend?: string | null;
  sellerCount?: number | null;
  viewCount?: number | null;
}

export function calcTrendScore(data: TrendInput): {
  score: number;
  status: "emerging" | "trending" | "saturated" | "declining" | "unknown";
} {
  let score = 0;
  let factorCount = 0;

  // GMV growth (0-30 pts): trending = 20-80% weekly growth
  if (data.gmvGrowthRate != null) {
    if (data.gmvGrowthRate >= 20 && data.gmvGrowthRate <= 100) score += 30;
    else if (data.gmvGrowthRate > 100) score += 15; // possibly saturating
    else if (data.gmvGrowthRate >= 5) score += 15;
    else if (data.gmvGrowthRate < 0) score += 0;
    else score += 8;
    factorCount++;
  }

  // Sales growth (0-25 pts)
  if (data.salesGrowthRate != null) {
    if (data.salesGrowthRate >= 15 && data.salesGrowthRate <= 80) score += 25;
    else if (data.salesGrowthRate > 80) score += 12;
    else if (data.salesGrowthRate >= 5) score += 12;
    else if (data.salesGrowthRate < 0) score += 0;
    else score += 6;
    factorCount++;
  }

  // Creator growth (0-20 pts): new creators still entering = trending
  if (data.creatorGrowthRate != null) {
    if (data.creatorGrowthRate >= 10 && data.creatorGrowthRate <= 50) score += 20;
    else if (data.creatorGrowthRate > 50) score += 10;
    else if (data.creatorGrowthRate >= 3) score += 10;
    else score += 3;
    factorCount++;
  }

  // Search volume + trend (0-15 pts)
  if (data.searchVolume != null) {
    if (data.searchVolume >= 10000) score += 8;
    else if (data.searchVolume >= 1000) score += 6;
    else if (data.searchVolume >= 100) score += 3;
    factorCount++;
  }
  if (data.searchTrend === "rising") score += 7;
  else if (data.searchTrend === "stable") score += 3;

  // Competition (0-10 pts): fewer sellers = more opportunity
  if (data.sellerCount != null) {
    if (data.sellerCount < 20) score += 10;
    else if (data.sellerCount < 50) score += 7;
    else if (data.sellerCount < 100) score += 4;
    else score += 1;
    factorCount++;
  }

  const normalizedScore = factorCount > 0 ? Math.min(100, score) : 0;

  let status: "emerging" | "trending" | "saturated" | "declining" | "unknown";
  if (factorCount === 0) {
    status = "unknown";
  } else if (normalizedScore >= 70) {
    status = "trending";
  } else if (normalizedScore >= 50) {
    status = "emerging";
  } else if ((data.gmvGrowthRate ?? 0) < 0 || (data.salesGrowthRate ?? 0) < 0) {
    status = "declining";
  } else {
    status = "saturated";
  }

  return { score: normalizedScore, status };
}

export const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  trending: { label: "趋势品", color: "#16a34a", bg: "#f0fdf4" },
  emerging: { label: "新兴品", color: "#d97706", bg: "#fffbeb" },
  saturated: { label: "饱和品", color: "#dc2626", bg: "#fef2f2" },
  declining: { label: "衰退品", color: "#6b7280", bg: "#f9fafb" },
  unknown: { label: "待分析", color: "#6b7280", bg: "#f9fafb" },
};
