# Architecture Overview

In this system we mainly have 3 agents:

1. Fast Agent (Lite) [fast_agent.md](fast_lite_architecture.md)

The Fast Agent (Insight Agent) is an AI-powered assistant designed to deliver rapid, accurate insights on companies, markets, and user-uploaded documents through a modular, multi-step architecture. It processes natural language queries using a system prompt to enforce tone and structure, routes them to specialized tools (e.g., company ticker resolution, stock data retrieval, news search, and vector-based document search via APIs like Financial Modeling Prep and Qdrant), and generates clear, brand-aligned markdown responses with inline citations.

2. Planner Agent (Core) [planner_core_architecture.md](planner_core_architecture.md)

The Planner Agent (Core) architecture is a structured, multi-agent system that processes user queries through a fixed, sequential plan. Starting with the Query Intent Detector to validate relevance, the Planner Agent creates a multi-step strategy, reviewed by the Executor Agent, which is executed by specialized agents like Web Search, Social Media Scrape, Finance Data, Sentiment Analysis, and Data Comparison. The Response Generator compiles a comprehensive, user-friendly response, making this approach ideal for systematic handling of complex queries.

3. Reasoning Agent (Pro) [reasoning_pro_architecture.md](reasoning_pro_architecture.md)

The Reasoning Agent (Pro) architecture is a dynamic, iterative system that efficiently handles user queries through adaptive task assignment. After the Query Intent Detector validates relevance, the Manager Agent analyzes the query and assigns tasks one at a time to specialized agents (Web Search, Social Media Scrape, or Finance Data), iterating based on incoming data until sufficient information is gathered. The Response Generator then crafts a tailored response, making this flexible system ideal for diverse, evolving queries.
