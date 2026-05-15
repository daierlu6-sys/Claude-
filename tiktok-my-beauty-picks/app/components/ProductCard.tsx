"use client";

import Link from "next/link";
import Image from "next/image";
import { TrendBadge } from "./TrendBadge";
import { ScoreRing } from "./ScoreRing";

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

function fmtNum(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block bg-white border border-[#e7e5e4] hover:border-[#a8a29e] transition-colors duration-200">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#f5f5f4]">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl text-[#d6d3d1]">✦</div>
        )}
        <div className="absolute top-2 left-2">
          <TrendBadge status={product.trendStatus} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {product.brand && (
          <p className="text-xs text-[#78716c] uppercase tracking-widest mb-1">{product.brand}</p>
        )}
        <h3 className="text-sm font-medium text-[#1c1917] leading-snug mb-3 line-clamp-2">{product.name}</h3>

        <div className="flex items-center justify-between mb-3">
          <span className="text-base font-semibold text-[#1c1917]">
            {product.currency} {product.price.toFixed(2)}
          </span>
          <ScoreRing score={product.trendScore} />
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-1 text-center border-t border-[#f5f5f4] pt-3">
          <div>
            <p className="text-xs text-[#a8a29e]">GMV增速</p>
            <p className={`text-xs font-semibold ${(product.gmvGrowthRate ?? 0) > 0 ? "text-green-600" : "text-red-500"}`}>
              {product.gmvGrowthRate != null ? `${product.gmvGrowthRate > 0 ? "+" : ""}${product.gmvGrowthRate}%` : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#a8a29e]">搜索量</p>
            <p className="text-xs font-semibold text-[#44403c]">
              {product.searchVolume != null ? fmtNum(product.searchVolume) : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#a8a29e]">卖家数</p>
            <p className={`text-xs font-semibold ${(product.sellerCount ?? 999) < 50 ? "text-green-600" : "text-red-500"}`}>
              {product.sellerCount != null ? product.sellerCount : "—"}
            </p>
          </div>
        </div>

        {product.primaryKeyword && (
          <p className="mt-2 text-xs text-[#78716c] truncate">
            <span className="text-[#a8a29e]">#</span> {product.primaryKeyword}
          </p>
        )}
      </div>
    </Link>
  );
}
