# Reasoning Agent Architecture

## Overview
This document outlines the architecture and workflow of a dynamic reasoning agent system designed to process user queries efficiently using a modular, iterative approach.

## Agents Used
- **Query Intent Detector**: Validates the relevance of the user query.
- **Manager Agent**: Analyzes the query and current state, assigns tasks to specialized agents, and orchestrates the workflow.
- **Web Search Agent**: Retrieves relevant information from web sources.
- **Social Media Scrape Agent**: Gathers data from social media platforms.
- **Finance Data Agent**: Collects and processes financial data.
- **Response Generator Agent**: Crafts the final response for the user.

## Agents Excluded
- **Planner Agent**: Not utilized in this architecture.
- **Executor Agent**: Excluded from the workflow.
- **Sentiment Analysis Agent**: Not included.
- **Data Comparison Agent**: Not part of the system.

![Reasoning Agent Architecture](images/reasoning_agent.png)

## Workflow
1. **Query Validation**: The user query is received and validated for relevance by the Query Intent Detector.
2. **Query Analysis**: The validated query is passed to the Manager Agent, which analyzes the query and the current state.
3. **Task Assignment**: The Manager Agent assigns a single task to the most appropriate specialized agent (Web Search, Social Media Scrape, Finance Data, or Coding) based on the query's requirements.
4. **Iterative Reasoning**: The Manager Agent receives the result from the specialized agent, reasons about the next best step, and assigns another task if necessary. This loop continues iteratively until sufficient information is gathered.
5. **Response Generation**: Once enough information is collected, the Manager Agent tasks the Response Generator Agent to create the final response.
6. **Response Delivery**: The final response is delivered to the user.

## Key Characteristic
The system employs **dynamic, iterative reasoning** to make task decisions one at a time, adapting the process as new information is gathered, ensuring flexibility and efficiency in handling diverse queries.

