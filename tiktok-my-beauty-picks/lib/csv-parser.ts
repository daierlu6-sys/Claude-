import Papa from "papaparse";
import { calcTrendScore } from "./trend-score";

export interface ParsedProduct {
  name: string;
  category: string;
  subCategory?: string;
  price: number;
  priceMin?: number;
  priceMax?: number;
  gmv?: number;
  gmvGrowthRate?: number;
  salesVolume?: number;
  salesGrowthRate?: number;
  creatorCount?: number;
  creatorGrowthRate?: number;
  videoCount?: number;
  viewCount?: number;
  primaryKeyword?: string;
  keywords?: string;
  searchVolume?: number;
  searchTrend?: string;
  sellerCount?: number;
  competitionLevel?: string;
  trendScore: number;
  trendStatus: string;
  imageUrl?: string;
  productUrl?: string;
  brand?: string;
  description?: string;
  dataDate?: Date;
}

function parseNum(val: unknown): number | undefined {
  if (val == null || val === "") return undefined;
  const n = parseFloat(String(val).replace(/[,%]/g, ""));
  return isNaN(n) ? undefined : n;
}

function parseStr(val: unknown): string | undefined {
  if (val == null || val === "") return undefined;
  return String(val).trim();
}

// Flexible field mapping for common CSV exports (Kalodata, FastMoss, etc.)
const FIELD_MAP: Record<string, string> = {
  // Names
  "product name": "name",
  "商品名称": "name",
  "产品名称": "name",
  "name": "name",
  // Price
  "price": "price",
  "售价": "price",
  "价格": "price",
  "avg price": "price",
  "min price": "priceMin",
  "max price": "priceMax",
  // GMV
  "gmv": "gmv",
  "销售额": "gmv",
  "gmv growth": "gmvGrowthRate",
  "gmv增速": "gmvGrowthRate",
  "gmv growth rate": "gmvGrowthRate",
  // Sales
  "sales": "salesVolume",
  "销量": "salesVolume",
  "sold": "salesVolume",
  "sales growth": "salesGrowthRate",
  "销量增速": "salesGrowthRate",
  // Creator
  "creators": "creatorCount",
  "达人数": "creatorCount",
  "creator count": "creatorCount",
  "creator growth": "creatorGrowthRate",
  "达人增速": "creatorGrowthRate",
  // Video / Views
  "videos": "videoCount",
  "视频数": "videoCount",
  "views": "viewCount",
  "播放量": "viewCount",
  // Keywords
  "keyword": "primaryKeyword",
  "关键词": "primaryKeyword",
  "keywords": "keywords",
  "search volume": "searchVolume",
  "搜索量": "searchVolume",
  "search trend": "searchTrend",
  "搜索趋势": "searchTrend",
  // Competition
  "sellers": "sellerCount",
  "卖家数": "sellerCount",
  "competition": "competitionLevel",
  "竞争度": "competitionLevel",
  // Info
  "image": "imageUrl",
  "image url": "imageUrl",
  "图片": "imageUrl",
  "product url": "productUrl",
  "链接": "productUrl",
  "brand": "brand",
  "品牌": "brand",
  "category": "category",
  "类目": "category",
  "sub category": "subCategory",
  "subcategory": "subCategory",
  "description": "description",
  "描述": "description",
  "date": "dataDate",
  "数据日期": "dataDate",
};

export function parseCSV(csvText: string): ParsedProduct[] {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase(),
  });

  return (result.data as Record<string, unknown>[]).map((row) => {
    const mapped: Record<string, unknown> = {};
    for (const [rawKey, val] of Object.entries(row)) {
      const field = FIELD_MAP[rawKey.trim().toLowerCase()];
      if (field) mapped[field] = val;
    }

    const { score, status } = calcTrendScore({
      gmvGrowthRate: parseNum(mapped.gmvGrowthRate),
      salesGrowthRate: parseNum(mapped.salesGrowthRate),
      creatorGrowthRate: parseNum(mapped.creatorGrowthRate),
      searchVolume: parseNum(mapped.searchVolume),
      searchTrend: parseStr(mapped.searchTrend),
      sellerCount: parseNum(mapped.sellerCount),
      viewCount: parseNum(mapped.viewCount),
    });

    const competitionLevel =
      parseStr(mapped.competitionLevel) ??
      (parseNum(mapped.sellerCount) != null
        ? (parseNum(mapped.sellerCount)! < 20 ? "low" : parseNum(mapped.sellerCount)! < 50 ? "medium" : "high")
        : undefined);

    return {
      name: parseStr(mapped.name) ?? "Unknown Product",
      category: parseStr(mapped.category) ?? "Makeup",
      subCategory: parseStr(mapped.subCategory),
      price: parseNum(mapped.price) ?? 0,
      priceMin: parseNum(mapped.priceMin),
      priceMax: parseNum(mapped.priceMax),
      gmv: parseNum(mapped.gmv),
      gmvGrowthRate: parseNum(mapped.gmvGrowthRate),
      salesVolume: parseNum(mapped.salesVolume) != null ? Math.round(parseNum(mapped.salesVolume)!) : undefined,
      salesGrowthRate: parseNum(mapped.salesGrowthRate),
      creatorCount: parseNum(mapped.creatorCount) != null ? Math.round(parseNum(mapped.creatorCount)!) : undefined,
      creatorGrowthRate: parseNum(mapped.creatorGrowthRate),
      videoCount: parseNum(mapped.videoCount) != null ? Math.round(parseNum(mapped.videoCount)!) : undefined,
      viewCount: parseNum(mapped.viewCount) != null ? Math.round(parseNum(mapped.viewCount)!) : undefined,
      primaryKeyword: parseStr(mapped.primaryKeyword),
      keywords: parseStr(mapped.keywords),
      searchVolume: parseNum(mapped.searchVolume) != null ? Math.round(parseNum(mapped.searchVolume)!) : undefined,
      searchTrend: parseStr(mapped.searchTrend),
      sellerCount: parseNum(mapped.sellerCount) != null ? Math.round(parseNum(mapped.sellerCount)!) : undefined,
      competitionLevel,
      trendScore: score,
      trendStatus: status,
      imageUrl: parseStr(mapped.imageUrl),
      productUrl: parseStr(mapped.productUrl),
      brand: parseStr(mapped.brand),
      description: parseStr(mapped.description),
      dataDate: mapped.dataDate ? new Date(String(mapped.dataDate)) : undefined,
    };
  });
}
