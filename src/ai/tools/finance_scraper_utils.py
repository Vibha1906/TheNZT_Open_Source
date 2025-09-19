import os
import re
import requests
from datetime import datetime, timedelta, timezone
from collections import defaultdict

fmp_api_key = os.environ.get("FM_API_KEY")


def contains_numeric_data(table) -> bool:
    """Checks if a table contains numeric data."""
    for cell in table.find_all(['td', 'th']):
        if re.search(r'\d+', cell.get_text()):
            return True
    return False

def convert_yf_to_json(df, ticker):
    result = []
    for date, row in df.iterrows():
        formatted_date = date.strftime("%b %d, %Y")
        row_dict = {
            "date": formatted_date,
            "open": f"{row[('Open', ticker)]:.2f}",
            "high": f"{row[('High', ticker)]:.2f}",
            "low": f"{row[('Low', ticker)]:.2f}",
            "close": f"{row[('Close', ticker)]:.2f}",
            "volume": f"{int(row[('Volume', ticker)]):,}"
        }
        result.append(row_dict)
    result = sorted(result, key=lambda x: datetime.strptime(x["date"], "%b %d, %Y"))
    return result


def convert_fmp_to_json(fmp_data, ticker):
    """
    Convert FMP API response to the same JSON format as the original code.
    Returns data in chronological order (oldest to newest).
    
    Args:
        fmp_data: List of historical data from FMP API
        ticker: Stock symbol
    """
    result = []
    for item in fmp_data:
        # Parse the date from FMP format (YYYY-MM-DD)
        date_obj = datetime.strptime(item['date'], "%Y-%m-%d")
        formatted_date = date_obj.strftime("%b %d, %Y")
        
        row_dict = {
            "date": formatted_date,
            "open": f"{float(item['open']):.2f}",
            "high": f"{float(item['high']):.2f}",
            "low": f"{float(item['low']):.2f}",
            "close": f"{float(item['close']):.2f}",
            "volume": f"{int(float(item['volume'])):,}"
        }
        result.append(row_dict)
    
    # Sort by date (oldest to newest) to match original behavior
    result = sorted(result, key=lambda x: datetime.strptime(x["date"], "%b %d, %Y"))
    return result


def get_historical_data_fmp(ticker: str, period: str):
    """
    Retrieve historical data for a given ticker from Financial Modeling Prep API.
    Uses simple datetime grouping since FMP data already excludes non-trading days.
    
    Args:
        ticker: Stock symbol (e.g., "AAPL")
        period: Time period ("1mo", "3mo", "6mo", "ytd", "1y", "5y", "max")
        api_key: Your FMP API key
    """
    try:
        frequency = "1d"
        today = datetime.now(timezone.utc)

        # Date calculations - matching exact logic from original
        if period == "1mo":
            start_date = today - timedelta(days=31)
            frequency = "1d"
        elif period == "3mo":
            start_date = today - timedelta(days=93)
            frequency = "1d"
        elif period == "6mo":
            start_date = today - timedelta(days=186)
            frequency = "1wk"
        elif period == "ytd":
            start_date = datetime(today.year, 1, 1, tzinfo=timezone.utc)
            if today - datetime(today.year, 1, 1, tzinfo=timezone.utc) > timedelta(days=92):
                frequency = "1wk"
            else:
                frequency = "1d"
        elif period == "1y":
            start_date = today - timedelta(days=365)
            frequency = "1wk"
        elif period == "5y":
            start_date = today - timedelta(days=1825)
            frequency = "1mo"
        elif period == "max":
            start_date = today - timedelta(days=7300)
            frequency = "1mo"
        else:
            # Default case
            start_date = today - timedelta(days=30)
            frequency = "1d"

        # Format dates for FMP API
        from_date = start_date.strftime("%Y-%m-%d")
        to_date = today.strftime("%Y-%m-%d")
        
        # FMP API endpoint
        # base_url = "https://financialmodelingprep.com/api/v3/historical-price-full"
        # url = f"{base_url}/{ticker}?from={from_date}&to={to_date}&apikey={fmp_api_key}"
        base_url = "https://financialmodelingprep.com/stable/historical-price-eod/full"
        url = f"{base_url}?symbol={ticker}&from={from_date}&to={to_date}&apikey={fmp_api_key}"

        print(f"Fetching data from FMP API: {url}")
        print(f"Period: {period}, Frequency: {frequency}")
        
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        if 'historical' in data and data['historical']:
            raw_data = data['historical']
            
            # Convert to our JSON format first
            formatted_data = convert_fmp_to_json(raw_data, ticker)
            
            # Apply frequency filtering using simple datetime grouping
            filtered_data = apply_frequency_filter_simple(formatted_data, frequency)
            
            if filtered_data:
                return filtered_data
            else:
                raise RuntimeError("No data available after filtering")
        else:
            raise RuntimeError("No historical data found from FMP API")
            
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from FMP API: {e}")
        raise e
    except Exception as e:
        print(f"Error in fetching historical data for {ticker}: {e}")
        raise e

def apply_frequency_filter_simple(data, frequency):
    """
    Apply frequency filtering using simple datetime grouping.
    Since FMP data already excludes weekends/holidays, we just group and take last of each period.
    
    Args:
        data: List of formatted data with 'date' in "MMM DD, YYYY" format
        frequency: "1d", "1wk", or "1mo"
    """
    if frequency == "1d":
        return data
    elif frequency == "1wk":
        return get_last_trading_day_of_week(data)
    elif frequency == "1mo":
        return get_last_trading_day_of_month(data)
    else:
        return data

def get_last_trading_day_of_week(data):
    """
    Group data by week and return the last trading day of each week.
    Uses ISO week calendar (Monday-Sunday weeks).
    
    Args:
        data: List of data with 'date' in "MMM DD, YYYY" format
    """
    if not data:
        return []
    
    # Group by week
    weekly_groups = defaultdict(list)
    for item in data:
        date_obj = datetime.strptime(item['date'], "%b %d, %Y")
        # Get ISO week (year, week_number)
        iso_year, iso_week, _ = date_obj.isocalendar()
        week_key = f"{iso_year}-W{iso_week:02d}"
        weekly_groups[week_key].append((date_obj, item))
    
    # Get the last trading day from each week
    result = []
    for week_key in sorted(weekly_groups.keys()):
        week_data = weekly_groups[week_key]
        # Sort by date and take the last one (most recent in the week)
        week_data.sort(key=lambda x: x[0])
        last_trading_day = week_data[-1][1]  # Get the data item
        result.append(last_trading_day)
    
    return result

def get_last_trading_day_of_month(data):
    """
    Group data by month and return the last trading day of each month.
    
    Args:
        data: List of data with 'date' in "MMM DD, YYYY" format
    """
    if not data:
        return []
    
    # Group by month
    monthly_groups = defaultdict(list)
    for item in data:
        date_obj = datetime.strptime(item['date'], "%b %d, %Y")
        # Get year-month key
        month_key = f"{date_obj.year}-{date_obj.month:02d}"
        monthly_groups[month_key].append((date_obj, item))
    
    # Get the last trading day from each month
    result = []
    for month_key in sorted(monthly_groups.keys()):
        month_data = monthly_groups[month_key]
        # Sort by date and take the last one (most recent in the month)
        month_data.sort(key=lambda x: x[0])
        last_trading_day = month_data[-1][1]  # Get the data item
        result.append(last_trading_day)
    
    return result