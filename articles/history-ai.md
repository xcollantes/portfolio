---
title: "AI Chatbots: Giving relationship advice since 1966"
cardDescription: "How AI development have changed exponentially and when we should expect our robot overlords."
imagePath: /assets/images/history-ai/aimovie-preview.webp
cardPageLink: "articles/history-ai"
author: "Xavier Collantes"
dateWritten: 2025-08-01
dateLastUpdated: 2025-08-01
articleType: BLOG
tagIds:
  - ai
  - llm
  - history
---

![AI generated movie poster {priority} {h: 500}](/assets/images/history-ai/aimovie.webp)

###### AI generated movie poster for when this blog gets a movie deal (including both CEOs of Alphabet and Google, respectively).

This 60-year AI evolution fundamentally
changed how humans interact with machines and as you read you will notice how
the milestones become closer to each other, highlighting the near-exponential
pace of AI advancement.

## 1966: ELIZA

[![IBM 7040 {h: 500}](/assets/images/history-ai/7040.webp)](https://en.wikipedia.org/wiki/IBM_7040#/media/File:IBM_7040_front_panel.jpg)

Developed in 1966 at MIT by Joseph Weizenbaum, ELIZA was the first chatbot
written for the IBM 7091. It was a simple program that simulated a
psychotherapist.

In Weizenbaum's paper, he describes how the program could be improved as
"language abilities may be continually improved by a 'teacher'". He was truly
prophetic about how chatbots would be used today. The ELIZA program even back
then:

- "user types in some statement... in natural language using normal punctuation
  and sentence structures"
- Took transformation rules to filter and edit the return statements
- Input prompt was encoded and intent was formed by matching against a set of
  keywords

Example of a woman using ELIZA seeking advice about her boyfriend (some things
never change):

<iframe width="560" height="400" src="https://www.youtube-nocookie.com/embed/RMK9AphfLco?si=8UmolBaliS9R1KT5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

ELIZA used a process of pattern matching and transformation rules on the
"prompt" to generate outputs. As opposed to an alternative method such as
Context-Free Grammars, which I learned about at [Google](/articles/google.md).

Notice how the computer reuses words from the input prompt such as "BOYFRIEND",
"DEPRESSED".

```txt
Human: Men are all alike.

Computer: IN WHAT WAY?

Human: They’re always bugging us about something or other.

Computer: CAN YOU THINK OF A SPECIFIC EXAMPLE?

Human: Well, my boyfriend made me come here.

Computer: YOUR BOYFRIEND MADE YOU COME HERE

Human: He says I’m depressed much of the time.

Computer: I AM SORRY TO HEAR YOU ARE DEPRESSED

Human: It’s true. I am unhappy.
```

You can read Weizenbaum's paper here: [ELIZA: A Computer Program For the Study of Natural Language Communication Between Man And Machine](https://web.stanford.edu/class/linguist238/p36-weizenabaum.pdf).

## 1972: PARRY, Psychological Simulation

Kenneth Mark Colby at Stanford University develops PARRY, described as "ELIZA
with attitude", the first chatbot designed to model specific mental illness.
Written in LISP with approximately 500 heuristics, PARRY implements a crude
model of paranoid schizophrenic behavior using concepts, conceptualizations, and
beliefs.

In early testing, psychiatrists could only correctly identify PARRY as
a computer program 48% of the time, demonstrating successful simulation of
human-like responses.

## 1990s: Shift from Hand Written Rules to Statistical Models

### 1960s-1980s: The Old Way: Hand-Crafted Linguistic Rules

Early NLP systems like ELIZA and PARRY were built using explicitly programmed
rules written by linguists and programmers. These systems worked like elaborate
"if-then" statements:

- "If the user says 'I am sad,' then respond with 'Why do you think you are sad?'"
- "If the sentence contains 'because,' then extract the reason that follows"
- "If the input has the pattern 'I _ you,' then respond with 'Why do you _ me?'"

The Problems:

- Brittleness: Rules only worked for exact situations anticipated by programmers
- Scalability: Adding new capabilities required manually writing thousands more rules
- Maintenance nightmare: Rules often conflicted with each other
- Limited coverage: No system could handle the full complexity of natural language

Example: ELIZA's DOCTOR script had about 200 rules. To handle even basic
conversation, you'd need millions of rules covering every possible linguistic
pattern.

### 1990s: The New Way: Statistical Approaches

Instead of trying to manually encode language rules, why not let computers learn
patterns from actual language data? This was revolutionary, moving from human
intuition about language to mathematical analysis of how language actually
works.

Feed the computer massive amounts of text, and let it discover statistical
patterns:

- Which words commonly appear together?
- What's the probability that "the" is followed by a noun?
- How often does "New" precede "York"?

### The Three Enabling Factors

Steady Increases in Computational Power: Moore's Law in Action: Computer
processing power doubled approximately every two years throughout the
1980s and 1990s.

- 1980: Typical computers had ~1 MHz processors
- 1990: 25-33 MHz processors became common
- 2000: 1+ GHz processors were standard

## 1993: NVIDIA Founded With Gaming Focus

Jensen Huang, Chris Malachowsky, and Curtis Priem found NVIDIA at a Denny's
restaurant in East San Jose with $40,000 in capital. After near-bankruptcy in
1996, the 1997 RIVA 128 became their breakthrough product, followed by the
1999 invention of the GPU (Graphics Processing Unit) and successful IPO.

[![NVIDIA RIVA 128](/assets/images/history-ai/riva.webp)](https://www.computer.org/publications/tech-news/chasing-pixels/famous-graphics-chips-nvidias-riva128)

## 2006: NVIDIA Releases CUDA

NVIDIA releases CUDA (Compute Unified Device Architecture), a parallel computing
platform that fundamentally opened GPUs to general-purpose scientific computing.
This $1 billion investment enabled developers to use familiar programming
languages (C, C++, Fortran, Python) to harness GPU parallel processing power.

This starts the opportunity for non-video game developers to use GPUs for other
means.

## 2017: "Attention Is All You Need"

Arguably the most important paper triggering the current AI revolution.

![Google Brain logo {h: 300}](/assets/images/history-ai/brain.webp)

Eight researchers at Google Brain publish the groundbreaking paper, [Attention
Is All You Need](https://arxiv.org/abs/1706.03762), introducing the
transformer architecture, fundamentally replacing Recurrent Neural Networks with
Attention-Based Processing.

Authors Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones,
Aidan N. Gomez, Łukasz Kaiser, and Illia Polosukhin demonstrate that attention
mechanisms alone are sufficient for sequence modeling, eliminating the need for
recurrence and enabling parallel processing. Thus creating the "transformer"
architecture.

The innovation was in the method of processing text at the time. Before
transformers, the dominant approach for processing texts or sequences was
Recurrent Neural Networks (RNNs):

- Each word was processed one at a time in order
- Each word depends on the previous word's processing
- Information flows like a chain: Word 1 → Word 2 → Word 3 → Word 4

![Google Hat image {h: 300}](/assets/images/history-ai/hat.webp)

### Critical Problems

- **Sequential bottleneck:** You could not process Word 5 until you would finish
  processing Word 4, making training extremely slow.
- **Vanishing gradients:** Information from early words got "forgotten" by the
  time you reached later words, for example: "The cat that lived in the house on
  the hill was hungry," an RNN might "forget" about "cat" by the time it reaches
  "was hungry" because there are so many words in between.
- **Limited parallelization:** Since each step depended on the previous step, you
  could not use multiple GPUs efficiently since GPUs were great at parallel
  processing.

> The Google Brain team made a radical proposal: What if we could let every word
> in a sentence directly "look at" and "talk to" every other word simultaneously?

Instead of processing sequentially (word by word), the transformer processes all
words at once using something called attention mechanisms.

The transformer architecture solved these problems by:

- Allowing each word to attend to every other word directly, capturing complex
  relationships
- Using multi-head attention to capture different aspects of the input
- Using positional encoding to maintain sequence order without recurrence
- Using self-attention to capture the context of the entire sequence at once,
  allowing for parallel processing

### Revolutionizing AI

- **Massive Parallelization:** Before (RNNs): Processing a 100-word sentence
  required 100 sequential steps. After (Transformers): Processing a 100-word
  sentence happens in parallel across all 100 words.
- **Training time:** Training time went from weeks to days, enabling much larger
  models.
- **Long-range dependencies:** Every word has direct access to every other word's
  information where models could handle much longer sequences and maintain
  coherence across massive data sets.
- You could actually visualize what the model was paying attention to. In
  translating "The animal didn't cross the street because it was too tired," you
  could see the model correctly attending from "it" back to "animal" rather than
  "street."

Attention Is All You Need did not just introduce a new technique, it established
the architectural foundation that powers all modern AI systems. When you
interact with ChatGPT, Claude, or any modern AI assistant, you are interacting
with a direct descendant of the transformer architecture introduced in this
paper.

![Google lobby {h: 400}](/assets/images/history-ai/lobby.webp)

###### Me, really happy for my fellow Googlers who wrote a cool paper.

### Transformer Architecture In Detail

_You can skip if you are not interested in the math._

Every word can directly attend to every other word in the sentence.

1. Every word asks every other word: "How relevant are you to me?"
2. Words respond with relevance scores
3. Each word gets updated information based on all the relevant words

How it works mathematically:

Each word gets converted into three vectors: Query (Q), Key (K), and Value (V)

- Think of Q as "what am I looking for?"
- Think of K as "what do I offer?"
- Think of V as "what information do I contain?"

For the math geeks, here is the formula:

```txt
Attention(Q,K,V) = softmax(QK^T/√d_k)V
```

The Multi-Head Attention is a key component of the transformer architecture.

One attention mechanism might focus on grammar, another on meaning, another on
relationships.

How it works:

1. Run 8 different attention mechanisms in parallel
2. Each "head" learns to focus on different types of relationships
3. Example heads might specialize in:

- Subject-verb relationships
- Adjective-noun relationships
- Long-distance dependencies
- Syntactic patterns

Since all words are processed simultaneously, how does the model know word order?

Through Positional Encoding, the transformer architecture needs to know the order
of the words in the sentence.

The solution is to add mathematical "position stamps" to each word that encode
its location in the sequence.

Instead of processing sequentially to maintain order, they encoded position
information directly into the word representations.

## 2018: OpenAI GPT-1

![Sam Altman {h: 500}](/assets/images/history-ai/altman.webp)

OpenAI releases GPT-1, the first decoder-only transformer with 117 million
parameters trained on BookCorpus.

This established the GPT paradigm of unsupervised pre-training followed by
supervised fine-tuning, achieving state-of-the-art performance. Most LLMs today
follow this pattern of pre-training and fine-tuning.

## 2019: HuggingFace Transforms Model Accessibility

HuggingFace launches the Transformers library, democratizing access to
pre-trained models with simple APIs. The platform becomes the "GitHub of machine
learning," hosting over [500,000
models](https://turingpost.substack.com/p/huggingfacechronicle)
by 2024.

## 2020: n8n Emerges as a Crucial Workflow Automation Platform

[![Jan Oberhauser meetup {h: 500}](/assets/images/history-ai/n8n.webp)](https://community.n8n.io/t/berlin-august-2024-meetup-report/52706)

n8n
[emerges](https://techcrunch.com/2021/04/26/n8n-raises-12m-for-its-fair-code-approach-to-low-code-workflow-automation/)
as a crucial workflow automation platform that enables non-technical
users to integrate AI capabilities into business processes. Created by Jan
Oberhauser, n8n's visual workflow builder allows users to connect AI models to
databases, APIs, and business applications without coding, opening up the
capabilities to a new demographic of users.

## 2022: ChatGPT Launches the Modern AI Era

[![Verge cover story {h: 400}](/assets/images/history-ai/verge.webp)](https://www.theverge.com/2022/12/8/23499728/ai-capability-accessibility-chatgpt-stable-diffusion-commercialization)

OpenAI releases ChatGPT, built on GPT-3.5 and optimized using Reinforcement
Learning from Human Feedback (RLHF), a three-step process including supervised
fine-tuning, reward model training, and proximal policy optimization. In other
words, OpenAI was able to tune parameters of the model to make it more
"human-like".

ChatGPT reached 1 million users in 5 days and 100 million users in 2 months,
becoming the fastest-growing consumer application in history and bringing AI
capabilities to mainstream awareness.

## 2023: LangChain Launches Application Development

![Harrison Chase {h: 500}](/assets/images/history-ai/chase-ng.webp)

Harrison Chase creates LangChain, the first comprehensive framework for building
applications with language models. LangChain addresses critical gaps in LLM
development: memory management, chain-of-thought reasoning, document
processing, and agent behaviors. The framework introduces concepts like:

- Chains: Combining LLM calls with other tools
- Agents: LLMs that can use tools and make decisions
- Memory: Persistent conversation and context management
- Retrievers: Integration with vector databases for knowledge retrieval

LangChain was to AI development as ReactJS was to web development, introducing
reusable components and established patterns that significantly reduced
development complexity. The framework enabled developers to focus on application
logic rather than infrastructure concerns.

## 2023: LlamaIndex Enables Document Intelligence

Jerry Liu creates LlamaIndex (formerly GPT Index) to solve the "LLM + your data"
problem. The framework specializes in ingesting, structuring, and querying large
document collections, enabling applications like querying on your own data with
RAG.

## 2023: Meta's Open-Source Strategy

[![Llama Zuck {h: 500}](/assets/images/history-ai/llamazuck.webp)](https://www.facebook.com/photo/?fbid=10103763476220329&set=pcb.10103763477013739)

Meta released LLaMA 1 to researchers, which subsequently leaked and enabled
widespread open-source development. The July 2023 Llama 2 release with
commercial licensing and the April 2024 Llama 3 series democratized access to
high-quality language models, with the 405B parameter Llama 3.1 matching
closed-source model performance.

## 2023: GPT-4 Introduces Multimodal Capabilities

OpenAI releases GPT-4 with text and image inputs. The model underwent six
months of iterative alignment using adversarial testing, demonstrating improved
factuality, steerability, and safety.

## 2023: Google's Bard Responds to ChatGPT

![Google Bard logo {h: 300}](/assets/images/history-ai/bard.webp)

Just 47 days after ChatGPT's launch, [Google announced
Bard](https://www.reuters.com/technology/google-ai-chatbot-bard-offers-inaccurate-information-company-ad-2023-02-08/)
in a "code red" response. A factual error in the demonstration cost Alphabet
[$100
billion](https://www.npr.org/2023/02/09/1155650909/google-chatbot--error-bard-shares)
in market value, highlighting the competitive pressure and stakes involved in
the AI race.

## 2024: Model Context Protocol, The Universal Standard

[Anthropic introduced the Model Context Protocol (MCP) in November
2024](https://www.anthropic.com/news/model-context-protocol), representing the
next evolutionary step. MCP provides:

- A standardized protocol for AI-tool integration
- Universal connectivity between AI models and external systems
- Dynamic tool discovery and capability expansion
- Secure, scalable integration patterns

MCP has been described as the ["USB-C for
AI"](https://www.katonic.ai/usb-of-ai-mcp-a2a-communication.html#:~:text=At%20the%20center%20of%20this%20revolution%20is,models%20access%20external%20tools%2C%20data%2C%20and%20services)
because it standardizes how AI systems connect with external tools and data
sources, eliminating the fragmentation that previously required custom
integrations.

## The Transformation: From Technical to Accessible

This evolution mirrors the broader democratization of technology:

1. **Manual Era (2019)**: Specialists built connections to AI models and
   external tools and data sources
2. **Framework Era (2023)**: Software Engineers used reusable components and
   established patterns to build applications
3. **No-Code Era (2024)**: Non-technical users could build business
   applications and LLMs are used for coding entire applications
4. **Agentic Era (2024-2025)**: LLMs are enabled to use tools and data sources
   to perform actions and solve problems
5. **Standardization Era (2025+)**: Universal protocols enable seamless
   interoperability between AI models and external tools and data sources

As we move along progression, the same thing is happening as any arena such as
web development, databases, or any other field:

- Gap between the technical and non-technical users is closing
- Growing interconnectivity between AI models and external tools.

For example, in the early days of web development:

1. You had to know how to code HTML, CSS, and JavaScript
2. Frameworks like ReactJS and AngularJS emerged
3. Wix and other no-code platforms emerged

The same will happen with AI development.

## Conclusion

The rapid evolution from ChatGPT's launch in 2022 to the establishment
of universal AI integration protocols in 2024 demonstrates the extraordinary
pace of AI development.

The future promises even greater accessibility and capability as these standards
mature and new abstractions emerge.

At my core, I call myself a Software Engineer, but specifically like 99% of
today's Software Engineers, I am a Web Developer. All the technology and
productions I make are related to the World Wide Web, even the Backend
Engineering work. For the future, I need to be a Web Developer but for AI. The
parallels are clear, and the natural evolution of the field is in AI.

## Further Reading

[Weizenbaum, Computational Linguistics: ELIZA A Computer Program For the Study of Natural Language Communication Between Man And Machine](https://web.stanford.edu/class/linguist238/p36-weizenabaum.pdf)

[History of LLMs](https://toloka.ai/blog/history-of-llms/)

[ELIZA, the world's first chatbot is back online after six decades thanks to AI historians](https://the-decoder.com/eliza-the-worlds-first-chatbot-is-back-online-after-six-decades-thanks-to-ai-historians/)

[ieee.org: Why people demanded privacy to confide in the world's first chatbot](https://spectrum.ieee.org/why-people-demanded-privacy-to-confide-in-the-worlds-first-chatbot)

[Kenneth Colby Develops PARRY, 1972](https://www.historyofinformation.com/detail.php?id=4138)

[PARRY, the pioneering chatterbot of 1972](https://indiaai.gov.in/article/parry-the-pioneering-chatterbot-of-1972)

Berry, David M. (2018). "Weizenbaum, ELIZA and the End of Human Reason". In
Baranovska, Marianna; Höltgen, Stefan (eds.). Hello, I'm Eliza: Fünfzig Jahre
Gespräche mit Computern [Hello, I'm Eliza: Fifty Years of Conversations with
Computers] (in German) (1st ed.). Berlin: Projekt Verlag. pp. 53–70.

[NVIDIA Corporate Timeline](https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/)

[Jensen Huang: I didn't know how to start a business when launching NVIDIA](https://www.cnbc.com/2024/05/11/jensen-huang-i-didnt-know-how-to-start-a-business-when-launching-nvidia.html)

[A Brief History of Natural Language Processing (NLP)](https://www.dataversity.net/a-brief-history-of-natural-language-processing-nlp/)

[Exploring Topics: ChatGPT Users](https://explodingtopics.com/blog/chatgpt-users)

![AI generated movie poster](/assets/images/history-ai/aimovie-alt.webp)
