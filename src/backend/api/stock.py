from fastapi import APIRouter, Query
from typing import List, Literal, Optional
import yfinance as yf

router = APIRouter(prefix="/yf", tags=["yfinance"])

Interval = Literal["1d", "1wk", "1mo"]
# Common periods supported by yfinance: 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max

@router.get("/market")
async def get_market(
    symbol: str = Query(..., description="Ticker symbol e.g. AAPL"),
    interval: Interval = Query("1d", description="1d, 1wk, 1mo"),
    period: str = Query("6mo", description="Range e.g. 1mo,3mo,6mo,1y,5y,max"),
):
    try:
        t = yf.Ticker(symbol)
        # Fetch historical dataframe
        hist = t.history(period=period, interval=interval, auto_adjust=False)
        points: List[dict] = []
        if not hist.empty:
            for ts, row in hist.iterrows():
                points.append({
                    "date": ts.isoformat(),
                    "open": float(row.get("Open", None)) if not (row.get("Open") is None) else None,
                    "high": float(row.get("High", None)) if not (row.get("High") is None) else None,
                    "low": float(row.get("Low", None)) if not (row.get("Low") is None) else None,
                    "close": float(row.get("Close", None)) if not (row.get("Close") is None) else None,
                    "volume": int(row.get("Volume", 0)) if not (row.get("Volume") is None) else 0,
                    "type": "historical",
                })
        # Real-time-ish last price
        last_price: Optional[float] = None
        try:
            fi = getattr(t, "fast_info", None)
            if fi is not None:
                last_price = float(fi.get("last_price", None)) if isinstance(fi, dict) else float(getattr(fi, "last_price", None))
        except Exception:
            last_price = None
        return {
            "symbol": symbol.upper(),
            "interval": interval,
            "period": period,
            "points": points,
            "last": last_price,
        }
    except Exception as e:
        return {"error": str(e)}
