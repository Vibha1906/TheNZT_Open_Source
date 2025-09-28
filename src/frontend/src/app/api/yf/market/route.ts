import { NextRequest } from "next/server";

// Proxies to backend FastAPI yfinance endpoint
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const symbol = (searchParams.get("symbol") || "AAPL").toUpperCase();
    const interval = (searchParams.get("interval") || "1d"); // 1d | 1wk | 1mo
    const period = (searchParams.get("period") || "6mo");

    const base = process.env.NEXT_PUBLIC_BASE_URL;
    if (!base) {
      return Response.json(
        { error: "Missing NEXT_PUBLIC_BASE_URL for backend proxy." },
        { status: 500 }
      );
    }

    const url = new URL("/yf/market", base);
    url.searchParams.set("symbol", symbol);
    url.searchParams.set("interval", interval);
    url.searchParams.set("period", period);

    const r = await fetch(url.toString(), { cache: "no-store" });
    const json = await r.json();
    if (!r.ok || json?.error) {
      return Response.json(
        { error: json?.error || `Backend error ${r.status}` },
        { status: 500 }
      );
    }
    return Response.json(json);
  } catch (e: any) {
    return Response.json({ error: e?.message || "Proxy failed" }, { status: 500 });
  }
}
