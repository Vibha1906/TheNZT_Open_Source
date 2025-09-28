"use client";

import React, { useEffect, useMemo, useState } from "react";
import StockChart2 from "@/components/charts/StockChart2";

type MarketPoint = {
  date: string;
  high: number | null;
  low: number | null;
  close: number | null;
  type: "historical";
};

export default function TechnicalAnalysisPage() {
  const [symbol, setSymbol] = useState("AAPL");
  const [height] = useState("420px");
  const [data, setData] = useState<MarketPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // yfinance timeframe + period
  const [timeframe, setTimeframe] = useState<"1d" | "1wk" | "1mo">("1d");
  const [period, setPeriod] = useState<"1mo" | "3mo" | "6mo" | "1y" | "5y" | "max">("6mo");

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams();
        params.set("symbol", symbol);
        params.set("interval", timeframe);
        params.set("period", period);

        const r = await fetch(`/api/yf/market?${params.toString()}` , {
          cache: "no-store",
        });
        const json = await r.json();
        if (!r.ok) throw new Error(json?.error || "Failed to fetch");
        if (!cancelled) {
          setData(json.points || []);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to fetch");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [symbol, timeframe, period]);

  const isPositive = useMemo(() => {
    if (data.length < 2) return true;
    const first = data.find((d) => d.type === "historical");
    const last = data[data.length - 1];
    return (last?.close || 0) >= (first?.close || 0);
  }, [data]);

  return (
    <div className="px-4 py-6 md:px-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-text-color">Technical Analysis</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-md p-4 shadow-sm border">
          <label className="block text-sm text-gray-600 mb-1">Symbol</label>
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-main"
            placeholder="e.g., AAPL"
          />
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
          <p className="text-xs text-gray-500 mt-2">Data powered by Yahoo Finance via yfinance.</p>
        </div>
        <div className="bg-white rounded-md p-4 shadow-sm border lg:col-span-3">
          {error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <p className="text-sm text-gray-600">Enter a symbol and choose timeframe/period to load data.</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-md p-4 shadow-sm border">
        <StockChart2
          data={data as any}
          isPositive={isPositive}
          loading={loading}
          symbol={symbol}
          heightOfStockChart={height}
        />
      </div>
    </div>
  );
}
