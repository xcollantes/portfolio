---
title: "RAG with LangChain"
cardDescription: "How to start with LLM orchestration."
author: Xavier Collantes
dateWritten: 2024-09-15
dateLastUpdated: 2025-07-25
cardPageLink: "/articles/rag-langchain"
articleType: BLOG
imagePath: ""
tagIds:
  - ai
  - langchain
  - python
  - llm
  - rag
---

RAG with LangChain is only one of many ways to implement a RAG-enabled LLM.

In this example, I will show you how to build a RAG pipeline with LangChain.
This will guide you in making different technical decisions for different
components given certain situations.

[![Bulldog Band {priority} {h: 300}](/articles/images/bulldog_band/hug.webp)](/articles/bulldog-band)

We will be referencing my blog about my time in Bulldog Band as reference
data.

## What Is RAG?

![RAG {priority} {h: 600}](/articles/images/rag-langchain/doge.webp)

Think of RAG like this: Using ChatGPT but it can see your documents folder so
now you can ask what the documents are about.

**Old Regular LLM:** "Based on my training data from 2021, here's what I think..."

**RAG powered LLM:** "Let me check the latest docs first... okay, here's
what's actually happening..."

Great for giving a specific reference to your LLM without having to spend
thousands of dollars on re-training the base LLM.

## My Tech Stack Choices

I will explain my technical choices for this example project. First the imports
for LangChain:

```bash
pip install langchain-text-splitters langchain-community langgraph
```

### LLM Model

Core LLM component to receive inputs and return responses.

I chose
[Gemini](https://python.langchain.com/docs/integrations/chat/mistralai/) for
the LLM Model because I already have a baseline for its performance beforehand.
And also Gemini is fairly cheap. The Embedding Model that is compatible with
Gemini is also ranked at the highest of today's models: [MTEB
Leaderboard](https://huggingface.co/spaces/mteb/leaderboard) (as of July 2025).

But you can find the list of [available models at
langchain.com](https://python.langchain.com/docs/integrations/chat/).

Some models are APIs such as
[Llama](https://python.langchain.com/docs/integrations/chat/llama_api/) or
[OpenAI](https://python.langchain.com/docs/integrations/chat/openai/).

Some models are locally hosted through
[Ollama](https://python.langchain.com/docs/integrations/chat/ollama/). I point
out Ollama because this dependency opens up Ollama's local hosting capabilities
which is a whole huge list itself: [Ollama models](https://ollama.com/library).

```bash
pip install "langchain[google-genai]"
```

```python
from langchain.chat_models import init_chat_model
from langchain_core.language_models.chat_models import BaseChatModel


MODEL_NAME: str = "gemini-2.0-flash"
MODEL_PROVIDER: str = "google_genai"

# Full list: https://python.langchain.com/docs/integrations/chat/
llm: BaseChatModel = init_chat_model(MODEL_NAME, model_provider=MODEL_PROVIDER)
```

[Full list of LLM Models](https://python.langchain.com/docs/integrations/chat/)

### API key

Depending on the model, you may need an API key.

- Gemini API Key: [https://ai.google.dev/gemini-api/docs/api-key](https://ai.google.dev/gemini-api/docs/api-key)

### Embedding Model

Encoding model which translates human-readable text to a hash which can be
scored to indicate relationships.

For example, "dog" and "cat" may be given a score of 0.7 because they are
both animals, both are common pets, but are different species as per the
training data.

"Cat" and "cow" may be given a score of 0.2 because though they are both
animals, they are less seen together in the training data.

Some of these algorithms for measuring similarity include [Co-sine
Similarity](https://tomhazledine.com/cosine-similarity-alternatives/#cosine-similarity)
and [Euclidean
Distance](https://tomhazledine.com/cosine-similarity-alternatives/#euclidean-distance).

Technically embeddings and models are interchangeable as longs as the outputs
are the size the model expects.

- Embedding outputs match size (384, 1024, etc.)
- Do not change your embedding model suddenly. The embeddings outputs are unique
  to the model so switching models without re-embedding the vector database will
  not work.

```bash
pip install langchain-google-genai
```

```python
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import os

# Full list: https://python.langchain.com/docs/integrations/text_embedding/
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001",
    # Make sure to set this in your environment or set this variable in your code.
    api_key=os.getenv("GOOGLE_API_KEY"),
)
```

[Full list of Embedding Models](https://python.langchain.com/docs/integrations/text_embedding/)

### Vector database

Embeddings turn regular text into coordinates in high-dimensional space where
similar concepts end up close together.

There are many choices for vector databases:

- [Chroma](https://python.langchain.com/docs/integrations/vectorstores/chroma/)

  - Simple setup
  - Local storage in the form of a SQLite file

- [Pinecone](https://python.langchain.com/docs/integrations/vectorstores/pinecone/)

  - Cloud store only with a [local emulator version](https://docs.pinecone.io/guides/operations/local-development)
  - Free tier then you pay for the storage
  - Pricing model is based off monthly minimum usage

- [FAISS](https://python.langchain.com/docs/integrations/vectorstores/faiss/)

  - Simple setup
  - Local vector store

- [Qdrant](https://python.langchain.com/docs/integrations/vectorstores/qdrant/)

  - Cloud vector store or locally hosted with Docker
  - Cloud managed service version has 1GB free
  - Cloud managed service has straight-forward pricing by the hour

Generally speaking, all these services offer about the same features. The
biggest differences are the adjacent features and ability how to deploy. For
example, Qdrant can be run on Docker easily while Pinecone has an emulator for
local development.

I chose Chroma for this demo because it is local and simple. Chroma generates a
local SQLite file for persistence so be aware when a new file pops up in your
project.

For more complex use cases, you can use a cloud vector store like Pinecone or if
you have a Docker Compose or Kubernetes setup, you can use Qdrant.

```bash
pip install langchain-chroma
```

```python
from langchain_chroma import Chroma

vector_store = Chroma(
    collection_name="example_collection",
    embedding_function=embeddings,
    persist_directory="./chroma_langchain_db",  # Keeps a local SQLite file.
)
```

[Full list of Vector Stores](https://python.langchain.com/docs/integrations/vectorstores/)

## Building the Actual RAG Pipeline

### Feeding Data

We need reference data to give the RAG to work with. In this demo, I will use a
couple of my own blog posts featured on
[xaviercollantes.dev](https://xaviercollantes.dev).

```bash
pip install langchain-community langchain-text-splitters bs4
```

```python
import bs4
from langchain_core.documents import Document
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Some URLs will be blocked by my "Prove You're Human" bot-prevention.
loader: WebBaseLoader = WebBaseLoader(
    web_paths=(
        "https://xaviercollantes.dev/articles/bulldog-band",
        "https://xaviercollantes.dev/articles/faxion-ai",
        "https://xaviercollantes.dev/articles/measuring-tokens",
        "https://xaviercollantes.dev/articles/rpi-camera",
    ),
)
docs: list[Document] = loader.load()
```

Your output will look like this:

```txt
[Document(metadata={'source': 'https://xaviercollantes.dev/articles/bulldog-band', ...'),
 Document(metadata={'source': 'https://xaviercollantes.dev/articles/faxion-ai', ...),
 Document(metadata={'source': 'https://xaviercollantes.dev/articles/measuring-tokens', ...),
 Document(metadata={'source': 'https://xaviercollantes.dev/articles/rpi-camera', ...)]
```

### Chunking Words (optional)

This step included because about a year ago, LLMs did not have a big enough
context window to work with. So if we did this then, we would have to split the
documents into smaller chunks.

**NOTE:** This might still be needed if your input is too long.

See my other blog on LLM Tokens if your input is too long for a specific LLM:
[Measuring Tokens](/articles/measuring-tokens)

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

text_splitter: RecursiveCharacterTextSplitter = RecursiveCharacterTextSplitter(
    chunk_size=200,
    chunk_overlap=50
)
docs: list[Document] = text_splitter.split_documents(docs)
print(f"Divided the 1 document into {len(docs)} chunks.")
```

### Upload to Vector Store

Now we can add the documents to the vector store.

```python
doc_ids: list[str] = vector_store.add_documents(documents=docs)
print(f"Document IDs: {len(doc_ids)}: {doc_ids}")
```

You can test the vector store by searching for a document.

```python
vector_store.similarity_search("What is Bulldog Band?")
```

Returns documents in order from most relevant to least relevant.

```txt
[Document(id='4d2d84a1-d93b-4342-90d6-812047d56882', metadata={'language': 'en-US', 'source': 'https://xaviercollantes.dev/articles/bulldog-band', 'title': 'Bulldog Band -
 Document(id='d9bc138c-7330-47aa-8e64-42cdfda26799', metadata={'description': 'Tokens mean $$$ and how to measure them.', 'title': 'Measuring Tokens in LLMs - Xavier Collant
 Document(id='7f72ab32-c2bb-424e-9aac-0f821ae222aa', metadata={'description': 'Architecting and leading the development of a groundbreaking AI fashion platform that reduce
 Document(id='69d83587-f15a-4e27-a9fe-88d4ab0ca553', metadata={'title': 'FastAPI: Build your own APIs - Xavier Collantes', 'source': 'https://xaviercol
```

**Pitfall:** If your LLM and Embedding Model are not compatible, you will get an
error:

```txt
InvalidArgumentError: Collection expecting embedding with dimension of 1024, got 3072
```

Potential solutions:

- Clear out the vector store since once you add documents, you cannot change the
  embedding model size.
- Make sure the Embedding Model is compatible with the LLM

### Asking the LLM

### Build the Prompt

LangChain has many "prompt management" features such as being able to pull
prompts from a hub like Gits with Github (see `LangChain Hub`). LangChain also
has a built-in prompt template for RAG.

```python
from langchain_core.messages import BaseMessage
from langchain_core.prompts import ChatPromptTemplate

# Create your own RAG prompt template.
custom_prompt: ChatPromptTemplate = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a helpful assistant that can answer questions about Xavier's blogs.\n\nContext:\n{context}",
        ),
        (
            "human",
            "{question}",  # This is not Python string interpolation.
        ),
    ]
)
```

### Retrieve Context

Now we write some helper functions to retrieve the context and generate an
answer.

This will use Pydantic to define data types.

```python
from pydantic import BaseModel, Field

class State(BaseModel):
    """State for the application."""

    question: str = Field(default="", description="The user's input text.")
    context: list[Document] = Field(
        default_factory=list,
        description="The documents retrieved from the vector store.",
    )
    answer: str = Field(default="", description="The LLM's answer to the question.")


def retrieve_context(state: State) -> dict:
    """Retrieves the most relevant documents from the vector store."""

    retrieved_docs: list[Document] = vector_store.similarity_search(state.question)
    # List of documents which are the most relevant to the question.
    # "context" is the key for the value being returned and matches the key in
    # the State object.
    # print(f"Retrieved {len(retrieved_docs)} documents: {retrieved_docs}")
    return {"context": retrieved_docs}


def generate(state: State, prompt: ChatPromptTemplate, llm: BaseChatModel) -> dict:
    """Performs the actual query to LLM."""

    docs_content: str = "\n\n".join(doc.page_content for doc in state.context)
    messages: list = prompt.invoke(
        {"question": state.question, "context": docs_content}
    )
    response = llm.invoke(messages)
    # "answer" is the key for the value being returned and matches the key in
    # the State object.
    # print(f"Generate: {response.content}")
    return {"answer": response.content}
```

## FINALLY: Asking the LLM

```python
### PLACE YOUR QUESTION HERE ###
input_chat: str = "Where did Bulldog Band travel to?"
```

Run the helper functions to retrieve the context and generate an answer.

```python
state: State = State(question=input_chat)

# Get relevant context using helper function.
context_result: dict = retrieve_context(state)
state.context = context_result["context"]

# Generate answer using helper function.
answer_result: dict = generate(state, custom_prompt, llm)
state.answer = answer_result["answer"]

# LangChain output is in a weird format.
answer_words: list[str] = state.answer.split(" ")
output_lines: str = ""
line_len: int = 10
curr_words: int = 0
for word in answer_words:
    curr_words -= 1
    output_lines += word + " "
    if curr_words == 0:
        output_lines += "\n"
        curr_words = line_len

# This is the final answer.
print(output_lines)
```

Result should look like this:

```txt
The Bulldog Band traveled to a handful of cities across the United States, including:
*   Las Vegas
*   San Jose
*   Chicago
*   Phoenix
```

Which is true, by the way. Confirm at [Bulldog Band](/articles/bulldog-band).

![Commercial](/articles/images/bulldog_band/commercial.webp)

### LangGraph

```python
from langgraph.graph import START, StateGraph

# Chain everything together
graph_builder = StateGraph(State).add_sequence([retrieve_context, generate])
graph_builder.add_edge(START, "retrieve_context")
graph = graph_builder.compile()

# One-liner execution
question = "what are the components?"
result = graph.invoke({"question": question})
```

LangGraph is pretty slick. It handles the state management and gives you a nice
visual representation of what's happening.

## What I Learned

### Chunk Size Is Everything

Small chunks (200 chars) gave me super precise context but required better
ranking. It is like the difference between having a detailed index vs. chapter
summaries in a book. Both have their place.

### Vector Stores Same But Different

Different vector stores have different features and use cases.

- Local stores (Chroma, FAISS): Great for development, terrible for production
  scale
- Cloud stores (Pinecone, Qdrant): Expensive but probably necessary for real apps
- In-memory LangGraph option: Perfect for experimenting, useless for persistence

### Prompt Engineering Is Still Crucial

How you structure the prompt for RAG makes a huge difference. You need to be
explicit about using the retrieved context and handling cases where the context
doesn't contain the answer.

## Next Steps

- **Multi-step reasoning** - Let the AI ask follow-up questions if needed
- **Smarter context filtering** - Pick the best chunks, not just the first few
- **Build UI or connect to webapp** - For user-facing apps in a chat interface

## Further Reading

[https://python.langchain.com/docs/tutorials/rag](https://python.langchain.com/docs/tutorials/rag)

[LangChain: RAG](https://python.langchain.com/docs/concepts/rag/)

[LangSmith](https://docs.smith.langchain.com/)

[Chroma: Getting Started](https://docs.trychroma.com/docs/overview/getting-started)

[AWS: What is LangChain?](https://aws.amazon.com/what-is/langchain/)
