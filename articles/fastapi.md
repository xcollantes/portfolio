---
title: Build your own APIs with FastAPI
cardDescription: "Production ready API serving"
cardPageLink: "/articles/fastapi"
imagePath: ""
articleType: BLOG
author: Xavier Collantes
dateWritten: 2025-05-30
dateLastUpdated: 2025-05-30
tagIds:
  - python
  - apis
---

## FastAPI: Python web framework for heavy duty APIs

FastAPI isn't just fast by name, it's legitimately one of the fastest Python
frameworks out there, rivaling Node.js and Go in performance. But speed isn't
even the best part.

![](https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png)

My favorite features:

- Automatic API documentation (for when the frontend dev asks _can you make me
  some documentation on your API?_)
- Error checking for API argument inputs (no need to handle errors like 405
  Method Not Allowed and many others)
- Type hint support improves code quality and reduces runtime errors
- Built-in support for async/await ensures scalability

## Getting started

Let's build something playful to see FastAPI in action. How about a random cat
fact API? Because why not?

```bash
# Set up your environment.
python3 -m venv env
source env/bin/activate
pip install fastapi uvicorn
```

Now let's build our cat fact API service:

```python
"""The most important API you'll ever build."""

from fastapi import FastAPI, Request
from pydantic import BaseModel
import random
import uvicorn

app: FastAPI = FastAPI(title="Cat Facts API", version="1.0.0")

cat_facts: dict[str] = [
    "Cats sleep 70% of their lives.",
    "A group of cats is called a clowder.",
    "Cats have five toes on their front paws, but only four toes on their back paws.",
    "The world's largest cat measured 48.5 inches long.",
    "Cats have whiskers on the backs of their front legs as well.",
    "A house cat can run to the speed of about 30 mph over short distances.",
    "Cats can make over 100 different sounds.",
    "The first cat in space was a French cat named Felicette (a.k.a. 'Astrocat') in 1963.",
]

class CatFact(BaseModel):
    """Data type for holding fact and ID."""

    cat_fact: str
    fact_id: int


@app.get("/", response_model=CatFact)
async def get_random_cat_fact():
    """Get a random cat fact because the internet needs more cats."""

    # Randomly grab a fact on each call.
    fact: str = random.choice(cat_facts)

    # Fact ID is random number as well.
    #
    # Output:
    # {
    #   "cat_fact": "Cats sleep 70% of their lives.",
    #   "fact_id": 542
    # }
    return CatFact(cat_fact=fact, fact_id=random.randint(1, 1000))


if __name__ == "__main__":
    # `host` Running on any local IP address or `localhost` aka `127.0.0.1`.
    # `port` Some port not being used by another program on your computer.
    # `reload` Development only. When you make changes to the code, the server
    #       will reload with new  changes instead of shutting down this Python
    #       code then starting back up again.
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
```

Run it and watch the magic happen:

```bash
python main.py
```

Next, open your browser and navigate to `http://localhost:8000`.

You should see a simple string in the browser with a cat fact.

Now for the bonus... in as a backend engineer (which you are now given your
backend cat server) the frontend team may ask _Can I please have documentation
so I can see what the API endpoint is called and what arguments is takes?_

Navigate to `http://localhost:8000/docs` and BAM! You've got interactive API
documentation.

## Real-world patterns that actually matter

Let's graduate from cat facts to something more enterprise-y. Here's how you
handle different HTTP methods like a pro:

```python
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Query

app = FastAPI()

class UserRequest(BaseModel):
    name: str
    email: str
    age: int

# GET with query parameters.
@app.get("/users")
async def get_users(name: str = None, age: int = Query(None, ge=0, le=120)):
    """Get users with optional filtering."""
    # Your database magic here.
    return {"message": f"Finding users named {name}, age {age}"}

# POST with request body.
@app.post("/users")
async def create_user(user: UserRequest):
    """Create a new user."""
    # Pydantic automatically validates the request body.
    if user.age < 0:
        raise HTTPException(status_code=400, detail="Age cannot be negative")

    return {"message": f"Created user {user.name} with email {user.email}"}
```

## File uploads

Need to handle file uploads?

```python
from fastapi import FastAPI, File, UploadFile
import boto3
from botocore.exceptions import ClientError

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload files to S3 or Supabase (both use boto3)."""

    # Setup your AWS S3 bucket storage.
    s3_client = boto3.client(
        "s3",
        # Get from AWS, Supabase, Firestore, or whatever storage you choose.
        endpoint_url="https://your-project.supabase.co/storage/v1/s3",
        aws_access_key_id="your-key",
        aws_secret_access_key="your-secret",
    )

    try:
        s3_client.upload_fileobj(file.file, "your-bucket", file.filename)
        return {"message": f"Successfully uploaded {file.filename}"}

    except ClientError as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {e}")
```

## Bridging Python and JavaScript like a boss

Python programmers will usually use snake_case or camelCase where JavaScript
programmers will usually use camelCase for everything... so if data is moving
between a Python backend and JavaScript frontend... do we all now have to choose
the same case? Not with FastAPI.

Working with a JavaScript frontend? FastAPI plays nice with camelCase while
keeping your Python snake_case:

```python
from pydantic import BaseModel, ConfigDict
import datetime

def to_camel_case(string: str) -> str:
    """Convert snake_case to camelCase."""
    components: str = string.split('_')
    return components[0] + ''.join(word.capitalize() for word in components[1:])

class UserResponse(BaseModel):

    # Config for model to transform the outputs.
    model_config = ConfigDict(
        # Provide function.
        alias_generator=to_camel_case,
        # Accept both camelCase and snake_case.
        populate_by_name=True,
    )

    # Python uses snake_case.
    # JavaScript gets camelCase.
    first_name: str
    last_name: str
    birth_date: datetime.date

@app.get("/user", response_model=UserResponse)
async def get_user():
    return UserResponse(
        first_name="Winston",
        last_name="Wolf",
        birth_date="1994-10-14"
    )

# Frontend receives: {"firstName": "Winston", "lastName": "Wolf", "birthDate": "1994-10-14"}
```

## Advanced patterns for serious infrastructure

When you're ready to build production-grade services, FastAPI has your back:

```python
import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Setup and teardown for your app."""

    # Startup: Initialize databases, message queues, etc.
    print("🚀 Starting up the spaceship...")
    # await setup_database()
    # await setup_kafka_consumers()

    yield  # Your app runs here

    # Shutdown: Clean up resources
    print("🛬 Landing the spaceship...")
    # await cleanup_resources()

app = FastAPI(lifespan=lifespan)
```

## Development workflow that doesn't suck

Enable auto-reload during development and thank me later:

```python
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Auto-restart on file changes
    )
```

Or run it from the command line:

```bash
uvicorn main:app --reload --port 8000
```

## Why your Python infrastructure needs FastAPI

Building microservices? FastAPI makes service-to-service communication a breeze
with automatic request/response validation. Building a monolith? The performance
characteristics mean you can handle serious traffic without the complexity of
async frameworks.

The real win is developer productivity. Type hints catch errors at development
time, automatic docs mean your API is self-documenting, and the async support
means you can integrate with modern Python tools like SQLAlchemy 2.0, httpx, and
async Redis clients.
