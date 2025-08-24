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
  - ai-agents
  - mcp
  - databases
  - api
  - claude
  - cursor
---

## Image Automation

If you are reading this, you know I write technical blogs. One task I loath is
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
4. Find appropriate place in blog
5. Add markdown image tag
6. Format size and alt text
7. Repeat for 4 to 8 images per blog

## New Process

1. (One time only) Add project level `.claude/webp.md` settings prompt on how to
   convert images to WEBP format
2. Tell Claude Code to add images for a blog page

## My Setup

My development setup is a Cursor IDE but I use Claude Code

<callout
  type="note"
  description="I use Cursor as the IDE but Claude Code for the MCP server.">
</callout>

## Creating The MCP Server

### Create Github Repo

### Install MCP Server Library

### Test

## (Optional) Adding Custom Commands to Claude Code

I added a custom command to Claude Code to convert images to WEBP format. This
way, the same tool is used to convert images.

<callout
  type="tip"
  description="I had difficulty when I did not explicitly tell Claude Code to
  use the 'magick' tool. Claude would attempt to use non-installed commands.">
</callout>

````markdown
# WebP

## Convert to WebP

Look at the directory public/assets/images/ and check for images that are not
WebP format.

You can skip any non-image file, files that are already WebP, or GIFs.

SKIP GIFs.

Example:

```bash
magick convert input.png -quality 70 output.webp && rm input.png
```
````

You can delete the original file after converting to WebP.

When you have finished, show the amounts and percentage of saved space of images
converted.

```



## Attaching The MCP Server

I have an in-depth blog on how to do this but for this project I will walk
through the steps.

<callout
  type="article"
  description="How to connect to MCP servers in Cursor."
  url="/articles/mcps-connect"
  urltext="See blog">
</callout>



## Next Steps

- Add to Claude Desktop for searches

## Further Reading

[Model Context Protocol Documentation](https://modelcontextprotocol.io/)

[Claude Desktop MCP
Guide](https://support.anthropic.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)

[Cursor MCP
Documentation](https://docs.cursor.com/context/model-context-protocol)

[MCP Server Directory](https://cursor.directory/mcp)
```
