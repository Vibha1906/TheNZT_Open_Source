# Individual Agents

Insight Bot is a multi-agent system designed for financial analysis, leveraging specialized AI agents to process user queries related to finance, economics, and business. Each agent handles specific tasks, such as data retrieval, sentiment analysis, or response generation, orchestrated to deliver comprehensive and accurate insights.

## Contents

### `agent_prompts.md` [agent_prompts.md](agent_prompts.md)

This file outlines the system prompts and workflows for specialized AI agents in the iAI Solution financial analysis system. Each agent, such as the Social Media Agent, Insight Agent, and Finance Data Agent, has defined responsibilities, tools, and constraints to ensure accurate financial insights. Key features include entity verification, structured workflows, and strict citation rules, with agents handling tasks like social media analysis, query intent detection, and financial data retrieval.

### `agents.md`[agents.md](agents.md)

This file describes the core agent implementations within the `agents/` folder of the Insight Bot system. Each agent is a modular Python class inheriting from `BaseAgent`, ensuring a consistent interface for tasks like financial data processing, web searches, and geospatial analysis. The file details the architecture, responsibilities, and lifecycle of agents like PlannerAgent, FinanceDataAgent, and ResponseGenerationAgent, emphasizing modularity, extensibility, and robust error handling.