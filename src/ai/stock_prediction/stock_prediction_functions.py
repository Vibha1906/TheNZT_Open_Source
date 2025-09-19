import logging
from langchain_community.chat_models import ChatLiteLLM
from pydantic import BaseModel, Field
import os
from datetime import date
import yfinance as yf
import time
import math
import json
from dotenv import load_dotenv
import warnings
import numpy as np
import pandas as pd
from dotenv import load_dotenv
from langchain_tavily import TavilySearch
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langgraph.prebuilt import create_react_agent
import src.backend.db.mongodb as mongodb

load_dotenv()

from statsmodels.tsa.statespace.sarimax import SARIMAX
from statsmodels.tools.sm_exceptions import ConvergenceWarning

# logging.basicConfig(
#     filename="statsmodels_warnings.log",
#     filemode="w",
#     level=logging.INFO,
#     format="%(asctime)s %(levelname)s %(message)s",
# )

# logging.captureWarnings(True)

warnings.simplefilter("default", ConvergenceWarning)


# class SentimentRatingOutputSchema(BaseModel):
#     """
#     Based on the given context give the sentiment rating and the reason fo the rating.
#     """
#     sentiment_rating: int = Field(ge=0, le=100, description="Give a sentiment rating from 0 (highly negative) to 100 (highly positive) for the specified company or market, based on the synthesis of news from the past 7 days, the company's historical financial and stock performance, and market reactions.")
#     reason_for_rating: str = Field(description="First, specify which company (give the full name) or market you are discussing. Then, provide a very specific reason for your rating supported by valid points and cite at least one crucial news item about it.")


# def get_sentiment_rating(name: str, exchange_symbol:str):
#     """
#     Give the name of the company/market and get the sentiment rating
#     """
#     # Initialize the Model
#     # llm = ChatLiteLLM(model="azure/gpt-4.1-mini")
#     llm = ChatLiteLLM(model="gemini/gemini-2.5-pro")

#     # Bind the Web Search Tool
#     # tool = {"type": "web_search_preview"}
#     # llm_with_tools = llm.bind_tools([tool])


#     # Give the result in the given structured form
#     # llm_tools_struct_op = llm_with_tools.with_structured_output(SentimentRatingOutputSchema)

#     # Testing
#     # prompt = f"You are a experienced financial news analyst. Based on the web search results, get the current public sentiment of '{name}', deduct the sentiment rating based on recent news, historical performance and their stock performance."

#     # response = llm_tools_struct_op.invoke(prompt)
#     # print(response)
#     if exchange_symbol.upper() == "CRYPTO":
#         SYSTEM_PROMPT = f"You are a experienced financial news analyst. Using the tavily search tool, get the current public sentiment of the crypto currency '{name}', deduct the sentiment rating based on recent news, historical performance and their crypto performance. Give a sentiment rating from 0 (highly negative) to 100 (highly positive) for the specified company."
#     else:
#         SYSTEM_PROMPT = f"You are a experienced financial news analyst. Using the tavily search tool, get the current public sentiment of the company '{name}', deduct the sentiment rating based on recent news, historical performance and their stock performance. Give a sentiment rating from 0 (highly negative) to 100 (highly positive) for the specified company."

#     tavily_search_tool = TavilySearch(
#         max_results=5,
#         topic="finance",
#     )

#     messages = [
#         SystemMessage(content=SYSTEM_PROMPT)
#     ]

#     agent = create_react_agent(llm, [tavily_search_tool], response_format=SentimentRatingOutputSchema)
#     response = agent.invoke(input={"messages": messages})
#     print("response = ", response)

#     sentiment_rating = response['structured_response'].sentiment_rating
#     print(f"sentiment_rating = {sentiment_rating}")

#     reason_for_rating = response['structured_response'].reason_for_rating
#     print(f"reason_for_rating = {reason_for_rating}")

#     return sentiment_rating, reason_for_rating

class SentimentRatingOutputSchema(BaseModel):
    """
    Static schema for sentiment rating output.
    """
    sentiment_rating: int = Field(
        ge=0, 
        le=100, 
        description="Fixed sentiment rating from 0 (highly negative) to 100 (highly positive)."
    )
    reason_for_rating: str = Field(
        description="Reason for the fixed sentiment rating."
    )


def get_sentiment_rating(name: str, exchange_symbol: str):
    """
    Return a fixed sentiment rating of 50 with a generic reason.
    """
    sentiment_rating = 50
    reason_for_rating = (
        f"The sentiment rating for '{name}' "
        f"(exchange: {exchange_symbol}) is set to a neutral baseline of 50. "
        f"This is a fixed value and does not rely on Tavily or LLM analysis."
    )

    print(f"sentiment_rating = {sentiment_rating}")
    print(f"reason_for_rating = {reason_for_rating}")

    return sentiment_rating, reason_for_rating




def load_ticker_data(file_path):
    with open(file=file_path, mode="r") as file:
        data = json.load(file)
    return data

def convert_raw_data_to_hist_format(raw_data):
    """
    Convert raw_data list of dictionaries to pandas DataFrame matching hist format

    Args:
        raw_data: List of dictionaries with stock data

    Returns:
        pandas.DataFrame: DataFrame with same structure as hist
    """
    converted_data = []

    for item in raw_data:
        date = pd.to_datetime(item['date'])

        row = {
            'Date': date,
            'Open': item['open'],
            'High': item['high'],
            'Low': item['low'],
            'Close': item['close'],
            'Volume': item['volume'],
            'Dividends': 0.0,
            'Stock Splits': 0.0
        }

        converted_data.append(row)

    df = pd.DataFrame(converted_data)
    df.set_index('Date', inplace=True)
    df.sort_index(inplace=True)

    return df

# Get Stock Price
# def get_stock_history(ticker, rating, reason):
#     """Fetch stock history and return structured data instead of writing to a file."""
#     try:
#         start_date = "2000-01-01"
#         end_date = date.today().strftime("%Y-%m-%d")

#         historical_data = mongodb.get_or_update_historical(ticker, "max")
#         if 'historical' in historical_data and historical_data['historical']:
#             raw_data = historical_data['historical']
#             hist = convert_raw_data_to_hist_format(raw_data)
#         else:
#             stock = yf.Ticker(ticker)
#             hist = stock.history(start=start_date, end=end_date)

#         print(f"Rating: {rating} | Reason: {reason}")
#         print(f"hist = {hist}")

#         temp_data = {
#             "symbol": ticker,
#             "current_rating": rating,
#             "reason": reason,
#             "rating_date": date.today().strftime("%Y-%m-%d"),
#             "historical": [
#                 {
#                     "date": date.strftime("%Y-%m-%d"),
#                     "close": round(close_price, 3)
#                 }
#                 for date, close_price in hist['Close'].items()
#                 if close_price is not None and not math.isnan(close_price)
#             ]
#         }

#         return temp_data  # ✅ No file saved, just return structured dict

#     except Exception as e:
#         print(f"Error fetching data for {ticker}: {str(e)}")
#         return None

def get_stock_history(ticker, rating, reason):
    """Fetch stock history using MongoDB/FMP first, then fallback to yfinance if needed. Returns structured dict."""
    try:
        start_date = "2000-01-01"
        end_date = date.today().strftime("%Y-%m-%d")

        hist = None

        # --- Try MongoDB/FMP first ---
        try:
            historical_data = mongodb.get_or_update_historical(ticker, "max")

            if 'historical' in historical_data and historical_data['historical']:
                raw_data = historical_data['historical']
                hist = convert_raw_data_to_hist_format(raw_data)
                print(f"✅ Got historical data for {ticker} from MongoDB/FMP")
        except Exception as fmp_err:
            print(f"[WARN] MongoDB/FMP fetch failed for {ticker}: {fmp_err}")

        # --- Fallback to yfinance if MongoDB/FMP failed or returned nothing ---
        if hist is None or hist.empty:
            print(f"[INFO] Falling back to yfinance for {ticker}")
            stock = yf.Ticker(ticker)
            hist = stock.history(start=start_date, end=end_date)

            if hist.empty:
                raise Exception("Both FMP and yfinance failed to fetch data")

        # --- Construct structured dict output ---
        print(f"Rating: {rating} | Reason: {reason}")
        temp_data = {
            "symbol": ticker,
            "current_rating": rating,
            "reason": reason,
            "rating_date": date.today().strftime("%Y-%m-%d"),
            "historical": [
                {
                    "date": d.strftime("%Y-%m-%d"),
                    "close": round(close_price, 3)
                }
                for d, close_price in hist['Close'].items()
                if close_price is not None and not math.isnan(close_price)
            ]
        }

        return temp_data  # ✅ structured response

    except Exception as e:
        print(f"[ERROR] Fetching data for {ticker} failed: {str(e)}")
        return None
        

def get_rating_stock_price(ticker_data): 
    for entry in ticker_data:
        # Get sentiment
        rating, reason = get_sentiment_rating(name=entry["company"])
        print(f"\nRating: {rating} | Reason: {reason}\n")

        # Get historical data and save both sentiment and historical data
        file_path = get_stock_history(company=entry["company"], ticker=entry["ticker"], rating=rating, reason=reason)

        if file_path:
            saved_file_path = file_path
    
    # Return the file path of the saved data
    return saved_file_path



def get_continuous_recent_data_monthly(df: pd.DataFrame) -> pd.DataFrame:
    """
    Filters the DataFrame to return only the most recent continuous monthly data.

    It starts from the latest date and finds the most recent continuous stretch
    of months (no missing months) and returns data from that point forward.
    """
    if "close" not in df.columns:
        raise ValueError("Expected 'close' column in input DataFrame")

    df = df.copy()
    df.index = pd.to_datetime(df.index)
    df = df.sort_index()

    latest_date = df.index.max()
    min_date = df.index.min()

    # Generate list of months with data as (year, month)
    df["year_month"] = df.index.to_period("M")
    year_months_with_data = set(df["year_month"].unique())

    # Start from latest and go backwards checking for missing months
    current = latest_date.to_period("M")
    continuous_months = []

    while current >= min_date.to_period("M"):
        if current in year_months_with_data:
            continuous_months.append(current)
            current -= 1
        else:
            break  # Found a gap

    if not continuous_months:
        raise ValueError("No continuous monthly data found.")

    start_period = min(continuous_months)
    start_date = start_period.to_timestamp()

    # Drop helper column
    df.drop(columns=["year_month"], inplace=True)

    return df.loc[df.index >= start_date]


def adjust_values_quad(
    sentiment_percent: float, max_val: float, avg_val: float, min_val: float
):
    """
    Adjusts max, average, and min values based on sentiment percentage using a quadratic model.

    Parameters:
    - sentiment_percent (float): Sentiment as a percentage (0 to 100)
    - max_val (float): Original maximum value
    - avg_val (float): Original average value
    - min_val (float): Original minimum value

    Returns:
    - tuple: (adjusted_max, adjusted_avg, adjusted_min)
    """
    # Compute direction: positive if above 50%, negative if below
    direction = 1 if sentiment_percent >= 50 else -1

    # Compute quadratic factor: small near 50, grows towards 0 or 100
    distance = abs(sentiment_percent - 50) / 50  # in range [0,1]
    f = direction * (distance**2)  # quadratic scaling

    # Apply nonlinear adjustment based on f
    adj_max = max_val + f * (max_val - avg_val)
    adj_avg = avg_val + f * (max_val - min_val) * 0.5
    adj_min = min_val + f * (avg_val - min_val)

    # Clip values to be non-negative
    adj_max = max(0, adj_max)
    adj_avg = max(0, adj_avg)
    adj_min = max(0, adj_min)

    return round(adj_max, 4), round(adj_avg, 4), round(adj_min, 4)


# def sarimax_predict(input_file_path, forecast_steps=5):
#     """Forecast future stock prices using a SARIMAX model adjusted by sentiment.

#     This function reads historical stock prices and a sentiment rating from a JSON file,
#     fits a SARIMAX(1,1,1)(1,1,1,5) model to business-day-frequency closing prices,
#     injects realistic noise based on recent volatility, adjusts the forecast by
#     the provided sentiment percentage, and returns both the mean forecast and
#     confidence intervals.

#     Args:
#         input_file_path (str): Path to a JSON file containing:
#             - historical: List of records, each with:
#                 - date (str, ISO format)
#                 - close (float)
#             - current_rating (float): Sentiment score (0-100). 0 means highly negative and 100 means highly positive.
#             - symbol (str): Stock ticker.
#             - company (str): Company name.
#         forecast_steps (int, optional): Number of business days to forecast beyond
#             the last historical date. Defaults to 25.

#     Returns:
#         tuple[pd.Series, pd.DataFrame]:
#             A tuple containing:
#             - adjusted_mean_series (pd.Series): Forecasted closing prices,
#               indexed by forecast dates.
#             - adjusted_ci_df (pd.DataFrame): Confidence interval bounds with columns:
#                 - lower: Lower bound of the interval.
#                 - upper: Upper bound of the interval.

#     Raises:
#         FileNotFoundError: If `input_file_path` does not exist.
#         ValueError: If the JSON is missing required keys or contains insufficient data.
#     """

#     with open(input_file_path, "r") as file:
#         data = json.load(file)

#     if not os.path.exists(input_file_path):
#         raise FileNotFoundError(
#             f"Could not find {input_file_path}. Place it in your working directory."
#         )

#     sentiment_percent = data["current_rating"]
#     symbol = data["symbol"]
#     company = data["company"]
#     print(f"Symbol = {symbol} | Company = {company}")

#     # Normalize into a DataFrame
#     df = pd.json_normalize(data, record_path="historical")
#     df["date"] = pd.to_datetime(df["date"])
#     df.sort_values("date", inplace=True)
#     df.set_index("date", inplace=True)

#     # logging.info("DF prepared from file.")

#     df = df.tail(120) # Take only last 120 datapoints for training
#     # logging.info(f"df.shape after selecting last 120 elements = {df.shape}")
#     df = get_continuous_recent_data_monthly(df)
#     # logging.info(f"df.shape get_continuous_recent_data_monthly  = {df.shape}")
#     close_prices = df["close"].dropna()
#     close_prices.index = pd.to_datetime(close_prices.index)
#     close_prices = close_prices.asfreq("B")  # Business day frequency
#     close_prices = close_prices.ffill()

#     # logging.info(f"df  = \n{df}")
#     # logging.info(f"Start date of training data: {df.index[0]}")

#     # relative normalization
#     multiplier = 10

#     # logging.info(f"multiplier = {multiplier}")
#     close_prices_scaled = close_prices * multiplier

#     # Try fitting SARIMAX model
#     model = SARIMAX(
#         close_prices_scaled,
#         order=(1, 1, 1),
#         seasonal_order=(1, 1, 1, 5),
#         enforce_stationarity=False,
#         enforce_invertibility=False,
#     )
#     results = model.fit(disp=False)
#     forecast = results.get_forecast(steps=forecast_steps)
#     forecast_mean = forecast.predicted_mean
#     confidence_percentage = 0.05
#     conf_int = forecast.conf_int(alpha=confidence_percentage)

#     # Adjust all values using sentiment
#     adjusted_mean = []
#     adjusted_lower = []
#     adjusted_upper = []

#     for i in range(len(forecast_mean)):
#         avg = forecast_mean.iloc[i]
#         min_val = conf_int.iloc[i, 0]
#         max_val = conf_int.iloc[i, 1]

#         adj_max, adj_avg, adj_min = adjust_values_quad(
#             sentiment_percent, max_val, avg, min_val
#         )

#         adjusted_mean.append(adj_avg)
#         adjusted_lower.append(adj_min)
#         adjusted_upper.append(adj_max)

#     adjusted_mean = np.array(adjusted_mean) / multiplier
#     adjusted_lower = np.array(adjusted_lower) / multiplier
#     adjusted_upper = np.array(adjusted_upper) / multiplier

#     # Create adjusted Series/DataFrames
#     adjusted_mean_series = pd.Series(adjusted_mean, index=forecast_mean.index)
#     adjusted_ci_df = pd.DataFrame(
#         {"lower": adjusted_lower, "upper": adjusted_upper}, index=forecast_mean.index
#     )

#     # logging.info(
#     #     f"Predicted value: {adjusted_mean_series.iloc[-1]} for {forecast_mean.index[-1]}"
#     # )
#     print(f"adjusted_mean_series = \n{adjusted_mean_series}")
#     print(f"adjusted_ci_df = \n{adjusted_ci_df}")

#     return adjusted_mean_series, adjusted_ci_df 

def sarimax_predict(history_data, exchange_symbol, forecast_steps=5):
    """Forecast future stock/crypto prices using SARIMAX, adjusted by sentiment."""

    if not history_data:
        raise ValueError("No historical data provided")

    sentiment_percent = history_data["current_rating"]
    symbol = history_data["symbol"]

    print(f"Symbol = {symbol} | Sentiment Rating = {sentiment_percent}")

    # Normalize into DataFrame
    df = pd.DataFrame(history_data["historical"])
    df["date"] = pd.to_datetime(df["date"])
    df.set_index("date", inplace=True)
    df.sort_index(inplace=True)

    df = df.tail(120)
    df = get_continuous_recent_data_monthly(df)

    close_prices = df["close"].dropna()
    close_prices.index = pd.to_datetime(close_prices.index)

    # Crypto = daily frequency; else = business day
    if exchange_symbol.upper() == "CRYPTO":
        close_prices = close_prices.asfreq("D")
    else:
        close_prices = close_prices.asfreq("B")

    close_prices = close_prices.ffill()

    multiplier = 10
    close_prices_scaled = close_prices * multiplier

    model = SARIMAX(
        close_prices_scaled,
        order=(1, 1, 1),
        seasonal_order=(1, 1, 1, 5),
        enforce_stationarity=False,
        enforce_invertibility=False,
    )

    results = model.fit(disp=False)
    forecast = results.get_forecast(steps=forecast_steps)
    forecast_mean = forecast.predicted_mean
    conf_int = forecast.conf_int(alpha=0.05)

    # Adjust using sentiment
    adjusted_mean = []
    adjusted_lower = []
    adjusted_upper = []

    for i in range(len(forecast_mean)):
        avg = forecast_mean.iloc[i]
        min_val = conf_int.iloc[i, 0]
        max_val = conf_int.iloc[i, 1]

        adj_max, adj_avg, adj_min = adjust_values_quad(
            sentiment_percent, max_val, avg, min_val
        )

        adjusted_mean.append(adj_avg)
        adjusted_lower.append(adj_min)
        adjusted_upper.append(adj_max)

    adjusted_mean = np.array(adjusted_mean) / multiplier
    adjusted_lower = np.array(adjusted_lower) / multiplier
    adjusted_upper = np.array(adjusted_upper) / multiplier

    adjusted_mean_series = pd.Series(adjusted_mean, index=forecast_mean.index)
    adjusted_ci_df = pd.DataFrame(
        {"lower": adjusted_lower, "upper": adjusted_upper}, index=forecast_mean.index
    )

    # Optional fallback logic for extreme predictions
    if (adjusted_mean_series[-1] == 0) or (adjusted_upper[-1] == 0) or (adjusted_upper[-1] > 5 * close_prices[-1]) or (adjusted_upper[-3] > 4 * close_prices[-3]) or (adjusted_upper[-2] > 4 * close_prices[-2]):
        print("\n==== Prediction too large or invalid — switching to fallback model ====\n")

        fallback_model = SARIMAX(
            close_prices_scaled,
            order=(1, 1, 1),
            seasonal_order=(0, 0, 0, 0),
            enforce_stationarity=False,
            enforce_invertibility=False,
        )

        fallback_results = fallback_model.fit(disp=False)
        forecast = fallback_results.get_forecast(steps=forecast_steps)
        forecast_mean = forecast.predicted_mean
        conf_int = forecast.conf_int(alpha=0.05)

        adjusted_mean = forecast_mean / multiplier
        adjusted_lower = conf_int.iloc[:, 0] / multiplier
        adjusted_upper = conf_int.iloc[:, 1] / multiplier

        adjusted_mean_series = pd.Series(adjusted_mean, index=forecast_mean.index)
        adjusted_ci_df = pd.DataFrame(
            {"lower": adjusted_lower, "upper": adjusted_upper}, index=forecast_mean.index
        )

    print("adjusted_mean_series:\n", adjusted_mean_series)
    print("adjusted_ci_df:\n", adjusted_ci_df)

    return adjusted_mean_series, adjusted_ci_df
