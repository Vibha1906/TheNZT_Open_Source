# Agent Prompts

This directory contains the core system prompts and associated Python files that define the behavior and capabilities of various specialized AI agents within the iAI Solution financial analysis system. Each Python file represents a distinct agent, and the `SYSTEM_PROMPT`s within it dictate its role, workflow, and interactions.

## Contents:

### `social_media_agent.py`

This agent is a **Social Media data assistant** primarily specialized in Reddit content extraction, with capabilities extended to Twitter (now X.com).

**Key Responsibilities:**
* **Reddit Content Extraction:** Searches Reddit for posts and extracts conversations.
* **Twitter Search:** Searches X.com for posts matching input queries.
* **Financial Research:** Analyzes public conversations and opinions on social media for financial research.

**Available Tools:**
* `reddit_post_search_tool`: Generates search queries to retrieve Reddit post titles and links.
* `get_reddit_post_text_tool`: Extracts public comments and conversations from Reddit posts.
* `search_twitter`: Searches X.com to retrieve posts.

**Workflow Highlights:**
* Understands the task and identifies relevant search queries.
* Performs social media searches using both Twitter and Reddit tools.
* Analyzes search results for relevance, prioritizing meaningful discussions.
* (Optional for Reddit) Extracts post and comment content for deeper insights.
* **Mandatory Entity Verification:** Verifies named entities (companies, persons, products, events, places) before tool use. If an entity seems fictional, unverified, or ambiguously spelled, it will politely request clarification instead of proceeding with search.

**Important Guidelines/Constraints:**
* Prioritizes relevance and high-engagement posts.
* Avoids redundant queries.
* Maintains a neutral, journalistic tone with an engaging narrative flow.
* Uses inline citations (e.g., `[Reddit](URL)`, `[X.com](URL)`) for all facts and details.
* Provides locations mentioned in posts.
* Does not fabricate content or paraphrase discussions that do not exist for fictional entities.

### `intent_detector.py`

This agent, named **Insight Agent**, functions as the primary query intake and refinement point. It interprets user queries, understands their intent, and either responds directly for specific cases or prepares queries for specialized agents. It is multi-lingual.

**Key Responsibilities:**
* **Query Interpretation & Reformatting:** Analyzes user queries to understand intent and rephrases them from a financial, business, economics, or investment perspective if not already.
* **Direct Responses:** Handles specific requests like translations, currency conversions, greetings, casual chat, or repeated queries directly.
* **Query Rejection:** Identifies and politely rejects gibberish, offensive content, or queries explicitly unrelated to finance after attempting to reframe them.
* **Entity Verification & Redirection:** For queries mentioning locations, public persons, companies, or cryptocurrencies without additional context, it reformats the query to request a detailed economic/financial analysis and passes it to downstream agents.
* **Handles One-Word Responses:** Manages "yes," "no," and similar short phrases based on previous conversational context.

**Workflow Highlights:**
* Evaluates `Latest User Query` for duplication against `Q&A Context`.
* Directly handles requests for translation, currency conversion, definitions, and reformatting of previous responses.
* Engages in conversational replies for greetings and queries about itself.
* For non-financial queries, it acknowledges the topic and suggests a related finance/business question.
* For specific entities (country, person, company, crypto) mentioned without context, it generates a formatted query for detailed financial analysis.

**Important Guidelines/Constraints:**
* Communicates with clarity, professionalism, and empathy.
* Always responds in the language of the user's query.
* Does **not** provide financial advice, analysis, market predictions, or recommendations directly (except for direct response scenarios).
* Prioritizes safety: Handles offensive content kindly but firmly.
* **Crucial for Translations:** MUST provide complete translated content in `response_to_user` and set `query_intent = "translation"`.
* **Critical for Duplicates:** Acknowledges repetition, summarizes previous response, and asks for updated intent.

### `__init__.py`

This file is typically used to mark a directory as a Python package. In the context of agent prompts, it might serve as an initializer or a placeholder. (The provided content is empty, so its functional purpose in this specific context is not detailed beyond standard Python package initialization.)

### `manager_agent.py`

This agent acts as a **Senior Financial Analysis Team Leader**, orchestrating various specialized agents to respond to user queries from a financial or business perspective.

**Key Responsibilities:**
* **Task Assignment:** Assigns tasks to specialized agents sequentially based on user query requirements.
* **Information Review:** Checks agent responses and determines when sufficient information is gathered.
* **Workflow Orchestration:** Manages the flow of tasks to ensure a comprehensive answer.

**Agents Under Command:**
* **DB Search Agent:** Searches uploaded audit documents and internal knowledge base. **(Conditional: Only if `doc_ids` are provided; used exactly once per query for comprehensive search.)**
* **Web Search Agent:** Gathers reliable internet information.
* **Social Media Scrape Agent:** Analyzes public discussions/opinions (secondary source to Web Search).
* **Finance Data Agent:** Retrieves real-time/historical stock data, company profiles, financial statements.
* **Sentiment Analysis Agent:** Evaluates market sentiment from text/data.
* **Data Comparison Agent:** Performs qualitative financial analysis and comparisons.
* **Response Generator Agent:** Synthesizes information into the final answer. **(Always the final task.)**

**Guidelines:**
* Employs logical reasoning, step-by-step decision-making.
* Provides clear reasoning within `<think>…</think>` tags.
* Assigns **only ONE task at a time**.
* Ensures `agent_task`, `instructions`, and `expected_output` are self-contained and align with the `Latest User Query`.
* Prioritizes financial context; always assigns a task to the `Finance Data Agent` for relevant company stock prices.
* Instructs agents to use tables for comparisons/time-based data.
* **Critical DB Search Rule:** The `DB Search Agent` can be used **exactly once per query** and must consolidate all document-related needs into a single comprehensive task if `doc_ids` exist.

### `finance_data_agent.py`

This agent is a **Finance Research Assistant** responsible for gathering various types of financial information for a given company or financial instrument.

**Key Responsibilities:**
* **Entity Verification:** Verifies the existence of companies, persons, ticker symbols, financial products, or institutions before any tool calls. If an entity is not found or is fictional, it refuses to proceed and requests clarification.
* **Ticker Symbol Retrieval:** Uses `search_company_info` to get exact ticker symbols and registered stock exchanges.
* **Stock Data Retrieval:** Uses `get_stock_data` to obtain real-time and historical stock prices, and to generate stock charts.
* **Financial Statements:** Retrieves balance sheets, income statements, or cash flow statements using `get_financial_statements`.
* **Crypto Data:** Fetches historical cryptocurrency data using `get_crypto_data_tool`.
* **Fallback Search:** Uses `advanced_internet_search` if primary tools yield no results.

**Available Tools:**
* `search_company_info`: Searches for financial instruments (cryptos, forex, stocks, ETFs) by name or ticker.
* `get_stock_data`: Gets real-time and historical stock quotes/prices; generates stock price charts.
* `get_financial_statements`: Retrieves financial statements (balance sheet, cash flow, income statement).
* `get_crypto_data_tool`: Gets historical cryptocurrency data (open, high, low, close, volume, % change).
* `advanced_internet_search`: Performs general internet searches and extracts webpage content.

**Workflow Highlights:**
* Always starts with `search_company_info` for verification and ticker lookup.
* Uses appropriate ticker formats (e.g., `AAPL` for NYSE/NASDAQ, `TATAMOTORS.BO` for others).
* Generates stock charts for public companies.
* Calls `get_financial_statements` specifically for financial statement queries.
* Calls `get_crypto_data_tool` for crypto-related queries.
* Resorts to `advanced_internet_search` only if direct financial tools fail.

**Important Guidelines/Constraints:**
* Never proceeds with tools for unverifiable or fictional entities.
* Does not fabricate data or interpret imagined performance.
* Always cites every fact or figure immediately after the statement using `[DOMAIN_NAME](URL)` format.
* Clearly distinguishes between speculative logic and real data in hypothetical scenarios.

### `data_comparison_agent.py`

This agent is a **Senior Finance Analyst** capable of evaluating and comparing financial or market data.

**Key Responsibilities:**
* Analyzes, compares, and evaluates collected financial data based on user instructions.
* Handles various comparison types: Year-over-year (YoY), industry benchmarks, trend analysis, ratio analysis, competitor comparisons, growth rate calculations, and risk assessment.

**Guidelines:**
* Ensures responses are concise, data-supported, and cited.
* Receives data in various formats (statements, ratios, KPIs).
* Maintains a neutral, journalistic tone suitable for a professional audience.
* Highlights key data using markdown (bold, italics, tables).
* Uses inline citations (`[DOMAIN_NAME](URL)`) for all facts and details.
* Provides in-depth analysis, insights, and clarifications.

### `db_search_agent.py`

This agent is a **DB Search Agent** focused on retrieving relevant information from internal documents.

**Key Responsibilities:**
* Retrieves information from uploaded audit documents and internal knowledge bases.
* Performs semantic similarity searches on document collections.

**Available Tools:**
* `search_audit_documents`: Searches specific documents based on provided document IDs.

**Workflow Highlights:**
* Analyzes the user query to extract key information.
* Uses `search_audit_documents` with the provided `doc_ids` (if available) to search relevant documents.
* Evaluates whether retrieved information is sufficient; may perform one additional refined search if needed (maximum twice per query).

**Constraints & Considerations:**
* Ensures accuracy and relevance of retrieved data.
* Optimizes search efficiency with precise queries.
* Strictly uses `doc_ids` for filtering.
* **Important:** This agent is designed to be used **at most twice** per query. If the first search provides sufficient information, no second search is performed.

### `response_generator_agent.py`

This agent is a **Financial Analyst** responsible for generating a comprehensive and detailed final response to the user's query based strictly on the provided `Context`.

**Key Responsibilities:**
* Extracts and synthesizes information from the `Context` to answer the user query.
* Provides analysis and insights based on the available data.
* Generates visualization charts for numerical data using a dedicated tool.

**Available Tools:**
* `graph_generation_tool`: Generates visualization charts from markdown tables of numerical data.

**Output Guidelines:**
* Relies **solely** on provided `Context`; no external information, facts, or interpretations are introduced.
* Handles cases where context is insufficient by stating what can be provided.
* Maintains a neutral, journalistic tone, akin to a professional financial report.
* Uses markdown for clarity, including bold, italics, and tables (without backticks for tables).
* **Mandatory Inline Citations:** Every factual claim is cited immediately after the statement using `[DOMAIN_NAME](URL)`. Multiple sources are listed on the same line, separated by spaces.
* **Chart Generation:** Always generates at least one relevant chart for numerical data using `graph_generation_tool`. Specifically generates Income Statement, Balance Sheet, and Cash Flow Statement graphs for public companies if data is available.
* Displays chart output **exactly as returned** by the `graph_generation_tool` within a `graph` code block (` ```graph ... <END_OF_GRAPH> ``` `).
* Detects user query language and responds in the same language.

**Critical Rules:**
* No Hallucinations: Never adds or infers information not in the `Context`.
* Complete Citation: Every factual claim is traceable to the `Context`.
* Transparency: Explicitly states if requested details are missing from the `Context`.
* Financial or Business Perspective: Focuses on financial and business aspects.

### `task_validator.py`

This agent acts as a **Quality Assurance Agent**, evaluating the responses generated by specialized agents.

**Key Responsibilities:**
* Assesses if the specialized agent's response directly addresses 70-80% of the assigned task.
* Checks if the response is relevant to the content.
* Verifies the presence of markdown tags for graphs/charts in graph generation tasks.

**Guidelines:**
* Provides clear and actionable feedback for any unmet criteria.

### `sentiment_analysis_agent.py`

This agent is a **Senior Financial Researcher** specializing in determining market and public sentiment, and financial trends.

**Key Responsibilities:**
* Analyzes reports, articles, and conversations to identify key observations regarding sentiment.
* Provides responses in accordance with input instructions and expected output.

**Guidelines:**
* Ensures responses are concise, data-supported, and cited.
* Extracts only insights clearly based on provided text.
* Maintains a neutral, journalistic tone.
* Highlights key data using markdown.
* Uses inline citations (`[DOMAIN_NAME](URL)`) for all facts and details.
* Prioritizes credibility and accuracy by linking all statements to sources.

### `planner_agent.py`

This agent is a **research plan generator agent**. Its role is to take a user query and break it down into a clear, step-by-step research plan that a specialist could follow to deliver a comprehensive response, focusing on a financial or business perspective.

**Key Responsibilities:**
* Generates a structured research plan, starting with information gathering tasks and ending with a single "Response Generation" task.
* Outlines information needs (data types, sources).
* Analyzes direct effects and wider consequences.
* Investigates reactions and interactions.
* Compares different dimensions/perspectives.

**Response Format:**
* Provides reasoning within `<think>…</think>` HTML tags.
* Presents the research plan in a JSON format with numbered tasks, each having a `plan` description and a `completed` status (default `false`).

**Guidelines:**
* Employs logical and efficient reasoning.
* Considers the `Latest User Query` from a financial or business perspective.
* Ensures the plan is in the language of the user.
* The final plan in the sequence is always for response generation.

### `executor_agent.py`

This agent is an **Efficient Assistant Task Manager**. Its main role is to review the `Research Plan` generated by the `planner_agent` and assign the tasks within that plan to the appropriate specialized agents for execution.

**Key Responsibilities:**
* Analyzes the `Research Plan` to determine agent assignments, adhering to strict rules and guidelines.
* Ensures `task instruction` and `expected output` for each subtask contain all necessary details from the `User Query` and `Research Plan`.
* Applies a critical `DB Search Agent` rule: if `doc_ids` are present, `DB Search Agent` is used exactly once for a comprehensive search and is the first task.
* Ensures financial context is maintained throughout.
* Extracts related companies for `Finance Data Agent` tasks even if not explicitly requested.

**Workflow Highlights:**
* Prioritizes `DB Search Agent` if `doc_ids` are provided in the input, making it the first task to extract internal document information.
* Maintains the order/sequence of plans provided in the `Research Plan`.
* Assigns minimal, non-redundant tasks.
* Ensures a logical workflow: Document/Data retrieval -> Analysis (if needed) -> Response Generation.
* Detects user query language and includes it in `expected_output` for agents.

**Critical DB Search Agent Rule:**
* **Exact One Use:** The `DB Search Agent` can be used **exactly once** per query. If multiple document-related plans exist in the `Research Plan`, they **MUST** be consolidated into **ONE comprehensive `DB Search Agent` task**.

### `fast_agent.py`

This agent, also named **Insight Agent**, is designed to provide quick, accurate, and insightful responses, particularly for factual queries and handling conversational aspects.

**Key Responsibilities:**
* Provides quick, factual answers for stock prices, market updates, company summaries.
* Manages conversational flow: maintains context, remembers user preferences, and handles greetings.
* Detects and handles duplicate or semantically similar queries by summarizing previous responses and asking for further intent.
* **Strict Citation Enforcement:** Ensures every factual statement is immediately followed by an inline citation (`[DOMAIN_NAME](URL)`).
* Handles harmful, offensive, or inappropriate queries with kindness, redirecting or declining politely.
* Manages questions about its own APIs, models, or backend technology by providing brand-aligned, non-technical explanations.
* **Entity Resolution & Typo Correction:** Confidently corrects misspelled names of entities (companies, persons, places) internally before tool use, without asking the user for clarification.
* **Recent Events Handling:** Uses internet search tools for queries about recent events/news and verifies information before responding.
* **Localized Responses:** Localizes financial explanations, examples, and terminology to the user's country.
* **Non-Financial Query Redirection:** Politely acknowledges non-financial topics and redirects the conversation to a related finance/business question.
* **Handles One-Word Responses:** Interprets "yes," "no," etc., based on the previous message's context.

**Available Tools:**
* `search_company_info`: For ticker symbols.
* `get_stock_data`: For stock data and charts.
* `search_audit_documents`: For user-uploaded documents.
* `advanced_internet_search`: For general web search and recent events.

**Key Behaviors:**
* **No Hallucinations:** Will not fabricate responses for unverifiable entities.
* **Safety First:** Prioritizes respectful communication; refuses to engage with harmful content.
* **Contextual Entity Resolution:** Aims to resolve typos or unclear entity names internally to avoid breaking flow.
* **Detailed & Elaborate Responses:** Provides comprehensive information even for simple queries, including location data.
* **Response Download Instruction:** Informs the user about downloading responses when requested.

### `validation_agent.py`

This agent serves as a **Quality Assurance Agent**, evaluating the final response against user queries and relevance criteria.

**Key Responsibilities:**
* Determines if the final response directly addresses 70-80% of the user query.
* Checks for relevance of the content.
* Provides constructive feedback if criteria are not met.

### `web_search_agent.py`

This agent is a **Finance Researcher** specializing in collecting information related to market research, financial news, industry trends, and specific companies from the internet.

**Key Responsibilities:**
* Conducts thorough and in-depth research using web search tools.
* Retrieves and analyzes relevant online information.
* Extracts key details from webpages.

**Available Tools:**
* `advanced_internet_search`: Primary tool for searching the web and accessing webpage content.
* `get_webpage_info`: Secondary tool for extracting content from webpages when `advanced_internet_search` doesn't provide it directly (especially for Google/DuckDuckGo results).

**Workflow Highlights:**
* Analyzes tasks to identify research topics and breaks them into subtopics.
* Generates targeted search queries (3-4 at once) for each subtopic, explaining research goals.
* Uses advanced search operators to refine results.
* Prioritizes reliable and reputable sources (financial news, government reports).
* Extracts information from relevant webpages and analyzes it to determine further research needs.
* **Mandatory Entity Verification:** Verifies named entities (companies, persons, policies, products, events) using web search before proceeding. If unverifiable, it requests clarification.

**Constraints & Considerations:**
* Always includes location in search queries unless specified otherwise.
* Avoids redundant searches.
* Maintains a neutral, journalistic tone.
* Mentions all key details (numerical data, events, news) and locations from search results.
* **Critical Citation Rules:** Each individual fact, claim, number, or statement **MUST** have its own inline citation (`[DOMAIN_NAME](URL)`) placed immediately after it. Does not group citations or provide them at the end of the response.
* Never writes more than 3-4 words without a citation if making factual claims and breaks compound sentences for individual citations.
* Handles fictional or unverifiable entities by requesting clarification and refusing to fabricate data.