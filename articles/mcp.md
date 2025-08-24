---
title: "MCPs: Giving Your LLMs Tools To Work"
cardDescription: "'Create a new branch and add the feature described in JIRA issue WEB-123 and create a PR on GitHub.'"
author: Xavier Collantes
dateWritten: 2025-08-23
cardPageLink: "/articles/mcp"
articleType: BLOG
imagePath: "/assets/images/mcp/"
tagIds:
  - llm
  - ai
  - ml
  - machine-learning
  - ai-agents
  - mcp
  - databases
  - api
---

## What is MCP?

Model Context Protocol (MCP) is a way for LLMs to interact with external
tools and services. There are times you may want to instruct or ask an LLM like
ChatGPT about something that is not in its training data. MCPs act as a bridge
between the LLM and the external tool or service greatly increasing the
capabilities of the LLM.

<callout
  type="note"
  description="The MCP standard was created by Anthropic in November 2024, the
  company behind Claude. It is now an open standard and maintained by many LLM
  providers such as Google Deepmind and OpenAI.">
</callout>

## Prompts Examples With MCPs

<callout
  type="example"
  description="Create a new branch and add the feature described in JIRA issue
  WEB-123 and create a PR on GitHub.">
</callout>

- [GitHub MCP](https://github.com/github/github-mcp-server/blob/main/README.md)
- [Atlassian Jira MCP](https://www.atlassian.com/blog/announcements/remote-mcp-server)

<callout
  type="example"
  description="Update the documentation page for the app deployment process in
  Notion called 'How to deploy the app' with changes in the Github Actions.">
</callout>

- [Notion MCP](https://developers.notion.com/docs/get-started-with-mcp)
- [GitHub MCP](https://github.com/github/github-mcp-server/blob/main/README.md)

<callout
  type="example"
  description="Update the MailChimp email template based on the new Figma designs
  that were posted in Slack from the marketing team.">
</callout>

- [MailChimp MCP](https://zapier.com/mcp/mailchimp)
- [Figma MCP](https://www.figma.com/blog/introducing-figmas-dev-mode-mcp-server/)
- [Slack MCP](https://github.com/korotovsky/slack-mcp-server/blob/master/README.md)

## Why Bother With MCPs?

First, AI technology enabled us to have a conversation with a computer through
text input or through voice input. Cool, but what's next? Now we want to use AI
to perform tasks. But like a new employee at a company, we need to give them
tools to work with.

Existing infrastructure such as the ubiquitous REST API is not enough.
Traditional REST APIs are designed for structured input and outputs. Here is an
example of a REST API request and response in Python:

```python
import requests

# Send a POST request to JSONPlaceholder API.
user_data = {
    "title": "My New Post",
    "body": "This is the content of my post",
    "userId": 1
}

# Returns placeholder text data.
response = requests.post(
  "https://jsonplaceholder.typicode.com/posts",
  json=user_data,  # Input parameters for API.
)
new_post = response.json()

print(new_post)
# {
#   'title': 'My New Post',
#   'body': 'This is the content of my post',
#   'userId': 1,
#   'id': 101
# }
```

First problem is LLMs themselves cannot execute code. They can only generate
text. So a layer must be built to handle operations, handle errors, and clean
the response.

Second, the inputs for the API call or `user_data` is strict where it must
follow a certain pattern the receiving API expects.

<callout
  type="note"
  description="In my experience, you can tell the LLM to output a structured
  JSON object reinforced with examples and field names. But in practice, the
  outputs have a high chance of error.">
</callout>

## Overlapping Capabilities

At this point, you may have thought, _But ChatGPT can reference the internet and
current events, so why do I need MCP?_

### Built-In Capabilities

With products like ChatGPT and Gemini, OpenAI and Google respectively, put the
LLM behind a layer which interacts with APIs such as NewsAPIs, Wikipedia, and
Search Engine APIs. But if you want to use the LLM to perform tasks as YOU on
YOUR accounts, those products are not authorized. Refer back to our example:
_Update the documentation page for the app deployment process in Notion called
'How to deploy the app' with changes in the Github Actions._ How does ChatGPT or
any other LLM know to use YOUR Github and Notion accounts?

### Execution Through The Command Line

Without MCPs, products like Claude Code or Cursor can actually perform the tasks
like _Create a new branch and add the feature described in Github Issue #2517 in
my repo called 'hello-world'._

This is because Claude Code or Cursor can access the command line terminal which
opens up access to any tool installed on the terminal such as `git` and `gh`
which can run commands to accomplish the tasks. The problem for this method is
not all tools and providers have command line interfaces. Originally command
line tools are meant for human developers not for automated programs like LLMs
to insert commands.

Potentially allowing LLMs to run commands could be a security risk. If an end
user tricks the LLM to run `rm -rf /` or `git push --force`, which could be
disastrous and irreversible to the underlying system.

<callout
  type="warning"
  description="Never let an LLM run commands like `rm -rf /` or `git push --force`,
  or any other destructive commands.">
</callout>

## When Not to Use MCP

MCPs are powerful but not always the right solution. Here are scenarios where
you might want to consider alternatives:

### Simple One-Off Tasks

For quick, manual tasks that you'll only do once, setting up an MCP server might
be overkill. Sometimes it is faster to just do it yourself.

### Real-Time Interactive Tasks

MCPs work through discrete tool calls, which may not be ideal for tasks
requiring real-time feedback or continuous interaction, like live debugging or
interactive design work.

### Security-Critical Operations

While MCPs can be secured, for highly sensitive operations (like financial
transactions or critical system changes), you might want human oversight at
every step rather than automated execution.

<callout
  type="note"
  description="Remember that MCP servers run as separate processes. The LLM only
  sees what the server chooses to return, not the full system context.">
</callout>

## MCP Clients

Just like your favorite web browser, there are MCP clients that you can use to
connect to MCP servers.

At the moment, most clients are chatbot interfaces like ChatGPT and code editing
tools like Cursor.

[pulsemcp.com: Clients](https://www.pulsemcp.com/clients) - A collection of
common MCP clients.

## MCP Servers

If you think of an app or service which you use, there is a good chance that
it has an MCP server and you can offload work to the LLM by connecting your
favorite LLM client to the MCP server.

<callout
  type="article"
  title="Top MCP Servers"
  description="Learn about the MCP servers and how to use them."
  url="/articles/mcp-servers"
  urltext="See blog">
</callout>

## Hands on using MCP

<callout
  type="article"
  title="Connecting to MCP Servers"
  description="Learn how to connect to MCP servers."
  url="/articles/mcps-connect"
  urltext="Continue to blog">
</callout>

## Further Reading

[Model Context Protocol: Getting Started](https://modelcontextprotocol.io/docs/getting-started/intro)

[Anthropic: Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)

[DataCamp: Top MCP Servers and Clients](https://www.datacamp.com/blog/top-mcp-servers-and-clients)

[API Dog: Top 10 MCP Servers](https://apidog.com/blog/top-10-mcp-servers/)
