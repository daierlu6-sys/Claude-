"use client";

import { useEffect, useState, useCallback } from "react";
import { ProductCard } from "./components/ProductCard";
import { ImportModal } from "./components/ImportModal";
import Link from "next/link";

type SortKey = "trendScore" | "gmv" | "growth" | "search";
type StatusFilter = "all" | "trending" | "emerging" | "saturated" | "declining";

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
  searchVolume?: number | null;
  primaryKeyword?: string | null;
  sellerCount?: number | null;
  competitionLevel?: string | null;
}

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "trending", label: "趋势品" },
  { value: "emerging", label: "新兴品" },
  { value: "saturated", label: "饱和品" },
  { value: "declining", label: "衰退品" },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "trendScore", label: "趋势评分" },
  { value: "gmv", label: "GMV" },
  { value: "growth", label: "增速" },
  { value: "search", label: "搜索量" },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortKey>("trendScore");
  const [search, setSearch] = useState("");
  const [importOpen, setImportOpen] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ status, sort, limit: "24" });
    if (search) params.set("q", search);
    const res = await fetch(`/api/products?${params}`);
    const data = await res.json();
    setProducts(data.products ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }, [status, sort, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  async function seedDemo() {
    setSeeding(true);
    await fetch("/api/seed", { method: "POST" });
    setSeeding(false);
    fetchProducts();
  }

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Header */}
      <header className="bg-white border-b border-[#e7e5e4] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-[#1c1917]">TikTok MY Beauty Picks</h1>
            <p className="text-xs text-[#a8a29e] mt-0.5">马来西亚彩妆趋势选品 · {total} 款产品</p>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              href="/daily"
              className="px-4 py-2 text-sm text-[#44403c] border border-[#e7e5e4] hover:bg-[#f5f5f4] transition-colors"
            >
              今日精选
            </Link>
            <button
              onClick={() => setImportOpen(true)}
              className="px-4 py-2 text-sm bg-[#1c1917] text-white hover:bg-[#292524] transition-colors"
            >
              导入数据
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="搜索产品名 / 品牌 / 关键词..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 px-3 py-2 text-sm bg-white border border-[#e7e5e4] focus:outline-none focus:border-[#a8a29e] placeholder-[#a8a29e]"
          />

          <div className="flex border border-[#e7e5e4] overflow-hidden">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatus(opt.value)}
                className={`px-3 py-2 text-xs transition-colors ${
                  status === opt.value
                    ? "bg-[#1c1917] text-white"
                    : "bg-white text-[#78716c] hover:bg-[#f5f5f4]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="px-3 py-2 text-sm bg-white border border-[#e7e5e4] focus:outline-none text-[#44403c]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                排序：{opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 text-[#d6d3d1]">✦</div>
            <h3 className="text-lg font-medium text-[#44403c] mb-2">暂无产品数据</h3>
            <p className="text-sm text-[#a8a29e] mb-6">可以导入CSV数据，或加载演示数据先体验</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setImportOpen(true)}
                className="px-5 py-2.5 bg-[#1c1917] text-white text-sm hover:bg-[#292524] transition-colors"
              >
                导入CSV
              </button>
              <button
                onClick={seedDemo}
                disabled={seeding}
                className="px-5 py-2.5 border border-[#e7e5e4] text-sm text-[#44403c] hover:bg-[#f5f5f4] transition-colors disabled:opacity-50"
              >
                {seeding ? "加载中..." : "加载演示数据"}
              </button>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-white border border-[#e7e5e4] animate-pulse">
                <div className="aspect-square bg-[#f5f5f4]" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-[#f5f5f4] rounded w-1/2" />
                  <div className="h-4 bg-[#f5f5f4] rounded w-3/4" />
                  <div className="h-4 bg-[#f5f5f4] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>

      <ImportModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onImported={() => {
          setImportOpen(false);
          fetchProducts();
        }}
      />
    </div>
  );
}
