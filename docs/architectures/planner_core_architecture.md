# Planner Agent (Core) Architecture

## Overview
The architecture and workflow of the Planner Agent system, designed to process user queries through a series of specialized agents to deliver accurate and relevant responses.

## Agents Used
- **Query Intent Detector**: Validates the relevance of user queries.
- **Planner**: Creates a fixed, multi-step plan involving specialized agents.
- **Executor**: Reviews and finalizes the plan created by the Planner.
- **Web Search**: Retrieves information from web sources.
- **Social Media Scrape**: Gathers data from social media platforms.
- **Finance Data**: Collects and processes financial information.
- **Sentiment Analysis**: Analyzes the sentiment of collected data.
- **Data Comparison**: Compares data from multiple sources for consistency and accuracy.
- **Response Generator**: Compiles and formats the final response for the user.

![Planner Agent Architecture](images/planner_agent.png)

## Workflow
1. **Query Intake**: The user query is received and processed by the **Query Intent Detector** to ensure relevance.
2. **Plan Creation**: The validated query is sent to the **Planner Agent**, which generates a fixed, multi-step plan involving the appropriate specialized agents.
3. **Plan Review**: The **Executor Agent** reviews and finalizes the plan.
4. **Task Routing**: A **Task Router** (implied component) sequentially assigns tasks to the agents specified in the plan, such as **Web Search**, **Social Media Scrape**, **Finance Data**, **Coding**, **Sentiment Analysis**, and **Data Comparison**.
5. **Data Processing**: Each assigned agent collects and analyzes data according to its specialization.
6. **Response Generation**: The processed information is passed to the **Response Generator Agent**, which compiles and formats the final response.
7. **Response Delivery**: The final response is delivered to the user.

## Key Characteristic
The Base Agent Architecture follows a **pre-defined, sequential plan** generated at the beginning of the process, ensuring a structured and systematic approach to handling user queries.
