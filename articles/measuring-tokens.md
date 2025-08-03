---
title: Measuring Tokens in LLMs
cardDescription: "Tokens mean $$$ and how to measure them."
cardPageLink: articles/measuring-tokens
imagePath: /articles/images/measuring-tokens/chatgpt-preview.png
articleType: BLOG
author: Xavier Collantes
tagIds:
  - llm
  - tokens
---

## What are Tokens in LLMs?

![Tokens visualized {priority}](/articles/images/measuring-tokens/example.webp)

Tokens are the fundamental units that large language models (LLMs) process text
with. When you input text to an LLM, it first breaks down your text into
"tokens". These "tokens" are not exactly words but sometimes can be:

- Full words ("hello")
- Parts of words ("un" + "likely")
- Characters ("a", "!")
- Spaces and punctuation

For English text, a rough estimate is 1 token equals about 4 characters or
3/4 of a word. This means a typical page of text (about 500 words) would be
approximately 650-700 tokens.

## Why Tokens Matter

![Token limits](/articles/images/measuring-tokens/max.webp)

- **Cost calculation**: Most API-based LLM services charge based on token
  usage.
- **Context window limits**: Every model has a maximum number of tokens it can
  process at once (its "context window").
- **Performance impact**: More tokens generally mean more processing time and
  higher computational costs in terms of memory and time.

## The Ambiguity Problem of Tokens

![Token limits](/articles/images/measuring-tokens/chatgpt.webp)

One of the most confusing aspects of working with different LLMs is that tokens
**are not standardized across models**. Different LLMs have different
tokenization algorithms, which means the same text can be split into different
numbers of tokens depending on which model processes it.

- **Different tokenization algorithms**: GPT models use
  [tiktoken](http://github.com/openai/tiktoken), Claude uses its own tokenizer,
  Llama uses SentencePiece, etc.

- **i18n differences**: Some models tokenize certain languages
  more efficiently than others.

- **Special tokens**: Models handle special tokens (like those for code,
  formatting, or system instructions) differently.

For example, the phrase "I love machine learning" might be:

- 4 tokens in GPT-4
- 5 tokens in Claude
- 6 tokens in a different model

This inconsistency creates practical challenges:

- Cost comparisons become difficult
- Context window utilization varies by model
- Performance benchmarks can be misleading if not accounting for tokenization
  differences

## Measuring Tokens in Practice

Tokens are important for choosing the best LLM for your use case. There are
tools that can help you measure tokens for your specific model.

[GPT for Work: Tokenizer](https://gptforwork.com/tools/tokenizer): Get stats for
your tokens.

[Claude Tokenizer](https://claude-tokenizer.vercel.app/): For Claude models.

[OpenAI Tokenizer](https://platform.openai.com/tokenizer): For OpenAI models.

[SentencePiece](http://github.com/google/sentencepiece): For Llama models.

### Using tiktoken to Count Tokens

[tiktoken](http://github.com/openai/tiktoken): For OpenAI as a Python package.

Example of how to count tokens for different OpenAI models:

```python
import tiktoken

def count_tokens(text, model="gpt-4"):
    """Count the number of tokens in a text string."""
    encoder = tiktoken.encoding_for_model(model)
    tokens = encoder.encode(text)
    return len(tokens)

# Example usage.
sample_text = "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks in an encoder-decoder configuration."

print(f"GPT-4: {count_tokens(sample_text, 'gpt-4')} tokens")
print(f"GPT-3.5: {count_tokens(sample_text, 'gpt-3.5-turbo')} tokens")
print(f"davinci: {count_tokens(sample_text, 'text-davinci-003')} tokens")
```

## Practical Tips for Working with Tokens

- **Always measure before sending**: Count tokens before sending requests
  to avoid errors or unexpected costs.
- **Be aware of hidden tokens**: System prompts, formatting, and special
  characters all count toward your token limits.
- **Consider token efficiency**: Some prompts can be rewritten to use fewer
  tokens while conveying the same information.
- **Different models, different strategies**: Adapt your prompt strategy
  based on the specific tokenization of your chosen model.
- **Monitor token usage**: Keep track of token consumption to optimize
  costs and performance. These are usually available in the API response or the
  provider's dashboard.

## Further Reading

[OpenAI: What are tokens and how to count them?](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them)

[NVIDIA: Explaining Tokens — the Language and Currency of
AI](https://blogs.nvidia.com/blog/ai-tokens-explained/)

[HuggingFace: Tokenizer](https://huggingface.co/docs/transformers/en/main_classes/tokenizer)

[Microsoft: Understanding Tokens](https://learn.microsoft.com/en-us/dotnet/ai/conceptual/understanding-tokens)

[Medium: What is LLM Tokenization? A Guide to Language Model Efficiency](https://medium.com/@tahirbalarabe2/what-is-llm-tokenization-a-guide-to-language-model-efficiency-1b4ae57c180b)

[Medium: All you need to know about tokenization in LLMs](https://medium.com/thedeephub/all-you-need-to-know-about-tokenization-in-llms-7a801302cf54)

[Airbyte: LLM Tokenization](https://airbyte.com/data-engineering-resources/llm-tokenization)

![Token prediction meme {h: 600}](/articles/images/measuring-tokens/predict.webp)
