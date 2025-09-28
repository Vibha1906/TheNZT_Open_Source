'use client';

import React, { useEffect, useMemo, useState } from 'react';
import StockChart2 from '@/components/charts/StockChart2';
import StockSparkLines from '@/components/charts/StockSparkLines';

type FxPoint = {
  date: string;
  high: number | null;
  low: number | null;
  close: number | null;
  type: 'historical';
};

type PairCfg = { symbol: string; name: string; color: string };

const COMMON_PAIRS: PairCfg[] = [
  { symbol: 'EURUSD=X', name: 'EUR/USD', color: '#22c55e' },
  { symbol: 'GBPUSD=X', name: 'GBP/USD', color: '#3b82f6' },
  { symbol: 'USDJPY=X', name: 'USD/JPY', color: '#a855f7' },
  { symbol: 'USDCHF=X', name: 'USD/CHF', color: '#ef4444' },
  { symbol: 'AUDUSD=X', name: 'AUD/USD', color: '#14b8a6' },
  { symbol: 'USDCAD=X', name: 'USD/CAD', color: '#f59e0b' },
  { symbol: 'NZDUSD=X', name: 'NZD/USD', color: '#06b6d4' },
];

export default function ForexAnalysisPage() {
  const [pair, setPair] = useState<PairCfg>(COMMON_PAIRS[0]);
  const [timeframe, setTimeframe] = useState<'1d' | '1wk' | '1mo'>('1d');
  const [period, setPeriod] = useState<'1mo' | '3mo' | '6mo' | '1y' | '5y' | 'max'>('6mo');
  const [data, setData] = useState<FxPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [miniData, setMiniData] = useState<Record<string, { spark: number[]; last: number | null; changePct: number | null }>>({});

  useEffect(() => {
    let cancelled = false;
    const fetchMain = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams();
        params.set('symbol', pair.symbol);
        params.set('interval', timeframe);
        params.set('period', period);
        const r = await fetch(`/api/yf/market?${params.toString()}`, { cache: 'no-store' });
        const json = await r.json();
        if (!r.ok || json?.error) throw new Error(json?.error || 'Failed to fetch');
        if (!cancelled) setData((json.points || []) as FxPoint[]);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to fetch');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchMain();
    return () => { cancelled = true; };
  }, [pair, timeframe, period]);

  useEffect(() => {
    let cancelled = false;
    const fetchMinis = async () => {
      try {
        const results: typeof miniData = {};
        await Promise.all(
          COMMON_PAIRS.map(async (cfg) => {
            const params = new URLSearchParams();
            params.set('symbol', cfg.symbol);
            params.set('interval', '1d');
            params.set('period', '1mo');
            const r = await fetch(`/api/yf/market?${params.toString()}`, { cache: 'no-store' });
            const json = await r.json();
            if (r.ok && !json.error) {
              const pts = (json.points || []).map((p: any) => (p.close == null ? 0 : Number(p.close)));
              const last = pts.length ? pts[pts.length - 1] : null;
              const first = pts.find((x: number) => x !== 0) ?? last;
              const changePct = last != null && first ? ((last - first) / first) * 100 : null;
              results[cfg.symbol] = { spark: pts, last, changePct };
            } else {
              results[cfg.symbol] = { spark: [], last: null, changePct: null };
            }
          })
        );
        if (!cancelled) setMiniData(results);
      } catch (e) {
        // ignore mini errors
      }
    };
    fetchMinis();
    return () => { cancelled = true; };
  }, []);

  const isPositive = useMemo(() => {
    if (data.length < 2) return true;
    const first = data.find((d) => d.type === 'historical');
    const last = data[data.length - 1];
    return (last?.close || 0) >= (first?.close || 0);
  }, [data]);

  return (
    <div className="px-4 py-6 md:px-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Forex Analysis</h1>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-md p-4 shadow-sm border">
          <label className="block text-sm text-gray-600 mb-1">Forex Pair</label>
          <select
            value={pair.symbol}
            onChange={(e) => {
              const next = COMMON_PAIRS.find((p) => p.symbol === e.target.value)!;
              setPair(next);
            }}
            className="w-full border rounded-md px-2 py-2 text-sm bg-white"
          >
            {COMMON_PAIRS.map((p) => (
              <option key={p.symbol} value={p.symbol}>{p.name}</option>
            ))}
          </select>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Timeframe</label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as any)}
                className="w-full border rounded-md px-2 py-2 text-sm bg-white"
              >
                <option value="1d">Daily</option>
                <option value="1wk">Weekly</option>
                <option value="1mo">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Period</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as any)}
                className="w-full border rounded-md px-2 py-2 text-sm bg-white"
              >
                <option value="1mo">1 month</option>
                <option value="3mo">3 months</option>
                <option value="6mo">6 months</option>
                <option value="1y">1 year</option>
                <option value="5y">5 years</option>
                <option value="max">Max</option>
              </select>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-xs text-gray-500 mb-2">Quick Pairs</div>
            <div className="flex flex-wrap gap-2">
              {COMMON_PAIRS.map((p) => (
                <button
                  key={p.symbol}
                  onClick={() => setPair(p)}
                  className={`px-2 py-1 rounded text-xs border ${pair.symbol === p.symbol ? 'bg-[#26443A] text-white' : 'bg-white text-gray-700'}`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md p-4 shadow-sm border lg:col-span-3">
          {error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <p className="text-sm text-gray-600">Select a pair, timeframe, and period to load data.</p>
          )}
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-md p-4 shadow-sm border mb-6">
        <StockChart2
          data={data as any}
          isPositive={isPositive}
          loading={loading}
          symbol={pair.name}
          heightOfStockChart={'420px'}
        />
      </div>

      {/* Mini Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {COMMON_PAIRS.map((cfg) => {
          const row = miniData[cfg.symbol];
          const last = row?.last ?? null;
          const pct = row?.changePct ?? null;
          const up = pct != null ? pct >= 0 : true;
          return (
            <div key={cfg.symbol} className="bg-white border rounded-md p-4 shadow-sm">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-sm text-slate-500">{cfg.name}</div>
                  <div className="text-lg font-semibold text-slate-900">{cfg.symbol}</div>
                </div>
                <div className={`text-sm font-medium ${up ? 'text-green-600' : 'text-red-600'}`}>
                  {last != null ? last.toFixed(5) : '--'}
                  {pct != null && (
                    <span className="ml-2 text-xs">{up ? '▲' : '▼'} {pct.toFixed(2)}%</span>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <StockSparkLines data={row?.spark || []} fillColor={cfg.color} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
