---
title: "Build Your Own Search Engine: Databases for AI"
cardDescription: "Comparing vector storage solutions for embeddings and similarity search in AI applications."
author: Xavier Collantes
dateWritten: 2025-08-14
cardPageLink: "/articles/vectorstores"
articleType: BLOG
imagePath: "/assets/images/vectorstores/vector.gif"
tagIds:
  - thingsIBuilt
  - ai
  - llm
  - ml
  - python
  - vector-database
  - qdrant
  - pinecone
  - aws
  - infrastructure
  - machine-learning
  - rag
---

After building production vector search systems with embeddings,
I have discovered that the choice between Qdrant, Pinecone, and AWS OpenSearch
Service fundamentally impacts your application's architecture, budget, and
scalability. This technical deep-dive compares these three leading solutions
across performance, pricing, and production readiness.

## What Is Vector Storage?

Vector Databases, also referred to as Vector Stores, are like conventional SQL
and NoSQL databases where they store large amounts of text data. The biggest
difference is Vector Stores have extra steps to hash the incoming text and then
assign similarity scores based on the topic in the text.

This way, querying the vector database can get results based off of topicality
and similarity.

![Vector Store {priority}](/assets/images/vectorstores/vector-space.webp)

###### [xomnia.com](https://xomnia.com/post/an-introduction-to-vector-databases-for-beginners/)

_Why is this useful?_

Finding related pieces of data given an input text string is the basic function
of a search engine. The best example is a website called
[www.google.com](https://www.google.com/search?q=google+in+1998).
On a basic level, any search engine works this way: a user can give a text
string and get a collection of "documents" based on how closely the text string
is related on the input. But before the user can make any queries, a corpus of
documents have to be collected, embedded, and ranked.

Google's super secret algorithm: [PageRank](https://en.wikipedia.org/wiki/PageRank)

## LLM Connection

Vector Stores have been integral in being the database for [RAG
model](/articles/rag-langchain.md) implementations. This is because LLMs are
cost prohibitive to train from the ground up. So to have a dynamic data
reference, the RAG model leverages vector databases for searching for relevant
data in a corpus.

![RAG](/assets/images/vectorstores/flow.webp)

###### [qwak.com](https://www.qwak.com/post/utilizing-llms-with-embedding-stores)

Think of it as a student taking a test, but has access to the textbook along
with the knowledge he or she already knows.

## Embeddings

Embedding models translate human-readable text to a hash which can be
scored to indicate relationships. There are many types of encoding models, which
vary in speed and ability to interpret topics.

![Embeddings](/assets/images/vectorstores/vector.webp)

###### [xomnia.com](https://xomnia.com/post/an-introduction-to-vector-databases-for-beginners/)

For example, "dog" and "cat" may be given a score of 0.7 because they are
both animals, both are common pets, but are different species as per the
training data.

"Cat" and "cow" may be given a score of 0.2 because though they are both
animals, they are less seen together in the training data.

Some of these algorithms for measuring similarity include [Co-sine
Similarity](https://tomhazledine.com/cosine-similarity-alternatives/#cosine-similarity)
and [Euclidean
Distance](https://tomhazledine.com/cosine-similarity-alternatives/#euclidean-distance).

Technically embeddings and models are interchangeable as long as the outputs
are the size the model expects.

- Embedding outputs match size (384, 1024, etc.)
- Do not change your embedding model suddenly. The embeddings outputs are unique
  to the model so switching models without re-embedding the vector database will
  not work.

## The Vector Store Choices

Vector storage solutions exist on a spectrum from simple in-memory arrays to
enterprise-grade distributed databases.

### Vector Databases

Embeddings turn regular text into coordinates in high-dimensional space where
similar concepts end up close together.

There are many choices for vector databases:

![Chroma {h: 100}](/assets/images/vectorstores/chroma.svg)

[Chroma](https://python.langchain.com/docs/integrations/vectorstores/chroma/)

- Simple setup
- Local storage in the form of a SQLite file

![Pinecone {h: 100}](/assets/images/vectorstores/pinecone.svg)

[Pinecone](https://python.langchain.com/docs/integrations/vectorstores/pinecone/)

- Cloud store only with a [local emulator version](https://docs.pinecone.io/guides/operations/local-development)
- Free tier then you pay for the storage
- Pricing model is based off monthly minimum usage

![FAISS {h: 100}](/assets/images/vectorstores/meta-color.svg)

[FAISS](https://python.langchain.com/docs/integrations/vectorstores/faiss/)

- Simple setup
- Local vector store

![Qdrant {h: 100}](/assets/images/vectorstores/q.svg)

[Qdrant](https://python.langchain.com/docs/integrations/vectorstores/qdrant/)

- Cloud vector store or locally hosted with Docker
- Cloud managed service version has 1GB free
- Cloud managed service has straight-forward pricing by the hour

Generally speaking, all these services offer about the same features. The
biggest differences are the adjacent features and ability how to deploy. For
example, Qdrant can be run on Docker easily while Pinecone has an emulator for
local development.

For more complex use cases, you can use a cloud vector store like Pinecone or if
you have a Docker Compose or Kubernetes setup, you can use Qdrant.

### Local File-Based Solutions: Quick For Experimentation

**When To Use:** Medium datasets (100k-1M vectors), single-machine deployment,
cost-sensitive projects

**Pros:**

- Quick setup
- Handles millions of vectors efficiently
- Free and open source
- Persistent storage

**Cons:**

- Single-machine limitation
- No built-in concurrency control
- Limited query flexibility (no complex filtering for post-query)

In this example, we will use FAISS to build a vector store. FAISS was developed
and open-sourced by Facebook in 2017.

[https://github.com/facebookresearch/faiss](https://github.com/facebookresearch/faiss)

```python
import pickle
import faiss
import numpy as np
from pathlib import Path

class FAISSVectorStore:
    def __init__(self, dimension: int, index_path: str = "vector_index.faiss"):
        self.dimension = dimension
        self.index_path = Path(index_path)
        self.metadata_path = Path(str(index_path).replace('.faiss', '_metadata.pkl'))

        # Initialize FAISS index (HNSW for good speed/accuracy balance)
        self.index = faiss.IndexHNSWFlat(dimension, 32)
        self.metadata = []

        # Load existing index if available
        if self.index_path.exists():
            self.load_index()

    def add_batch(self, vectors: np.ndarray, metadata_list: List[dict]):
        """Add multiple vectors efficiently."""
        # Ensure vectors are float32 (FAISS requirement)
        vectors = vectors.astype(np.float32)

        # Add to FAISS index
        self.index.add(vectors)

        # Store metadata
        self.metadata.extend(metadata_list)

        # Save to disk
        self.save_index()

    def search(self, query_vector: np.ndarray, top_k: int = 5) -> List[Tuple[float, dict]]:
        """Search for similar vectors."""
        query_vector = query_vector.astype(np.float32).reshape(1, -1)

        # FAISS search returns distances and indices
        distances, indices = self.index.search(query_vector, top_k)

        results = []
        for distance, idx in zip(distances[0], indices[0]):
            if idx != -1:  # Valid result
                # Convert distance to similarity (for cosine: similarity = 1 - distance)
                similarity = 1 - distance
                results.append((similarity, self.metadata[idx]))

        return results

    def save_index(self):
        """Persist index and metadata to disk."""
        faiss.write_index(self.index, str(self.index_path))
        with open(self.metadata_path, 'wb') as f:
            pickle.dump(self.metadata, f)

    def load_index(self):
        """Load index and metadata from disk."""
        self.index = faiss.read_index(str(self.index_path))
        with open(self.metadata_path, 'rb') as f:
            self.metadata = pickle.load(f)

# Usage example with realistic data
from sentence_transformers import SentenceTransformer

# Initialize embedding model and vector store
model = SentenceTransformer('all-MiniLM-L6-v2')
store = FAISSVectorStore(dimension=384)  # MiniLM embedding dimension

# Sample documents
documents = [
    "Python is a powerful programming language",
    "Machine learning enables computers to learn",
    "Vector databases store high-dimensional data",
    "FAISS provides efficient similarity search",
    "Natural language processing analyzes text"
]

# Generate embeddings and store
embeddings = model.encode(documents)
metadata = [{"text": doc, "id": i} for i, doc in enumerate(documents)]

store.add_batch(embeddings, metadata)

# Search example
query = "programming languages and coding"
query_embedding = model.encode([query])
results = store.search(query_embedding[0], top_k=3)

print(f"Query: {query}")
for similarity, meta in results:
    print(f"  Similarity: {similarity:.3f} - {meta['text']}")
```

### Specialized Vector Databases: Production-Ready

**When To Use:** Production applications, multi-user systems, complex filtering
needs, distributed deployment

**Pros:**

- Production-ready features (backups, monitoring, clustering)
- Advanced filtering and query capabilities
- Horizontal scaling support
- Built-in security and access controls

**Cons:**

- More complex setup and operations
- Higher resource requirements
- Steeper learning curve

```python
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct, Filter, FieldCondition, MatchValue

class ProductionVectorStore:
    def __init__(self, host: str = "localhost", port: int = 6333):
        self.client: QdrantClient = QdrantClient(host=host, port=port)
        self.collection_name = "documents"

        # Create collection with optimized settings
        try:
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=384,  # Embedding dimension
                    distance=Distance.COSINE
                ),
                # Performance optimizations
                optimizers_config={
                    "default_segment_number": 2,
                    "max_segment_size": 200000,
                    "memmap_threshold": 50000,
                },
                hnsw_config={
                    "m": 16,
                    "ef_construct": 100,
                }
            )
        except Exception:
            # Collection already exists
            pass

    def add_documents(self, documents: List[dict]):
        """Add documents with embeddings and rich metadata."""
        points = []

        for i, doc in enumerate(documents):
            point = PointStruct(
                id=doc.get("id", i),
                vector=doc["embedding"],
                payload={
                    "text": doc["text"],
                    "category": doc.get("category", "general"),
                    "author": doc.get("author", "unknown"),
                    "timestamp": doc.get("timestamp"),
                    "tags": doc.get("tags", [])
                }
            )
            points.append(point)

        # Batch insert with wait for consistency
        self.client.upsert(
            collection_name=self.collection_name,
            points=points,
            wait=True
        )

    def search_with_filters(self,
                           query_vector: List[float],
                           category: str = None,
                           author: str = None,
                           tags: List[str] = None,
                           top_k: int = 5) -> List[dict]:
        """Advanced search with multiple filter conditions."""

        # Build complex filter
        filter_conditions = []

        if category:
            filter_conditions.append(
                FieldCondition(key="category", match=MatchValue(value=category))
            )

        if author:
            filter_conditions.append(
                FieldCondition(key="author", match=MatchValue(value=author))
            )

        if tags:
            from qdrant_client.models import MatchAny
            filter_conditions.append(
                FieldCondition(key="tags", match=MatchAny(any=tags))
            )

        # Create filter object
        search_filter = None
        if filter_conditions:
            search_filter = Filter(must=filter_conditions)

        # Perform search
        results = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_vector,
            query_filter=search_filter,
            limit=top_k,
            with_payload=True
        )

        return [
            {
                "id": result.id,
                "score": result.score,
                "text": result.payload.get("text"),
                "category": result.payload.get("category"),
                "author": result.payload.get("author"),
                "tags": result.payload.get("tags", [])
            }
            for result in results
        ]

# Usage example
store = ProductionVectorStore()

# Sample documents with rich metadata
documents = [
    {
        "id": 1,
        "text": "Introduction to Python programming",
        "embedding": model.encode("Introduction to Python programming").tolist(),
        "category": "programming",
        "author": "jane_doe",
        "tags": ["python", "tutorial", "beginner"]
    },
    {
        "id": 2,
        "text": "Advanced machine learning techniques",
        "embedding": model.encode("Advanced machine learning techniques").tolist(),
        "category": "ai",
        "author": "john_smith",
        "tags": ["ml", "advanced", "algorithms"]
    },
    {
        "id": 3,
        "text": "Database design principles",
        "embedding": model.encode("Database design principles").tolist(),
        "category": "database",
        "author": "jane_doe",
        "tags": ["database", "design", "sql"]
    }
]

store.add_documents(documents)

# Advanced search examples
query_embedding = model.encode("python coding tutorial").tolist()

# Search within programming category
programming_results = store.search_with_filters(
    query_vector=query_embedding,
    category="programming",
    top_k=5
)

# Search for documents by specific author
jane_results = store.search_with_filters(
    query_vector=query_embedding,
    author="jane_doe",
    top_k=5
)

# Search for documents with specific tags
tutorial_results = store.search_with_filters(
    query_vector=query_embedding,
    tags=["tutorial", "beginner"],
    top_k=5
)

print("Programming category results:")
for result in programming_results:
    print(f"  Score: {result['score']:.3f} - {result['text']}")
```

## Conclusion

Vector stores are essential infrastructure for modern AI applications. The key
is matching your choice to your specific requirements:

- **Start simple** with in-memory solutions for prototyping
- **Scale pragmatically** to FAISS or equivalent for medium-sized datasets
- **Go production-ready** with specialized vector databases for enterprise
  applications

The vector storage landscape will continue evolving rapidly, but understanding
these fundamentals will help you make informed decisions regardless of which
specific technologies emerge.

## Further Reading

[https://www.vecdbs.com/](https://www.vecdbs.com/)

[Vector Databases for Beginners](https://xomnia.com/post/an-introduction-to-vector-databases-for-beginners/)

[FAISS: Efficient Similarity Search](https://engineering.fb.com/2017/03/29/data-infrastructure/faiss-a-library-for-efficient-similarity-search/)
