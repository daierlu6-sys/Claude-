"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TrendBadge } from "../../components/TrendBadge";
import { ScoreRing } from "../../components/ScoreRing";

interface Product {
  id: number;
  name: string;
  brand?: string | null;
  price: number;
  priceMin?: number | null;
  priceMax?: number | null;
  currency: string;
  imageUrl?: string | null;
  productUrl?: string | null;
  description?: string | null;
  subCategory?: string | null;
  trendScore: number;
  trendStatus: string;
  gmv?: number | null;
  gmvGrowthRate?: number | null;
  salesVolume?: number | null;
  salesGrowthRate?: number | null;
  creatorCount?: number | null;
  creatorGrowthRate?: number | null;
  videoCount?: number | null;
  viewCount?: number | null;
  primaryKeyword?: string | null;
  keywords?: string | null;
  searchVolume?: number | null;
  searchTrend?: string | null;
  sellerCount?: number | null;
  competitionLevel?: string | null;
  dataDate?: string | null;
}

function Stat({ label, value, sub, highlight }: { label: string; value: string; sub?: string; highlight?: "green" | "red" }) {
  return (
    <div className="bg-[#fafaf9] border border-[#f0efed] p-4">
      <p className="text-xs text-[#a8a29e] uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-lg font-semibold ${highlight === "green" ? "text-green-600" : highlight === "red" ? "text-red-500" : "text-[#1c1917]"}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-[#a8a29e] mt-0.5">{sub}</p>}
    </div>
  );
}

function fmt(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((d) => { setProduct(d); setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#e7e5e4] border-t-[#1c1917] rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center">
        <p className="text-[#a8a29e]">产品不存在</p>
      </div>
    );
  }

  const kws: string[] = (() => {
    try { return JSON.parse(product.keywords ?? "[]"); } catch { return []; }
  })();

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <header className="bg-white border-b border-[#e7e5e4]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">← 返回</Link>
          <span className="text-[#e7e5e4]">/</span>
          <span className="text-sm text-[#44403c] truncate">{product.name}</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-[320px_1fr] gap-8">
          {/* Left: image + score */}
          <div>
            <div className="aspect-square bg-[#f5f5f4] border border-[#e7e5e4] overflow-hidden mb-4">
              {product.imageUrl ? (
                <Image src={product.imageUrl} alt={product.name} width={320} height={320} className="w-full h-full object-cover" unoptimized />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl text-[#d6d3d1]">✦</div>
              )}
            </div>

            <div className="bg-white border border-[#e7e5e4] p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#a8a29e] uppercase tracking-wider mb-1">趋势评分</p>
                <TrendBadge status={product.trendStatus} />
              </div>
              <ScoreRing score={product.trendScore} />
            </div>

            {product.productUrl && (
              <a
                href={product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block w-full py-2.5 bg-[#1c1917] text-white text-sm text-center hover:bg-[#292524] transition-colors"
              >
                查看TikTok链接 →
              </a>
            )}
          </div>

          {/* Right: details */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              {product.brand && (
                <p className="text-xs text-[#a8a29e] uppercase tracking-widest mb-1">{product.brand}</p>
              )}
              <h1 className="text-2xl font-semibold text-[#1c1917] leading-snug mb-2">{product.name}</h1>
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-[#1c1917]">
                  {product.currency} {product.price.toFixed(2)}
                </span>
                {product.priceMin != null && product.priceMax != null && (
                  <span className="text-sm text-[#78716c]">
                    ({product.currency} {product.priceMin.toFixed(2)} – {product.priceMax.toFixed(2)})
                  </span>
                )}
              </div>
              {product.description && (
                <p className="text-sm text-[#78716c] mt-3 leading-relaxed">{product.description}</p>
              )}
            </div>

            {/* GMV & Sales */}
            <div>
              <p className="text-xs text-[#a8a29e] uppercase tracking-wider mb-3">销售数据</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.gmv != null && (
                  <Stat label="GMV" value={`MYR ${fmt(product.gmv)}`} />
                )}
                {product.gmvGrowthRate != null && (
                  <Stat label="GMV周增速" value={`${product.gmvGrowthRate > 0 ? "+" : ""}${product.gmvGrowthRate}%`}
                    highlight={product.gmvGrowthRate > 0 ? "green" : "red"} />
                )}
                {product.salesVolume != null && (
                  <Stat label="销量" value={fmt(product.salesVolume)} />
                )}
                {product.salesGrowthRate != null && (
                  <Stat label="销量增速" value={`${product.salesGrowthRate > 0 ? "+" : ""}${product.salesGrowthRate}%`}
                    highlight={product.salesGrowthRate > 0 ? "green" : "red"} />
                )}
                {product.creatorCount != null && (
                  <Stat label="达人数" value={fmt(product.creatorCount)} />
                )}
                {product.creatorGrowthRate != null && (
                  <Stat label="达人增速" value={`${product.creatorGrowthRate > 0 ? "+" : ""}${product.creatorGrowthRate}%`}
                    highlight={product.creatorGrowthRate > 0 ? "green" : "red"} />
                )}
              </div>
            </div>

            {/* Keywords & Search */}
            <div>
              <p className="text-xs text-[#a8a29e] uppercase tracking-wider mb-3">关键词 & 搜索</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                {product.searchVolume != null && (
                  <Stat label="搜索量" value={fmt(product.searchVolume)} />
                )}
                {product.searchTrend && (
                  <Stat label="搜索趋势"
                    value={product.searchTrend === "rising" ? "上升 ↑" : product.searchTrend === "declining" ? "下降 ↓" : "稳定 →"}
                    highlight={product.searchTrend === "rising" ? "green" : product.searchTrend === "declining" ? "red" : undefined}
                  />
                )}
                {product.primaryKeyword && (
                  <Stat label="核心关键词" value={product.primaryKeyword} />
                )}
              </div>
              {kws.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {kws.map((kw: string) => (
                    <span key={kw} className="px-3 py-1 text-xs bg-white border border-[#e7e5e4] text-[#78716c]">#{kw}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Competition */}
            <div>
              <p className="text-xs text-[#a8a29e] uppercase tracking-wider mb-3">竞争分析</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.sellerCount != null && (
                  <Stat label="竞品卖家数" value={String(product.sellerCount)}
                    highlight={product.sellerCount < 50 ? "green" : "red"}
                    sub={product.sellerCount < 20 ? "竞争低 ✓" : product.sellerCount < 50 ? "竞争中" : "竞争高"}
                  />
                )}
                {product.videoCount != null && (
                  <Stat label="相关视频数" value={fmt(product.videoCount)} />
                )}
                {product.viewCount != null && (
                  <Stat label="总播放量" value={fmt(product.viewCount)} />
                )}
              </div>
            </div>

            {product.dataDate && (
              <p className="text-xs text-[#a8a29e]">数据日期：{new Date(product.dataDate).toLocaleDateString("zh-CN")}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
