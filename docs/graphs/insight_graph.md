# Insight Graph

This file defines the `InsightAgentGraph` class, which orchestrates a multi-agent system using `langgraph` to process queries, gather insights, and generate comprehensive responses. The graph integrates various specialized agents, enabling complex workflows for data retrieval, analysis, and report generation.

## Features

  - **Modular Agent System**: Easily integrate and manage specialized agents for diverse tasks.
  - **State Management**: Utilizes `InsightAgentState` to maintain and pass information between agents.
  - **Dynamic Workflow**: Employs a `StateGraph` for flexible and adaptable agent orchestration.
  - **Query Intent Detection**: Directs queries to the most relevant agents based on initial intent.
  - **Comprehensive Data Handling**: Includes agents for database search, web search, social media, financial data, and more.
  - **Analytical Capabilities**: Incorporates sentiment analysis, data comparison, and coding agents for in-depth insights.
  - **Report Generation**: Generates structured responses based on collected and analyzed data.
  - **Graph Visualization**: Provides methods to visualize the agent workflow using Mermaid diagrams.

## Architecture

The `InsightAgentGraph` is built upon `langgraph`'s `StateGraph` and consists of several interconnected nodes, each representing a specific agent. The flow of control and data between these agents is defined by edges, enabling a sophisticated multi-step reasoning and execution process.

The core components are:

  - **`InsightAgentState`**: Defines the shared state that all agents operate on and update.
  - **Nodes**: Each node corresponds to an instance of an agent (e.g., `DBSearchAgent`, `WebSearchAgent`).
  - **Edges**: Define the transitions between nodes, dictating the order of execution.
  - **Checkpointer**: (Currently `MemorySaver`) allows for saving and restoring the graph's state.

## Agents

The `InsightAgentGraph` integrates the following specialized agents:

  - **`IntentDetector`**: Determines the primary intent of the user's query.
  - **`DBSearchAgent`**: Searches internal databases for relevant information.
  - **`PlannerAgent`**: Devises a plan for task execution based on the query.
  - **`ExecutorAgent`**: Executes the planned tasks by routing to appropriate specialized agents.
  - **`Task Router`**: Directs tasks to the correct specialized agent.
  - **`ManagerAgent`**: Oversees the overall workflow and agent interactions.
  - **`WebSearchAgent`**: Performs web searches to gather information.
  - **`SocialMediaAgent`**: Scrapes data from social media platforms.
  - **`FinanceDataAgent`**: Retrieves and processes financial data.
  - **`SentimentAnalysisAgent`**: Analyzes text for sentiment (positive, negative, neutral).
  - **`DataComparisonAgent`**: Compares different datasets or pieces of information.
  - **`CodingAgent`**: Executes code or assists with coding-related tasks.
  - **`MapAgent`**: Handles geospatial queries and data.
  - **`ReportGenerationAgent`**: Compiles and formats the final response or report.
  - **`ValidationAgent`**: Validates the generated response or intermediate data.
