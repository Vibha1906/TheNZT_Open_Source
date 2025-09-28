import { NextRequest } from "next/server";

// Simple in-memory cache with TTL
type CacheEntry = { data: any; expiresAt: number };
const CACHE_TTL_MS = 60_000; // 60 seconds
// Persist across hot reloads
// @ts-ignore
const globalCache: Map<string, CacheEntry> = (globalThis as any).__MARKET_CACHE__ || new Map();
// @ts-ignore
(globalThis as any).__MARKET_CACHE__ = globalCache;

// GET /api/market?symbol=AAPL&type=daily|intraday&interval=1min|5min|15min|30min|60min
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = (searchParams.get("symbol") || "AAPL").toUpperCase();
  const type = (searchParams.get("type") || "daily").toLowerCase();
  const interval = (searchParams.get("interval") || "5min").toLowerCase();

  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Server missing ALPHA_VANTAGE_API_KEY. Set it in .env.local" },
      { status: 500 }
    );
  }

  const cacheKey = `${type}:${symbol}:${interval}`;
  const now = Date.now();
  const cached = globalCache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    return Response.json({ symbol, points: cached.data, cached: true, ttl: Math.max(0, Math.floor((cached.expiresAt - now) / 1000)) });
  }

  const isIntraday = type === "intraday";
  const fn = isIntraday ? "TIME_SERIES_INTRADAY" : "TIME_SERIES_DAILY_ADJUSTED";
  const intervalParam = isIntraday ? `&interval=${encodeURIComponent(interval)}` : "";
  const url = `https://www.alphavantage.co/query?function=${fn}&symbol=${encodeURIComponent(symbol)}${intervalParam}&outputsize=compact&apikey=${apiKey}`;

  try {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) {
      return Response.json({ error: `Upstream error ${r.status}` }, { status: 502 });
    }
    const data = await r.json();

    const seriesKey = isIntraday ? `Time Series (${interval})` : "Time Series (Daily)";
    const series = data[seriesKey];
    if (!series) {
      return Response.json(
        { error: data["Error Message"] || data["Note"] || "Unexpected API response" },
        { status: 502 }
      );
    }

    // Transform into array sorted by date ascending
    const points = Object.keys(series)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((date) => {
        const d = series[date];
        return {
          date,
          high: parseFloat(d["2. high"]) || null,
          low: parseFloat(d["3. low"]) || null,
          close: parseFloat(d["4. close"]) || null,
          type: "historical" as const,
        };
      });

    globalCache.set(cacheKey, { data: points, expiresAt: now + CACHE_TTL_MS });

    return Response.json({ symbol, points, cached: false, ttl: Math.floor(CACHE_TTL_MS / 1000) });
  } catch (e: any) {
    return Response.json({ error: e?.message || "Fetch failed" }, { status: 500 });
  }
}
