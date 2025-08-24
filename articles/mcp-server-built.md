---
title: "How I Built My Own MCP Server"
cardDescription: "MCP server for embedding free stock images in Claude Code."
author: Xavier Collantes
dateWritten: 2025-08-24
cardPageLink: "/articles/mcp-server-built"
articleType: BLOG
imagePath: "/assets/images/mcp-server-built/"
tagIds:
  - thingsIBuilt
  - llm
  - ai
  - ml
  - machine-learning
  - mcp
  - api
  - automation
  - claude
  - cursor
---

## Image Automation

![Programming Workspace {priority}](/assets/images/mcp-server-built/programming-workspace.webp)

If you are reading this, you know I write technical blogs. One task I loathe is
having to find free stock images for my blogs.

<callout
  type="note"
  description="Blog-ception: This blog article's images excluding screenshots
  will be populated using this MCP server.">
</callout>

## Old Process

1. Google Search for free stock images usually with Unsplash or Pexels
2. Download the image to assets directory
3. Convert image to WEBP format for faster web loading
4. Find appropriate place in blog (I tend to have a pattern for placement)
5. Add markdown image tag (I built the portfolio so Markdown blogs convert to React/MaterialUI)
6. Format size and alt text
7. Repeat for 4 to 8 images per blog

<callout
  type="article"
  description="See how I built this portfolio website"
  url="/articles/portfolio"
  urltext="See blog">
</callout>

## New Process

1. (One time only) Add project level `.claude/webp.md` settings prompt on how to
   convert images to WEBP format
2. Tell Claude Code to add images for a blog page

## My Setup

My development setup is a Cursor IDE, but I use Claude Code for MCP integration.

<callout
  type="note"
  description="I use Cursor as the IDE but Claude Code for the MCP server with
  Claude Code running in the IDE terminal.">
</callout>

## Creating The MCP Server

![Server Development {h: 400}](/assets/images/mcp-server-built/server-development.webp)

### Create GitHub Repository

I started a new GitHub repository for the MCP server.

[github.com/xcollantes/free-stock-images-mcp](https://github.com/xcollantes/free-stock-images-mcp)

I used the MCP Python SDK:

```bash
# Create virtual environment.
python3 -m venv env
source env/bin/activate

# Install dependencies.
pip install mcp requests pydantic
```

In
[src/server.py](https://github.com/xcollantes/free-stock-images-mcp/blob/b55f8f14718cf019d6d40a874183b238929f6b8b/src/server.py)
the core of the MCP server is implemented.

### Functions Marked For MCP

There are Python decorators to specify the MCP functions.
The MCP Client will look to these functions to figure out what tools are
available.

```python
@server.list_resources()
async def handle_list_resources() -> list[Resource]:
    """List available stock image sources."""

@server.read_resource()
async def handle_read_resource(uri: AnyUrl) -> str:
    """Read resource content for stock image sources."""

@server.call_tool()
async def handle_call_tool(name: str, arguments: dict[str, Any] | None) -> list[TextContent]:
    """Handle tool calls."""
```

This structure highlights the major difference between traditional REST API
rigid structure request and responses which is typically in JSON format.

Notice the response of the `handle_call_tool(...)` function is a `TextContent`
object. This response is more compatible with LLMs since they receive text-based
inputs.

### Test The Implementation

I tested the MCP server by running it in the terminal:

```bash
env/bin/python3 src/server.py
```

At this point, I am just looking for syntax errors. Since we need to setup the
MCP Client, either in Cursor, Claude Code, or Claude Desktop, we can test the
MCP server.

## (Optional) Adding Custom Commands To Claude Code

I added a custom command to Claude Code to convert images to WebP format. This
way, the same tool is used to convert images.

<callout
  type="tip"
  description="I had difficulty when I did not explicitly tell Claude Code to
  use the 'magick' tool. Claude would attempt to use non-installed commands.">
</callout>

I added the prompt to the `.claude/webp.md` file for the repo directory.

```markdown
# Convert To WebP

Look at the directory public/assets/images/ and check for images that are not in
WebP format.
You can skip any non-image files, files that are already WebP, or GIFs.
SKIP GIFs.

Example:

magick convert input.png -quality 70 output.webp && rm input.png

You can delete the original file after converting to WebP.
When you have finished, show the amount and percentage of saved space from images
converted.
```

After adding, the command can be called in Claude Code input:

![Webp command {h: 400}](/assets/images/mcp-server-built/webp.webp)

## Attaching The MCP Server

I have an in-depth blog on how to do this, but for this project I will walk
through the steps.

<callout
  type="article"
  description="How to connect to MCP servers in Cursor."
  url="/articles/mcps-connect"
  urltext="See blog">
</callout>

### Running The MCP Server

Make sure the MCP server is running if it requires to be running locally. The
documentation for the MCP server will tell you if it requires to be running
locally.

For this example, I need to run:

```bash
env/bin/python3 src/server.py
```

### Add The MCP Server To Client

In this case, I am using Claude Code but any client that supports MCP will work.

In Claude Code, there are a couple ways to add the MCP server. I added directly
to the `~/.claude.json` file.

There are many files you could possibly add the MCP server to because Claude
Code allows you to add at a project, user, or global level. In my choice, I
added to the user level.

<callout
  type="note"
  description="The mcpServers field may exist at different places in the file. Use
  the highest level of the file for user level config.">
</callout>

The MCP server is added to the `mcpServers` object.

```json
{
  "mcpServers": {
    "free-stock-images": {
      "command": "/Users/me/Projects/free-stock-images-mcp/env/bin/python3",
      "args": ["/Users/me/Projects/free-stock-images-mcp/src/server.py"]
    }
  }
}
```

<callout
  type="note"
  description="You may need to use full paths. Note that I reference the `env/bin/python3`
  in the command field. I wanted to be explicit to use the executable in the
  virtual environment which has the dependencies.">
</callout>

[Claude Code docs](https://docs.anthropic.com/en/docs/claude-code/mcp#installing-mcp-servers)

### Verify The MCP Server Recognized

I can verify the MCP server is recognized by running:

<callout
  type="tip"
  description="Completely quit and restart the client for config changes to take
  effect.">
</callout>

```bash
claude mcp list
```

## Calling the MCP Server

I prompt Claude Code to add images to the blog.

![MCP Server Prompt](/assets/images/mcp-server-built/prompt.webp)

The code to add the Markdown images works well:

![MCP Server Images](/assets/images/mcp-server-built/free-stock-working.webp)

The code diff is seen here in the blog:

![MCP Server Markdown](/assets/images/mcp-server-built/add-markdown.webp)

![MCP Server Working Example](/assets/images/mcp-server-built/image.webp)

### Errors

I had to disable my other MCP servers which were returning errors. The errors
on my Brave Search MCP were blocking the Free Stock Images MCP server from
running.

## Results

Overall, I am happy with the results. My goal shortening "Old Process" by any
amount of time is mission accomplished.

But there are some shortfalls I have found in the process:

Image selection can be low quality. Some of the images had watermarked text
which I removed the image manually from the blog.

The images were not topical to the blog 30% of the time. For example, an image I
dropped from the final blog was a picture of a steel factory. Perhaps the
blog talked about "building" and a factory was chosen.

## Pitfalls

**Error when calling the MCP server**

Make sure you are running the MCP server locally. In this example, we use Python
to run locally. Some MCP local servers may require npm or some other package to
run.

**My specific MCP server will not run. Instead other MCP servers run**

Use more explicit prompts to the MCP server. In this example, I had to say the
words "Unsplash free stock images" to get the MCP server to run.

## Next Steps

- Add to Claude Desktop for searches
- Refine types of images returned
- Convert to WEBP format on the server side

## Further Reading

[Model Context Protocol Documentation](https://modelcontextprotocol.io/)

[Claude Desktop MCP
Guide](https://support.anthropic.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)

[Cursor MCP
Documentation](https://docs.cursor.com/context/model-context-protocol)

[MCP Server Directory](https://cursor.directory/mcp)
