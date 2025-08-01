---
title: "Choosing Embedding Models for Production: Lessons from the Trenches"
cardDescription: "How I evaluated and selected embedding models for real-world RAG systems."
author: Xavier Collantes
dateWritten: 2025-01-15
cardPageLink: "/articles/choosing-embeddings-for-production"
articleType: BLOG
imagePath: ""
tagIds:
  - ai
  - llm
  - embeddings
  - rag
  - ml
  - python
---

After building several production RAG systems, I've learned that choosing the right embedding model can make or break your application's performance. Here's my systematic approach to evaluating embedding models and the hard-won lessons from deploying them at scale.

## Why Embedding Choice Matters More Than You Think

Most developers start with whatever embedding model they find in the first tutorial. I did too. But when you're serving real users with real queries, that "good enough" choice can cost you:

- **Relevance failures**: Users ask about "customer churn" but your model doesn't connect it to "user retention"
- **Language gaps**: Your model works great in English but fails on Spanish customer support tickets  
- **Domain mismatches**: A model trained on Wikipedia struggles with your technical documentation
- **Cost overruns**: High-dimensional embeddings that don't improve performance but double your storage costs

## My Evaluation Framework

After getting burned by poor embedding choices in production, I developed a systematic evaluation process:

### 1. Performance Metrics That Actually Matter

```python
class EmbeddingEvaluator:
    def __init__(self, test_queries, ground_truth_docs):
        self.test_queries = test_queries
        self.ground_truth = ground_truth_docs
    
    def evaluate_model(self, embedding_model, vector_store):
        results = {}
        
        # Retrieval accuracy at different k values
        for k in [1, 3, 5, 10]:
            precision_at_k = self.calculate_precision_at_k(
                embedding_model, vector_store, k
            )
            results[f"precision_at_{k}"] = precision_at_k
        
        # Mean Reciprocal Rank - where does the first relevant doc appear?
        results["mrr"] = self.calculate_mrr(embedding_model, vector_store)
        
        # Latency - real users care about speed
        results["avg_latency_ms"] = self.measure_latency(embedding_model)
        
        return results
```

### 2. Domain-Specific Testing

Generic benchmarks lie. I learned this the hard way when a model that scored great on academic benchmarks failed miserably on our customer service tickets.

```python
# Test with your actual data, not generic benchmarks
domain_queries = [
    ("How do I cancel my subscription?", "cancellation_docs"),
    ("Why is my API rate limited?", "rate_limiting_docs"),
    ("Integration with Salesforce", "integration_docs")
]

def test_domain_relevance(embedding_model):
    """Test how well the model understands your specific domain."""
    for query, expected_category in domain_queries:
        embedding = embedding_model.embed_query(query)
        top_results = vector_store.similarity_search_by_vector(embedding)
        
        # Does the top result match the expected category?
        actual_category = classify_document(top_results[0])
        accuracy = (actual_category == expected_category)
        
        print(f"Query: {query}")
        print(f"Expected: {expected_category}, Got: {actual_category}")
        print(f"Match: {accuracy}\n")
```

## The Models I Tested

### OpenAI text-embedding-ada-002: The Reliable Workhorse

**Strengths:**
- Consistently good performance across domains
- Excellent multilingual support
- Well-documented and stable API
- 1536 dimensions - good balance of performance and efficiency

**Weaknesses:**  
- API dependency and potential costs at scale
- Black box - can't fine-tune for your specific domain
- Requires internet connectivity

```python
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_openai_embedding(text: str) -> List[float]:
    response = client.embeddings.create(
        model="text-embedding-ada-002",
        input=text
    )
    return response.data[0].embedding

# Performance in my tests:
# Precision@5: 0.78
# Average latency: 145ms
# Cost: $0.0001 per 1k tokens
```

**When I Use It:** Client projects where reliability matters more than cost optimization, or when dealing with multilingual content.

### Sentence-Transformers: The Customizable Option

**Strengths:**
- Run locally - no API costs or dependencies
- Huge selection of pre-trained models
- Can fine-tune on your specific data
- Various sizes for different speed/accuracy tradeoffs

**Weaknesses:**
- Requires GPU infrastructure for reasonable performance
- Model selection paralysis - too many options
- Quality varies significantly between models

```python
from sentence_transformers import SentenceTransformer

# I tested several models:
models_tested = [
    "all-MiniLM-L6-v2",      # Fast, 384 dimensions
    "all-mpnet-base-v2",     # Balanced, 768 dimensions  
    "multi-qa-mpnet-base-dot-v1",  # Optimized for Q&A
]

def evaluate_sentence_transformer(model_name: str):
    model = SentenceTransformer(model_name)
    
    # Encode test queries
    query_embeddings = model.encode(test_queries, convert_to_tensor=True)
    doc_embeddings = model.encode(test_documents, convert_to_tensor=True)
    
    # Calculate similarity scores
    scores = torch.nn.functional.cosine_similarity(
        query_embeddings.unsqueeze(1), 
        doc_embeddings.unsqueeze(0), 
        dim=2
    )
    
    return calculate_retrieval_metrics(scores)

# Results for my customer service use case:
# all-MiniLM-L6-v2: Precision@5: 0.72, Latency: 23ms
# all-mpnet-base-v2: Precision@5: 0.81, Latency: 67ms  
# multi-qa-mpnet-base-dot-v1: Precision@5: 0.84, Latency: 71ms
```

**When I Use It:** When I need full control over the model, have GPU infrastructure available, or when API costs would be prohibitive.

### Cohere Embed: The Specialized Choice

**Strengths:**
- Excellent for search and retrieval tasks
- Multiple model sizes available
- Good multilingual support
- Competitive pricing

**Weaknesses:**
- Smaller ecosystem compared to OpenAI
- Less documentation and community resources
- API dependency

```python
import cohere

co = cohere.Client(api_key=os.getenv("COHERE_API_KEY"))

def get_cohere_embedding(texts: List[str], input_type: str = "search_document"):
    response = co.embed(
        texts=texts,
        model="embed-english-v3.0",
        input_type=input_type  # "search_document" or "search_query"
    )
    return response.embeddings

# Cohere's input_type parameter is clever - different embeddings for docs vs queries
query_embedding = get_cohere_embedding(["user question"], "search_query")[0]
doc_embeddings = get_cohere_embedding(documents, "search_document")

# Performance in my tests:
# Precision@5: 0.82
# Average latency: 98ms
# Cost: $0.0001 per 1k tokens
```

**When I Use It:** When I need asymmetric embeddings (different for queries vs documents) or when working with search-heavy applications.

## My Real-World Testing Process

### Phase 1: Synthetic Evaluation

```python
def synthetic_evaluation():
    """Quick initial filtering of embedding models."""
    
    # Standard benchmarks for baseline comparison
    benchmark_results = {}
    
    for model in candidate_models:
        # Test on standard datasets
        mteb_score = evaluate_on_mteb(model)
        semantic_similarity = evaluate_semantic_similarity(model) 
        
        benchmark_results[model.name] = {
            "mteb": mteb_score,
            "semantic_sim": semantic_similarity
        }
    
    # Filter out obviously poor performers
    return {k: v for k, v in benchmark_results.items() 
            if v["mteb"] > 0.5 and v["semantic_sim"] > 0.7}
```

### Phase 2: Domain-Specific Testing

```python
def domain_evaluation(shortlisted_models):
    """Test on actual business data and use cases."""
    
    # Load real customer queries and documents
    customer_queries = load_customer_support_queries()
    knowledge_base = load_kb_documents()
    
    results = {}
    for model in shortlisted_models:
        # Create vector store with this model
        vector_store = create_vector_store(model, knowledge_base)
        
        # Test retrieval accuracy
        precision_scores = []
        for query, expected_docs in customer_queries:
            retrieved = vector_store.similarity_search(query, k=5)
            precision = calculate_precision(retrieved, expected_docs)
            precision_scores.append(precision)
        
        results[model.name] = {
            "avg_precision": np.mean(precision_scores),
            "latency": measure_embedding_latency(model),
            "cost_per_1k": estimate_monthly_cost(model)
        }
    
    return results
```

### Phase 3: A/B Testing in Production

```python
class EmbeddingABTest:
    def __init__(self, model_a, model_b):
        self.model_a = model_a
        self.model_b = model_b
        self.results = {"a": [], "b": []}
    
    def handle_query(self, user_query: str, user_id: str):
        # Split traffic 50/50
        model = self.model_a if hash(user_id) % 2 == 0 else self.model_b
        model_name = "a" if model == self.model_a else "b"
        
        # Get results and track user engagement
        results = model.search(user_query)
        engagement = self.track_user_engagement(user_id, results)
        
        self.results[model_name].append({
            "query": user_query,
            "engagement": engagement,
            "timestamp": datetime.now()
        })
        
        return results
    
    def analyze_results(self):
        # Statistical significance testing
        a_engagement = [r["engagement"] for r in self.results["a"]]
        b_engagement = [r["engagement"] for r in self.results["b"]]
        
        return scipy.stats.ttest_ind(a_engagement, b_engagement)
```

## What I Learned the Hard Way

### 1. Dimension Count ≠ Quality

I assumed more dimensions meant better performance. Wrong.

```python
# Tested different dimensional embeddings on the same task:
results = {
    "384d_model": {"precision": 0.79, "storage_gb": 1.2, "latency_ms": 23},
    "768d_model": {"precision": 0.81, "storage_gb": 2.4, "latency_ms": 45},
    "1536d_model": {"precision": 0.82, "storage_gb": 4.8, "latency_ms": 89}
}

# The 384d model was 90% as good with 4x less storage and 4x faster
```

**Lesson:** Higher dimensions have diminishing returns and real infrastructure costs.

### 2. Multilingual Models Aren't Magic

I deployed a "multilingual" model expecting it to handle Spanish queries perfectly. It didn't.

```python
# Performance by language for my "multilingual" model:
language_performance = {
    "english": 0.84,
    "spanish": 0.67,  # Ouch
    "french": 0.71,
    "german": 0.73
}

# Solution: Language-specific fine-tuning or separate models
```

**Lesson:** Test every language you plan to support, not just English.

### 3. Fine-Tuning Can Be Game-Changing

Out-of-the-box models often miss domain-specific relationships.

```python
# Before fine-tuning on our customer support data:
query = "My API key doesn't work"
results = ["API documentation", "Billing FAQ", "Account settings"]

# After fine-tuning:
query = "My API key doesn't work"  
results = ["API key regeneration guide", "Common API errors", "Authentication troubleshooting"]

# Precision@3 improved from 0.33 to 0.89
```

**Lesson:** If you have domain-specific data, invest in fine-tuning.

## My Production Decision Framework

```python
def choose_embedding_model(requirements):
    """Decision tree for production embedding selection."""
    
    if requirements["budget"] == "minimal" and requirements["control"] == "high":
        return "sentence-transformers-local"
    
    elif requirements["languages"] > 3 and requirements["reliability"] == "critical":
        return "openai-ada-002"
    
    elif requirements["search_optimization"] == True:
        return "cohere-embed"
    
    elif requirements["latency"] < 50 and requirements["accuracy"] > 0.85:
        return "fine-tuned-sentence-transformer"
    
    else:
        return "openai-ada-002"  # Safe default
```

## Current Production Setup

For my current RAG systems, I ended up with:

**Customer Support Bot**: Fine-tuned `all-mpnet-base-v2`
- Trained on 50k support ticket pairs
- Precision@5: 0.89 (vs 0.71 baseline)
- Hosted on dedicated GPU instances

**Multilingual Documentation Search**: OpenAI `text-embedding-ada-002`
- Handles 12 languages reliably
- API simplicity worth the cost
- Consistent performance across domains

**High-Volume Analytics**: `all-MiniLM-L6-v2`
- Processing 1M+ documents daily
- Speed matters more than perfect accuracy
- Running on CPU instances for cost efficiency

## The Bottom Line

Choosing embeddings isn't just about model performance - it's about finding the right balance of accuracy, cost, latency, and operational complexity for your specific use case.

My advice:
1. **Start simple** with OpenAI or Cohere for MVPs
2. **Measure what matters** - use your actual data and queries
3. **Consider the full stack** - storage, latency, and infrastructure costs
4. **Plan for growth** - what works at 1k queries/day might not at 100k
5. **Keep experimenting** - the embedding landscape evolves quickly

The "best" embedding model is the one that solves your specific problem within your constraints. Don't get caught up in benchmark chasing - focus on what works for your users and your business.

What embedding challenges have you faced? I'd love to hear about your experiments and production learnings.