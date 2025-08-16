---
title: "Qdrant vs AWS S3 Vector Store"
cardDescription: "Comparing the recently released AWS S3 Vector Store to Qdrant."
author: Xavier Collantes
dateWritten: 2025-08-15
cardPageLink: "/articles/qdrant_awsvector"
articleType: BLOG
imagePath: "/assets/images/qdrant_awsvector/qdrant_awsvector.png"
tagIds:
  - ai
  - llm
  - ml
  - python
  - vector-database
  - qdrant
  - aws
  - aws-s3
  - infrastructure
  - machine-learning
  - rag
---

## What is a Vector Database?

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

## What is Qdrant?

Qdrant is a vector database that allows you to store and query vectors. It is a
popular choice for building RAG applications.

## What is AWS S3 Vector Store?
