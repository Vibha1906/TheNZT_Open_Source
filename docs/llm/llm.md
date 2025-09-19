# LLM

The `src/ai/llm/` directory contains modules for managing and configuring Large Language Models (LLMs) within the project. It centralizes API key handling, LLM instantiation, and specific configuration settings for various LLM-powered tasks.


## Files

  * `__init__.py`: This file is typically empty and indicates that the `arc/ai/llm/` directory is a Python package.
  * `model.py`: This module handles the initialization and retrieval of LLM instances using the `langchain_community.chat_models.ChatLiteLLM` library. It also manages the loading of API keys from environment variables or a `.env` file.
  * `config.py`: This module defines various configuration classes for different LLM-driven functionalities (e.g., `FastAgentConfig`, `IntentDetectionConfig`, `DBSearchConfig`). Each configuration class specifies the primary and alternative LLM models to be used, along with their respective temperature, `top_p`, `top_k`, and `max_tokens` parameters.

-----

## Setup

To use the LLMs configured in this directory, you need to set up your API keys. The `model.py` script attempts to load API keys from a `.env` file. Create a `.env` file in your project's root directory (or where your application runs from) and populate it with your API keys:

```
OPENAI_API_KEY="your_openai_api_key_here"
AZURE_API_KEY="your_azure_api_key_here"
AZURE_API_BASE="your_azure_api_base_url_here"
GEMINI_API_KEY="your_gemini_api_key_here"
GROQ_API_KEY="your_groq_api_key_here"
```

-----

## Usage

### `model.py`

The `model.py` module provides functions to get initialized LLM instances:

  * **`get_llm(model_name: str, temperature: float = None, max_tokens: int = None)`**: This function returns a `ChatLiteLLM` instance for a given `model_name`. You can optionally specify `temperature` and `max_tokens`.

    Example:

    ```python
    from llm.model import get_llm
    llm_instance = get_llm(model_name="gemini/gemini-2.0-flash", temperature=0.6)
    ```

  * **`get_llm_groq(model_name: str, temperature: float = None, top_p: float = None, top_k: int = None) -> ChatLiteLLM`**: This function is specifically tailored for Groq models, allowing you to set `top_p` and `top_k` parameters.

    Example:

    ```python
    from llm.model import get_llm_groq
    groq_llm = get_llm_groq(model_name="groq/qwen-qwq-32b", temperature=0.6, top_p=0.95)
    ```

  * **`get_llm_alt(model_name: str, temperature: float = None, max_tokens: int = None)`**: This function provides an alternative way to get an LLM instance, similar to `get_llm`.

    Example:

    ```python
    from llm.model import get_llm_alt
    alt_llm = get_llm_alt(model_name="gemini/gemini-2.0-flash-lite", max_tokens=2000)
    ```

### `config.py`

The `config.py` module defines static configuration classes that can be imported and used to retrieve model names and parameters for various tasks.

Example:

```python
from llm.config import FastAgentConfig, IntentDetectionConfig

# Accessing configurations for Fast Agent
print(FastAgentConfig.MODEL)
print(FastAgentConfig.TEMPERATURE)

# Accessing configurations for Intent Detection
print(IntentDetectionConfig.ALT_MODEL)
print(IntentDetectionConfig.MAX_TOKENS)
```

Each configuration class typically includes:

  * **`MODEL`**: The primary LLM model to use.
  * **`ALT_MODEL`**: An alternative LLM model to use, potentially for fallback or different performance characteristics.
  * **`TEMPERATURE`**: Controls the randomness of the output. Higher values mean more random output.
  * **`ALT_TEMPERATURE`**: Temperature for the alternative model.
  * **`MAX_TOKENS`**: The maximum number of tokens to generate in the LLM's response.
  * **`ALT_MAX_TOKENS`**: Max tokens for the alternative model.
  * **`ALT_TOP_P`**: (ManagerConfig only) Nucleus sampling parameter for the alternative model.
  * **`ALT_TOP_K`**: (ManagerConfig only) Top-k sampling parameter for the alternative model.
  * **`STREAM`**: (SummarizerConfig, DeepProcessQueryInitialConfig) Indicates if the response should be streamed.

-----

## Extending and Customizing

  * **Adding New LLM Configurations**: To add a new set of LLM configurations for a specific task, simply create a new class in `config.py` following the existing pattern.
  * **Integrating New LLMs**: If you need to integrate LLMs not supported by `ChatLiteLLM` or require specific handling, you can extend `model.py` with new functions or modify existing ones to accommodate them.
