"use client";

import { STATUS_LABELS } from "@/lib/trend-score";

export function TrendBadge({ status }: { status: string }) {
  const info = STATUS_LABELS[status] ?? STATUS_LABELS.unknown;
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
      style={{ color: info.color, backgroundColor: info.bg, border: `1px solid ${info.color}30` }}
    >
      {info.label}
    </span>
  );
}
