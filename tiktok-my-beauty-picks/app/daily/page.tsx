"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TrendBadge } from "../components/TrendBadge";
import { ScoreRing } from "../components/ScoreRing";

interface Product {
  id: number;
  name: string;
  brand?: string | null;
  price: number;
  currency: string;
  imageUrl?: string | null;
  trendScore: number;
  trendStatus: string;
  gmvGrowthRate?: number | null;
  salesGrowthRate?: number | null;
  creatorGrowthRate?: number | null;
  searchVolume?: number | null;
  searchTrend?: string | null;
  primaryKeyword?: string | null;
  keywords?: string | null;
  sellerCount?: number | null;
  description?: string | null;
}

function fmt(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export default function DailyPage() {
  const [picks, setPicks] = useState<Product[]>([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/daily-picks")
      .then((r) => r.json())
      .then((d) => {
        setPicks(d.picks ?? []);
        setDate(d.date ?? "");
        setLoading(false);
      });
  }, []);

  function copyForListing() {
    const text = picks
      .map(
        (p, i) =>
          `${i + 1}. ${p.name}\n   品牌：${p.brand ?? "—"} | 价格：${p.currency} ${p.price.toFixed(2)}\n   趋势分：${Math.round(p.trendScore)} | 关键词：${p.primaryKeyword ?? "—"}\n   GMV增速：${p.gmvGrowthRate != null ? `+${p.gmvGrowthRate}%` : "—"} | 搜索量：${p.searchVolume != null ? fmt(p.searchVolume) : "—"}`
      )
      .join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Header */}
      <header className="bg-white border-b border-[#e7e5e4]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
              ← 返回
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-[#1c1917]">今日精选</h1>
              <p className="text-xs text-[#a8a29e]">{date} · TikTok MY 彩妆趋势品 {picks.length} 款</p>
            </div>
          </div>
          <button
            onClick={copyForListing}
            className="px-4 py-2 text-sm bg-[#1c1917] text-white hover:bg-[#292524] transition-colors"
          >
            {copied ? "已复制 ✓" : "复制上架清单"}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Legend */}
        <div className="bg-white border border-[#e7e5e4] p-5 mb-8">
          <p className="text-xs text-[#78716c] font-medium uppercase tracking-wider mb-3">选品逻辑说明</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-[#78716c]">
            <div><span className="font-semibold text-[#44403c]">趋势分 ≥ 70</span><br />标记为"趋势品"，增速快但未饱和</div>
            <div><span className="font-semibold text-[#44403c]">搜索量有基础</span><br />确保关键词有真实需求</div>
            <div><span className="font-semibold text-[#44403c]">卖家数 &lt; 50</span><br />竞争压力小，还有机会</div>
            <div><span className="font-semibold text-[#44403c]">周环比增速 20-100%</span><br />趋势甜蜜区，非爆品</div>
          </div>
        </div>

        {loading && (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border border-[#e7e5e4] h-32 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && picks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#a8a29e] mb-4">暂无趋势品数据</p>
            <Link href="/" className="text-sm underline text-[#44403c]">先导入数据</Link>
          </div>
        )}

        {/* Product list — editorial style */}
        <div className="space-y-3">
          {picks.map((p, i) => {
            const kws: string[] = (() => {
              try { return JSON.parse(p.keywords ?? "[]"); } catch { return []; }
            })();
            return (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group flex gap-5 bg-white border border-[#e7e5e4] p-4 hover:border-[#a8a29e] transition-colors"
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-8 text-center pt-1">
                  <span className="text-sm font-bold text-[#d6d3d1] font-mono">{String(i + 1).padStart(2, "0")}</span>
                </div>

                {/* Image */}
                <div className="flex-shrink-0 w-20 h-20 bg-[#f5f5f4] overflow-hidden">
                  {p.imageUrl ? (
                    <Image src={p.imageUrl} alt={p.name} width={80} height={80} className="w-full h-full object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl text-[#d6d3d1]">✦</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      {p.brand && <p className="text-xs text-[#a8a29e] uppercase tracking-wider">{p.brand}</p>}
                      <h3 className="text-sm font-medium text-[#1c1917] leading-snug">{p.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <TrendBadge status={p.trendStatus} />
                      <ScoreRing score={p.trendScore} />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-[#78716c]">
                    <span><span className="text-[#a8a29e]">价格</span> {p.currency} {p.price.toFixed(2)}</span>
                    {p.gmvGrowthRate != null && (
                      <span className={p.gmvGrowthRate > 0 ? "text-green-600" : "text-red-500"}>
                        GMV {p.gmvGrowthRate > 0 ? "+" : ""}{p.gmvGrowthRate}%/周
                      </span>
                    )}
                    {p.salesGrowthRate != null && (
                      <span className={p.salesGrowthRate > 0 ? "text-green-600" : "text-red-500"}>
                        销量 {p.salesGrowthRate > 0 ? "+" : ""}{p.salesGrowthRate}%
                      </span>
                    )}
                    {p.searchVolume != null && (
                      <span><span className="text-[#a8a29e]">搜索量</span> {fmt(p.searchVolume)}</span>
                    )}
                    {p.sellerCount != null && (
                      <span className={p.sellerCount < 50 ? "text-green-600" : "text-[#78716c]"}>
                        <span className="text-[#a8a29e]">竞品</span> {p.sellerCount}家
                      </span>
                    )}
                  </div>

                  {kws.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {kws.slice(0, 4).map((kw: string) => (
                        <span key={kw} className="px-2 py-0.5 text-xs bg-[#f5f5f4] text-[#78716c]">#{kw}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
