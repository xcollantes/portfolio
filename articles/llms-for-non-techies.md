---
title: "Large Language Models: For non-techies"
cardDescription: "A non-techies's guide to understanding LLMs, RAG, and when to use what"
cardPageLink: "/articles/llms-for-non-techies"
imagePath: ""
articleType: BLOG
author: Xavier Collantes
dateWritten: 2025-07-15
dateLastUpdated: 2025-07-15
tagIds:
  - llm
  - ml
  - ai
  - rag
  - embeddings
---

There are already thousands of explanations online what LLMs are so if you're
here, then you must really be struggling. But that's okay! At one point, I asked
the same exact questions as we're all on different paths. I'll explain in my way
what all these LLMs and RAGs are.

## What Are Large Language Models?

Large Language Models (LLMs) are like the autocomplete feature on your phone.
But in comparison your phone autocomplete is like a toaster compared to an LLM
which is like a Komatsu D575A Super Dozer.

![Komatsu D575A Super Dozer](/articles/images/llm-for-non-techies/komatsu.jpg)

_Toaster not shown._

They've been trained on massive amounts of text data books, articles, code,
basically most of the internet to understand patterns in language and generate
human-like responses.

Think of them like brains that can:

- Answer questions
- Write code
- Summarize documents
- Translate languages
- Generate creative content

But unlike humans, they don't actually "understand" anything. Computers have
always been and are still dumb; they can only do what humans make them do.
They're predicting what comes next based on patterns they've learned.

![baby logic meme](/articles/images/llm-for-non-techies/babylogic.webp)

For early LLMs, such a calculation as in the meme would have been
difficult because the statement "my baby is twice as big in 3 months so in 10
years, he'll be 7.5 trillion pounds" is logically sound but invalid because of
linear/exponential extrapolation fallacy or assuming that a pattern over
a short period will continue unchanged indefinitely without considering limiting
factors. In this case: human babies will slow growing and stop after a time.

## Key Concepts

### Parameters: The Brain Size

> When you say "hi" to another human, you're unconsciously taking in dozens of
> factors.

- Who they are
- Your and their mood
- What are they wearing?
- Do they look different from last you saw them?
- When was the last time you saw them?

Then you make a decision on how your tone is when you speak, on what subject to
speak about, on which emotion to convey to the other person.

![People meeting](/articles/images/llm-for-non-techies/male-friends-meeting-restaurant.jpg)

**Parameters work the same way**: Each factor is an input of the situation where
you make a decision based on learned biases and prior knowledge.

Now imagine you only use half the factors listed above. If you can't tell the
other person's mood or don't know who they are, you may not make an appropriate
decision on your interaction.

Parameters are the learned weights and biases in a neural network that determine
how the model processes and generates text. Think of them as the "knowledge" the
model has acquired during training. This is the same as how humans learn where
we read books and watch movies and learn patterns which we may later refer to.

Generally speaking, the parameter the higher the count the higher the capability
but also the higher the resource requirements:

| Parameter Count | Capability         | Hardware Needs                   | Best For                                                                                                    |
| --------------- | ------------------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 1B              | Basic tasks        | CPU will do, GPU would be great  | Simple Q&A                                                                                                  |
| 7B              | Generally good     | Common GPUs                      | Sweet spot for most applications, decent reasoning (most used models are in this range, as of 15 July 2025) |
| 13B             | Advanced responses | More GPUs, using hosted services | Complex tasks past Q&A                                                                                      |
| 70B+            | State-of-the-art   | Heavy GPU investment             | Highest level of analytics                                                                                  |

_As of 15 July 2025. Advancements are made weekly._

### Context Window: The Amount I Can Understand For Now

> Has anyone ever talked so fast and said so much you didn't have time to write it
> down or process what was being said? That's like a **context window** for LLMs.

The context window is how much text an LLM can "remember" at once. It's like
short-term memory everything the model considers when generating a single
response.

You'll also hear the term **token** which means the single chunks of data fed
into the context window. For example, ChatGPT may have a _context window_ of
120,000 _tokens_.

Tokens can be an ambiguous metric because _usually_ a token is a word or
syllable but depends on the LLM and the infrastructure around the LLM. But in
general we can assume a token anywhere between a syllable to full word.

You should start caring about tokens if you plan to feed 2,000 legal
documents or entire books into an LLM but if you're only asking questions to an
LLM, then not so much.

### Training Stages: School for LLMs

> Humans go through education where they learn general math, history, language,
> and science. Then a human may specialize in a field such as Engineering, Business, English,
> Music, Research, or Art.

The same with LLMs. LLMs go through two main training phases:

1. **Pre-training**: Trained on massive general datasets like Wikipedia, books,
   and code.
2. **Fine-tuning**: Specialized for specific tasks like classification, question
   answering, or code generation.

In terms of resource, Pre-training is cost-prohibitive for most businesses.
Gemini 1.0 cost Google $192 million to train. So as you can imagine, not many
companies train their own model. But that's okay, because there are far cheaper
and easier ways to give the effect of specializing your model.

[![training visual](/articles/images/llm-for-non-techies/costllm.jpg)](https://www.visualcapitalist.com/the-surging-cost-of-training-ai-models)

[_VisualCapitalist.com_](https://www.visualcapitalist.com/the-surging-cost-of-training-ai-models)

## RAG vs Fine-tuning: Which Approach to Use?

When you want to make an LLM work with your specific data, you have two main
options:

### RAG (Retrieval Augmented Generation)

RAG is like giving your LLM a test but the test is open-book.

When you ask a question, it first searches a database for relevant information,
then uses that context to generate an answer. The point where the data is
injected is the context window like you would when you type questions into
ChatGPT. RAG would find the relevant data and append the data to your question.

**Pros:**

- Dynamic data which changes instantly
- Lower money and GPU resource requirements (no Pre-training or Fine-tuning for
  RAG)
- Privacy (external database can be secured separately)

**Cons:**

- Lighter training method than Fine-tuning
- Results may be less consistent compared to Fine-tuning

**How it works:**

1. Your documents get encoded into _vector embeddings_ or a string which computers
   can "understand", example of real embedding: `Df03q4897ps90d8fsd0`
2. Depending on the algorithm set in the _vector database_, the document strings
   are ranked based on how closely related they are.

   For example, "dog" and "cat" may be given a score of 0.7 because they are
   both animals, both are common pets, but are different species as per the
   training data.

   "Cat" and "cow" may be given a score of 0.2 because though they are both
   animals, they are less seen together in the training data.

   Some of these algorithms for measuring similarity include [Co-sine
   Similarity](https://tomhazledine.com/cosine-similarity-alternatives/#cosine-similarity)
   and [Euclidean Distance](https://tomhazledine.com/cosine-similarity-alternatives/#euclidean-distance).

3. When you ask a question, it searches for similar content by the vector score.
4. The relevant content gets appended to your question.
5. The LLM generates an answer based on both your question and the retrieved
   context.

### Fine-tuning

> Your LLM earning a PhD, but more expensive.

Fine-tuning is like teaching the LLM specialized knowledge by training it on
your specific data.

**Pros:**

- Domain-specific tasks such as math calculations or recognizing plane schematics
- More consistent outputs

**Cons:**

- Higher training resource requirements in money, time, and GPU hardware
- Lower flexibility (requires retraining for updates)
- Training data potentially contains sensitive information which anyone can
  access with LLM

## When to Use What: Technical Decision Making

### Use out of the box solutions (ChatGPT, Gemini) for

- Prototyping new ideas
- Low-volume applications
- You want zero setup

### Use Locally-Hosted Models (Llama, Mistral) for

- High-volume usage
- Privacy is critical
- You need custom behavior

### Use RAG for

- Your data changes frequently and you need flexibility to update information
- You need to search large document collections
- Privacy in holding your documents

### Use Fine-tuning for

- You need domain-specific expertise baked in
- Consistency is more important than flexibility
- You have specialized tasks with clear patterns and inputs
- You can afford the training resources

## More than ChatGPT

[Quantplex.AI](https://quantplex.ai) for end-to-end local LLMs for your
business.

## Beyond the Hype

LLMs are powerful automation machines but not magic. They don't truly
"understand" anything and they're predicting what text should come next based on
patterns.

Despite its flaws, pattern matching is so sophisticated that it's useful for a
huge range of tasks. The trick is understanding what they're good at (pattern
recognition, text generation, reasoning over provided context) and what they're
not (factual accuracy without confirming, consistent logic).

Start simple, experiment with the tools, and gradually build complexity as you
understand what works for your specific use case.
