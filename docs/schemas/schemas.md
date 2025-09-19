# Schemas

This document provides a overview of the `src/ai/ai_schemas/` folder, explaining the purpose and functionality of the provided Python files: `graph_states.py`, `tool_structured_input.py`, `structured_responses.py`, and `validation_utils.py`. These files are part of a system designed to handle user queries, particularly in the finance and business domains, using structured data models and tools for tasks like web searches, financial data retrieval, and user authentication. Below is a detailed explanation of each file, its purpose, and how it fits into the project.

---

## File Descriptions

### 1. `graph_states.py`

**Purpose**: Defines the state structure for the InsightAgent system using a `TypedDict` to manage the state of an agent's workflow.

**Key Components**:
- **InsightAgentState**: A `TypedDict` that holds the state of the agent, including:
  - `messages`: A sequence of messages (using `langchain_core.messages.BaseMessage`) to track user-agent interactions.
  - `manager_instructions`: Instructions for the agent manager.
  - `previous_messages`: A list of past messages for context.
  - `realtime_info`: A boolean indicating if real-time data is needed.
  - `currency_rates`: Stores currency exchange rates as a string.
  - `file_path` and `file_content`: Optional fields for handling file-based inputs.
  - `user_query`: The user's input query.
  - `query_tag`: Tags to categorize the query.
  - `is_relevant_query`: A boolean to check query relevance.
  - `required_information` and `initial_info`: Fields for information needed to process the query.
  - `reasoning`: A boolean to enable reasoning mode.
  - `subtasks`, `task_list`, `current_task`: Fields for task management.
  - `final_response`: The agent's final response to the user.
  - `validation_result`: Stores validation feedback.
  - `feedback_cycle`: Tracks feedback iterations.
  - `human_intervention`: Optional field for human input.
  - `user_metadata`: Stores user-related metadata.
  - `research_plan`: A dictionary for the research plan.
  - `doc_ids`: A list of document IDs for reference.
  - `formatted_user_query`: A reformatted version of the user query.

**Usage**: This file is used to maintain the state of the agent throughout the query processing lifecycle, ensuring all relevant data is accessible and organized.

---

### 2. `tool_structured_input.py`

**Purpose**: Defines Pydantic models for structuring inputs to various tools used by the InsightAgent, such as web searches, financial data retrieval, and social media analysis.

**Key Components**:
- **Web Search Tools**:
  - `WebSearchSchema`: For Google-like search queries (up to four queries) with an explanation.
  - `WebScrapeSchema`: Specifies a URL and information to extract from a webpage.
  - `WebPageInfoSchema`: Combines multiple `WebScrapeSchema` entries for batch processing.
  - `TavilyToolSchema`: For finance/market-related searches with time range options.
- **Finance Data Tools**:
  - `SearchCompanyInfoSchema`: For searching company information using ticker symbols or names.
  - `CompanySymbolSchema`: For specifying a single company ticker symbol.
  - `CurrencyExchangeRateSchema`: For retrieving exchange rates for a list of currencies.
  - `TickerSchema`: Combines a ticker symbol with its stock exchange.
  - `StockDataSchema`: For requesting stock data for multiple tickers.
  - `CombinedFinancialStatementSchema`: For retrieving financial statements (balance sheet, cash flow, income statement) with options for period and format.
- **Code Execution Tool**:
  - `CodeExecutionToolInput`: For executing Python code with an explanation.
- **Internal Database Search**:
  - `DatabaseSearchSchema`: For querying an internal database.
- **Social Media Tools**:
  - `RedditPostTextSchema`: For extracting text from Reddit posts and comments.
  - `RedditSearchSchema`: For searching Reddit with sorting and limit options.
  - `TwitterSearchSchema`: For searching Twitter with up to three queries.
- **Geocoding Tool**:
  - `GeocodeInput`: For converting place names or addresses to coordinates.

**Usage**: These models ensure that tool inputs are validated and structured, making it easier to integrate with external APIs or internal systems.

---

### 3. `structured_responses.py`

**Purpose**: Defines Pydantic models for structuring agent responses, including intent detection, task planning, and visualization data.

**Key Components**:
- **IntentDetection**: Analyzes user query intent, with fields to reject nonsensical queries, categorize queries, and provide a response to the user.
- **DBSearchOutput**: Stores results from internal database searches.
- **Subtasks** and **PlannerAgentOutput**: Define and manage subtasks for the planner agent.
- **TaskDetail** and **ExecutorAgentOutput**: Structure tasks for the executor agent.
- **ValidationFeedback**: Provides feedback on response validity.
- **RelatedQueries**: Suggests related finance/business queries.
- **HexagonLayerDateData** and **SingleLayerResponse**: For geospatial visualization data, including coordinates, timestamps, and numerical data.

**Usage**: These models ensure that agent outputs are structured and consistent, supporting tasks like query analysis, task execution, and data visualization.

---

### 4. `validation_utils.py`

**Purpose**: Provides utility functions for validating user inputs, specifically password strength.

**Key Components**:
- **validate_password_strength**: A function that checks if a password meets criteria:
  - At least 8 characters long.
  - No spaces.
  - Contains at least one lowercase letter, uppercase letter, number, and special character.

**Usage**: Used in `app_io.py` to validate passwords during registration, login, and password reset.
