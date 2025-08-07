---
title: "Testing LLMs"
cardDescription: "Casually Explained: Metrics And Quality Control for LLMs"
author: Xavier Collantes
dateWritten: 2025-08-04
cardPageLink: "/articles/llm-testing"
articleType: BLOG
imagePath: "/assets/images/llm-testing/llm-testing.png"
tagIds:
  - ai
  - llm
  - qa
  - testing
  - metrics
  - bi
---

## LLM Testing

## Benchmarks

### BLEU

[BLEU](https://dl.acm.org/doi/10.3115/1073083.1073135): Precision-based metric
that counts the number of n-grams in the generated output that also show up in
the reference, and then divides it by the total number of words in the output.

**Pros:**

- Good for testing LLMs on precision of output

**Cons:**

Cannot measure content quality or larger ideas. For example, it might use
different words to describe the same thing but BLEU is only concerned with the
precision of words.

### ROUGE

[ROUGE](https://aclanthology.org/W04-1013/): Recall-based metric that counts the
number of n-grams in the reference that also show up in the generated output,
and then divides it by the total number of words in the reference.

**Pros:**

- Good for long-form text

**Cons:**

### MMLU

[MMLU](https://arxiv.org/abs/2009.03300): 57 tasks covering basic math, US
history, computer science, law, etc.

### HELM

[HELM](https://arxiv.org/abs/2211.09110): Rather than focusing on individual
tasks and metrics, HELM provides holistic LLM evaluation across multiple
domains. Assessment criteria cover accuracy, calibration, robustness, fairness,
bias, toxicity, and more. Task categories encompass Q&A, information retrieval,
summarization, text classification, and similar capabilities.

### AlpacaEval

[AlpacaEval](https://github.com/tatsu-lab/alpaca_eval): Automated evaluation
system that tracks the frequency with which a powerful LLM (such as GPT-4)
favors one model's output compared to a reference model. Evaluation metrics
encompass win rate, bias, latency, cost, variance, and others. The framework
demonstrates strong correlation with 20,000 human evaluations.

## Further Reading

https://eugeneyan.com/writing/llm-patterns/
