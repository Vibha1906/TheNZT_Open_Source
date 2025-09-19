# Tools

The `src/ai/tools/` directory contains various specialized tools designed to interact with external services, perform data scraping, execute code, and generate visualizations. Each tool is implemented as a Langchain `BaseTool`, allowing it to be easily integrated into larger agent-based systems.

---

## `finance_data_tools.py`

This file provides a collection of tools for retrieving and processing financial data from different sources like Financial Modeling Prep (FMP), Yahoo Finance, and Screener.in, along with cryptocurrency exchange rate information.

### Tools:

* **`SearchCompanyInfoTool`**: Searches for financial instruments (stocks, ETFs, cryptocurrencies, forex) using company names or ticker symbols. It fetches data from FMP and Yahoo Finance.
* **`CompanyProfileTool`**: Retrieves company profile information for USA-based companies using their ticker symbols, primarily from FMP.
* **`GetStockData`**: Fetches real-time stock quotes and historical stock prices for companies. It can generate data for plotting stock price charts.
* **`CombinedFinancialStatementTool`**: Gathers balance sheets, cash flow statements, and income statements for companies in the U.S., India, and other regions, using FMP, Yahoo Finance, and Screener.in.
* **`CurrencyRateTool`**: Provides the latest currency exchange rates with USD as the base currency.
* **`StockPriceChangeTool`**: Retrieves stock price change percentages over various predefined periods for USA-based companies listed on NYSE and NASDAQ.
* **`GetCryptoDataTool`**: Fetches historical cryptocurrency data (open, high, low, close, volume, percent change) for specified ticker symbols and date ranges.

### Key Features:

* **Multi-source Data Fetching**: Integrates with multiple financial data providers to ensure robust data availability.
* **Historical and Real-time Data**: Supports both real-time market data and historical financial records.
* **Error Handling**: Includes mechanisms to catch and report errors during API calls or data scraping.
* **Concurrency**: Uses `ThreadPoolExecutor` for concurrent data fetching to improve performance.

---

## `web_search_tools.py`

This file offers advanced internet search capabilities, including retrieving search results, extracting content from webpages, and performing intelligent information extraction using language models.

### Tools:

* **`InternetSearchTool`**: A backup tool that performs general internet searches using Google Serper API and falls back to DuckDuckGo if Google fails. Returns search results with links, titles, and snippets.
* **`WebpageInfoTool`**: Extracts specified information from provided webpage URLs. This is a backup tool used when search methods are Google or DuckDuckGo.
* **`AdvancedInternetSearchTool`**: Conducts internet searches, retrieves raw content from webpages, cleans the text, and returns structured results including URL, title, and cleaned content. It uses Tavily Search, Google Serper API, and DuckDuckGo Search.

### Key Features:

* **Multi-engine Search**: Leverages multiple search APIs (Tavily, Google Serper, DuckDuckGo) for comprehensive results.
* **Content Extraction and Cleaning**: Extracts full page content and applies robust text cleaning techniques to remove noise and redundancies.
* **Smart Information Extraction**: Utilizes LLMs to extract specific information from long webpage content, summarizing relevant parts.
* **Concurrency**: Employs `ThreadPoolExecutor` to process multiple search queries or webpages concurrently.

---

## `graph_gen_tool.py`

This file contains a tool for generating visualization charts from numerical data provided in markdown table format, leveraging an LLM to interpret the data and structure it for plotting.

### Tools:

* **`GraphGenTool`**: Generates a visualization chart (bar, grouped bar, pie, or line chart) by taking a markdown table as input and returning formatted JSON data suitable for a charting library.

### Key Features:

* **Table Parsing**: Extracts markdown tables from text.
* **LLM-Powered Chart Generation**: Uses a Language Model to interpret table data and decide on the most appropriate chart type, labels, and titles.
* **Structured Output**: Generates a JSON output conforming to predefined Pydantic models for easy integration with charting frontends.
* **Error Handling**: Manages cases where charts cannot be generated or data is invalid.

---

## `social_media_tools.py`

This file provides tools to search and extract information from social media platforms like Twitter and Reddit.

### Tools:

* **`TwitterPostSearchTool`**: Searches for recent tweets based on input queries. It uses Tavily Search, filtering results to include only Twitter/X.com domains.
* **`RedditSearchTool`**: Searches for Reddit posts and provides a list of post titles and links.
* **`RedditPostTextTool`**: Extracts public comments and conversations from specified Reddit post URLs, including replies within comment threads.

### Key Features:

* **Social Media Specific Search**: Tailored search functionality for Twitter and Reddit.
* **Deep Content Extraction**: Can retrieve full post content and nested comments from Reddit.
* **Concurrency**: Uses `ThreadPoolExecutor` for efficient handling of multiple search queries.

---

## `internal_db_tools.py`

This file contains tools for interacting with an internal database, specifically for searching through user-uploaded documents stored in a Qdrant vector store.

### Tools:

* **`DatabaseSearchTool`**: (Placeholder/Stub) Intended for general internal database searches related to companies, industries, markets, or finance. Currently returns "No Information Found."
* **`SearchAuditDocumentsTool`**: Performs a similarity search on the `file_storage` Qdrant collection, filtering by provided document IDs. Returns relevant document snippets with content, filename, file ID, and confidence score.

### Key Features:

* **Vector Database Integration**: Connects to Qdrant for similarity searches on embedded documents.
* **Document Filtering**: Allows searching within specific user-uploaded documents using document IDs.
* **Relevance Scoring**: Provides confidence scores for search results.

---

## `finance_scraper_utils.py`

This file contains utility functions used by the `finance_data_tools.py` to scrape financial data from various websites like Yahoo Finance and Screener.in. It handles browser automation with Selenium and data parsing with BeautifulSoup and Pandas.

### Key Functions:

* **`setup_driver()`**: Initializes a Selenium Chrome WebDriver in headless mode for web scraping.
* **`load_page_with_expansion()`**: Loads a webpage and automatically clicks "expand all" buttons to reveal hidden content.
* **`contains_numeric_data()`**: Helper to check if a BeautifulSoup table contains any numeric data.
* **`_parse_human_readable_number()`**: Converts string representations of numbers (e.g., "1.23T", "500.5M") into floats or integers.
* **`_clean_and_convert()`**: Cleans and converts string values from web pages into numeric types, handling various formats and non-numeric entries.
* **`_parse_and_format_earnings_date()`**: Parses and formats earnings date strings into a standardized ISO format.
* **`convert_yf_to_json()`**: Converts Yahoo Finance historical data DataFrames to a JSON format.
* **`convert_fmp_to_json()`**: Converts Financial Modeling Prep historical data to a JSON format.
* **`fetch_yahoo_finance_cash_flow_sheet()`**: Scrapes cash flow statements from Yahoo Finance.
* **`fetch_yahoo_finance_balance_sheet()`**: Scrapes balance sheets from Yahoo Finance.
* **`fetch_yahoo_finance_income_statement()`**: Scrapes income statements from Yahoo Finance.
* **`fetch_yahoo_quote_data()`**: Scrapes real-time stock quote data from Yahoo Finance.
* **`scrape_yahoo_stock_history()`**: Retrieves historical stock price data from Yahoo Finance.
* **`get_historical_data_fmp()`**: Fetches historical stock data from the Financial Modeling Prep API.
* **`apply_frequency_filter_simple()`**: Applies frequency filtering (daily, weekly, monthly) to historical data.
* **`get_last_trading_day_of_week()`**: Helper for `apply_frequency_filter_simple` to get weekly data.
* **`get_last_trading_day_of_month()`**: Helper for `apply_frequency_filter_simple` to get monthly data.
* **`fetch_company_info()`**: Scrapes company lookup information from Yahoo Finance.
* **`fetch_screener_balance_sheet()`**: Scrapes balance sheets from Screener.in (primarily for Indian stocks).
* **`fetch_screener_cashflow_results()`**: Scrapes cash flow statements from Screener.in.
* **`fetch_screener_income_and_summary_results()`**: Scrapes income statements and summary data from Screener.in.

---

## `graph_gen_tool_system_prompt.py`

This file defines the system prompt used by the `graph_gen_tool.py` for guiding the LLM in generating structured data for charts. It outlines the LLM's role, task, and critical rules for data extraction and chart type determination.

### Content:

* **`SYSTEM_PROMPT_STRUCT_OUTPUT`**: A detailed prompt instructing the LLM to extract numerical data from markdown tables and format it according to specified Pydantic models for chart generation. It includes guidelines on chart types, axis labels, titles, and unit consistency.