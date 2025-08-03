---
title: "Large Language Models: For Non-Techies"
cardDescription: "LLMs translated for Non-Techie's. When to use what."
cardPageLink: "/articles/llms-for-non-techies"
imagePath: "/assets/images/llm-for-non-techies/chess.webp"
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

![Woman playing chess {priority}](/assets/images/llm-for-non-techies/chess.webp)

## What Are Large Language Models?

Large Language Models (LLMs) are like the autocomplete feature on your phone.

But in comparison your phone autocomplete is like a toaster compared to an LLM
which is like a Komatsu D575A Super Dozer.

![Komatsu D575A Super Dozer {h: 400}](/assets/images/llm-for-non-techies/komatsu.webp)

_Toaster not shown._

LLMs are trained on massive amounts of text data books, articles, code,
and on the internet to understand patterns in language and generate
human-like responses.

Think of them as brains that can:

- Answer questions
- Write code
- Summarize documents
- Translate languages
- Generate content

But unlike humans, they do not actually "understand" anything. Computers have
always been and are still dumb; they can only do what humans make them do.
They are predicting what comes next based on patterns they have learned.

![baby logic meme {h: 700}](/assets/images/llm-for-non-techies/babylogic.webp)

For early LLMs, such a calculation as in the meme would have been
difficult because the statement "my baby is twice as big in 3 months so in 10
years, he will be 7.5 trillion pounds" is logically sound but invalid because of
linear/exponential extrapolation fallacy or assuming that a pattern over
a short period will continue unchanged indefinitely without considering limiting
factors. In this case: human babies will slow growing and stop after a time.

## Key Concepts

### Parameters: The Brain Size

> When you say "hi" to another human, you are unconsciously taking in dozens of
> factors.

- Who they are
- Your and their mood
- What are they wearing?
- Do they look different from last you saw them?
- When was the last time you saw them?

Then you make a decision on how your tone is when you speak, on what subject to
speak about, on which emotion to convey to the other person.

![People meeting {h: 400}](/assets/images/llm-for-non-techies/male-friends-meeting-restaurant.webp)

> **Parameters work the same way**: Each factor is an input of the situation where
> you make a decision based on learned biases and prior knowledge.

Now imagine you only use half the factors listed above. If you cannot tell the
other person's mood or do not know who they are, you may not make an appropriate
decision on your interaction.

Parameters are the learned weights and biases in a neural network that determine
how the model processes and generates text. Think of them as the "knowledge" the
model has acquired during training. This is the same as how humans learn where
we read books and watch movies and learn patterns which we may later refer to.

Generally speaking, the parameter the higher the count the higher the capability
but also the higher the resource requirements:

- **1B parameters**: Basic tasks capability, CPU will do (GPU would be great), best for simple Q&A
- **7B parameters**: Generally good capability, common GPUs needed, sweet spot for most applications with decent reasoning (most used models are in this range, as of 15 July 2025)
- **13B parameters**: Advanced responses capability, more GPUs or hosted services needed, best for complex tasks past Q&A
- **70B+ parameters**: State-of-the-art capability, heavy GPU investment required, highest level of analytics

_As of 15 July 2025. Advancements are made weekly._

### Context Window: The Amount I Can Understand For Now

> Has anyone ever talked so fast and said so much you did not have time to write it
> down or process what was being said? That is like a **context window** for LLMs.

The context window is how much text an LLM can "remember" at once. It is like
short-term memory everything the model considers when generating a single
response.

You will also hear the term **token** which means a single chunk of data fed
into the context window. For example, ChatGPT may have a _context window_ of
120,000 _tokens_.

Tokens can be an ambiguous metric because _usually_ a token is a word or
syllable but depends on the LLM and the infrastructure around the LLM. But in
general we can assume a token anywhere between a syllable to full word.

You should start caring about tokens if you plan to feed 2,000 legal
documents or entire books into an LLM but if you are only asking questions to an
LLM, then not so much.

[![Infographic on context windows for LLMs](/assets/images/llm-for-non-techies/contextwindow.webp)](https://www.artfish.ai/p/long-context-llms)

_[artfish.ai](https://www.artfish.ai/p/long-context-llms)_

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
companies train their own model. But that is okay, because there are far cheaper
and easier ways to give the effect of specializing your model.

[![training visual](/assets/images/llm-for-non-techies/costllm.webp)](https://www.visualcapitalist.com/the-surging-cost-of-training-ai-models)

[_VisualCapitalist.com_](https://www.visualcapitalist.com/the-surging-cost-of-training-ai-models)

## RAG vs Fine-tuning: Which Approach to Use?

When you want to make an LLM work with your specific data, you have two main
options:

### RAG (Retrieval Augmented Generation)

> RAG is like giving your LLM a test but the test is open-book.

When you ask a question, it first searches a database for relevant information,
then uses that context to generate an answer. The point where the data is
injected is the context window like you would when you type questions into
ChatGPT. RAG would find the relevant data and append the data to your question.

[![RAG diagram](/assets/images/llm-for-non-techies/awsrag.webp)](https://aws.amazon.com/what-is/retrieval-augmented-generation)

[_AWS_](https://aws.amazon.com/what-is/retrieval-augmented-generation)

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

## Further Reading

[Introduction to Large Language Models, Google](https://developers.google.com/machine-learning/resources/intro-llms)

[arXiv Paper: A Survey on RAG Meets LLMs](https://arxiv.org/abs/2408.04693)

[What is a Large Language Model? Cloudflare](https://www.cloudflare.com/learning/ai/what-is-large-language-model)

[What is a Neural Network? Cloudflare](https://www.cloudflare.com/learning/ai/what-is-neural-network)

[Long Context LLMs, Artfish AI](https://www.artfish.ai/p/long-context-llms)

[What are Large Language Models? Elastic](https://www.elastic.co/what-is/large-language-models)

[What is Retrieval Augmented Generation? AWS](https://aws.amazon.com/what-is/retrieval-augmented-generation)

## Beyond the Hype

![iRobot meme {h: 600}](/assets/images/llm-for-non-techies/irobot.webp)

LLMs are powerful automation machines but not magic. They do not truly
"understand" anything and they are predicting what text should come next based on
patterns.

Despite its flaws, pattern matching is so sophisticated that it is useful for a
huge range of tasks. The trick is understanding what they are good at (pattern
recognition, text generation, reasoning over provided context) and what they are
not (factual accuracy without confirming, consistent logic).

Start simple, experiment with the tools, and gradually build complexity as you
understand what works for your specific use case.
