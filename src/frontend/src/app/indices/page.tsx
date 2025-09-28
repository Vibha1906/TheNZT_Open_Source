'use client';

import React, { useEffect, useMemo, useState } from 'react';
import StockSparkLines from '@/components/charts/StockSparkLines';

type IndexConfig = {
  symbol: string;
  name: string;
  color: string; // hex
};

type Point = { date: string; close: number | null };

const INDICES: IndexConfig[] = [
  { symbol: '^GSPC', name: 'S&P 500', color: '#22c55e' },
  { symbol: '^DJI', name: 'Dow Jones', color: '#3b82f6' },
  { symbol: '^IXIC', name: 'NASDAQ', color: '#a855f7' },
  { symbol: '^RUT', name: 'Russell 2000', color: '#ef4444' },
  { symbol: '^FTSE', name: 'FTSE 100', color: '#14b8a6' },
  { symbol: '^N225', name: 'Nikkei 225', color: '#f59e0b' },
  { symbol: '^HSI', name: 'Hang Seng', color: '#64748b' },
  { symbol: '^GDAXI', name: 'DAX', color: '#06b6d4' },
];

export default function IndicesPage() {
  const [data, setData] = useState<Record<string, { points: Point[]; last?: number | null }>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const results: Record<string, { points: Point[]; last?: number | null }> = {};
        // Fetch each index with weekly data for 6 months to render meaningful sparkline
        await Promise.all(
          INDICES.map(async (cfg) => {
            const params = new URLSearchParams();
            params.set('symbol', cfg.symbol);
            params.set('interval', '1wk');
            params.set('period', '6mo');
            const r = await fetch(`/api/yf/market?${params.toString()}`, { cache: 'no-store' });
            const json = await r.json();
            if (r.ok && !json.error) {
              const pts = (json.points || []).map((p: any) => ({ date: p.date, close: p.close }));
              results[cfg.symbol] = { points: pts, last: json.last ?? null };
            } else {
              results[cfg.symbol] = { points: [], last: null };
            }
          })
        );
        if (!cancelled) setData(results);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load indices');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="px-4 py-6 md:px-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Global Indices</h1>
        {loading && <span className="text-sm text-slate-500">Loading…</span>}
      </div>
      {error && (
        <div className="mb-4 text-sm text-red-600">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {INDICES.map((cfg) => {
          const d = data[cfg.symbol]?.points || [];
          const last = data[cfg.symbol]?.last ?? (d.length ? d[d.length - 1].close : null);
          const first = d.find((p) => p.close != null)?.close ?? last;
          const change = last != null && first != null ? last - first : null;
          const pct = last != null && first ? (change! / first) * 100 : null;
          const spark = d.map((p) => (p.close == null ? 0 : Number(p.close)));
          const up = change != null ? change >= 0 : true;
          return (
            <div key={cfg.symbol} className="bg-white border rounded-md p-4 shadow-sm">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-sm text-slate-500">{cfg.name}</div>
                  <div className="text-lg font-semibold text-slate-900">{cfg.symbol}</div>
                </div>
                <div className={`text-sm font-medium ${up ? 'text-green-600' : 'text-red-600'}`}>
                  {last != null ? last.toFixed(2) : '--'}
                  {pct != null && (
                    <span className="ml-2 text-xs">{up ? '▲' : '▼'} {pct.toFixed(2)}%</span>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <StockSparkLines data={spark} fillColor={cfg.color} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
