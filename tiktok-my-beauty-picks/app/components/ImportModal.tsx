"use client";

import { useRef, useState } from "react";

interface ImportModalProps {
  open: boolean;
  onClose: () => void;
  onImported: () => void;
}

export function ImportModal({ open, onClose, onImported }: ImportModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"append" | "replace">("append");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const file = inputRef.current?.files?.[0];
    if (!file) return;
    setLoading(true);
    setResult(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("mode", mode);
    const res = await fetch("/api/import", { method: "POST", body: fd });
    const json = await res.json();
    setLoading(false);
    if (res.ok) {
      setResult(`成功导入 ${json.imported} 条产品数据`);
      onImported();
    } else {
      setResult(`错误：${json.error}`);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white w-full max-w-md p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-[#1c1917] mb-1">导入产品数据</h2>
        <p className="text-sm text-[#78716c] mb-6">支持 Kalodata / FastMoss / 飞瓜 导出的 CSV 格式</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#78716c] uppercase tracking-wider mb-2">CSV 文件</label>
            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              required
              className="block w-full text-sm text-[#44403c] file:mr-3 file:py-1.5 file:px-3 file:border file:border-[#e7e5e4] file:text-xs file:bg-[#fafaf9] file:text-[#44403c] hover:file:bg-[#f5f5f4]"
            />
          </div>

          <div>
            <label className="block text-xs text-[#78716c] uppercase tracking-wider mb-2">导入模式</label>
            <div className="flex gap-4">
              {(["append", "replace"] as const).map((m) => (
                <label key={m} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value={m}
                    checked={mode === m}
                    onChange={() => setMode(m)}
                    className="accent-[#1c1917]"
                  />
                  <span className="text-sm text-[#44403c]">{m === "append" ? "追加" : "替换全部"}</span>
                </label>
              ))}
            </div>
          </div>

          {result && (
            <p className={`text-sm ${result.startsWith("错误") ? "text-red-600" : "text-green-600"}`}>{result}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-[#1c1917] text-white text-sm font-medium hover:bg-[#292524] disabled:opacity-50 transition-colors"
            >
              {loading ? "导入中..." : "开始导入"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-[#e7e5e4] text-sm text-[#78716c] hover:bg-[#f5f5f4] transition-colors"
            >
              关闭
            </button>
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-[#f5f5f4]">
          <p className="text-xs text-[#a8a29e] font-medium uppercase tracking-wider mb-2">支持的列名（中英均可）</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-[#78716c]">
            <span>name / 商品名称</span>
            <span>price / 售价</span>
            <span>gmv / 销售额</span>
            <span>gmv growth / GMV增速</span>
            <span>sales / 销量</span>
            <span>creators / 达人数</span>
            <span>search volume / 搜索量</span>
            <span>sellers / 卖家数</span>
          </div>
        </div>
      </div>
    </div>
  );
}
