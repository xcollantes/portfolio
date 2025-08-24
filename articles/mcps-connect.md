---
title: "Connecting to MCP Servers"
cardDescription: "Technical guide to connecting MCP servers with Claude Desktop and Cursor."
author: Xavier Collantes
dateWritten: 2025-08-24
cardPageLink: "/articles/mcps-connect"
articleType: BLOG
imagePath: "/assets/images/mcps-connect/cursor.gif"
tagIds:
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

The Model Context Protocol (MCP) enables LLM clients to connect to external
tools and data sources. This guide covers the technical details of setting up
MCP connections for Claude Desktop and Cursor.

<callout
  type="article"
  description="For background on why and when to use MCPs, see my intro blog on MCPs."
  url="/articles/mcp"
  urltext="See blog">
</callout>

## Claude Desktop Setup (Chatbot UI)

### Method 1: Desktop Extensions (Recommended)

Desktop Extensions (.dxt) provide one-click installation for supported MCP
servers.

**Steps:**

1. Open Claude Desktop
2. Navigate to **Settings** > **Extensions**
3. Browse available extensions and click **Install**
4. Extensions auto-update by default

<callout
  type="tip"
  description="Desktop Extensions include a built-in Node.js
  environment, eliminating the need for manual Node.js installation.">
</callout>

### Method 2: Manual Configuration

For custom servers or advanced setups, use the configuration file method.

**Prerequisites:**

```bash
# Verify Node.js installation (LTS version recommended).
node --version
npm --version
```

**Configuration Steps:**

1. Open Claude Desktop
2. Go to **File** > **Settings** > **Developer**
3. Click **Edit Config** to open `claude_desktop_config.json`
4. Add your MCP server configuration

**Example Configuration:**

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/directory"
      ],
      "env": {}
    }
  }
}
```

**Verification:**

1. Completely quit and restart Claude Desktop
2. Look for the MCP server indicator in the chat input
3. Click the tools icon to see available MCP tools

<callout
  type="warning"
  description="Configuration changes require a complete
  restart of Claude Desktop. Simply refreshing the conversation will not load
  new servers.">
</callout>

## Cursor Setup

### Method 1: One-Click Installation (2025)

Cursor now supports pre-configured MCP servers with OAuth authentication.

**Steps:**

1. Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Search for "Cursor Settings"
3. Navigate to **MCP Servers** and enable the feature
4. Browse and install available servers with one-click

### Method 2: Configuration Files

Create MCP configuration files for custom setups.

**Global Configuration** (applies to all workspaces):

```bash
# Create global MCP config.
mkdir -p ~/.cursor
touch ~/.cursor/mcp.json
```

**Project-Specific Configuration:**

```bash
# Create project-specific config.
mkdir -p .cursor
touch .cursor/mcp.json
```

**Example MCP Configuration:**

```json
{
  "mcpServers": {
    "web-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your_api_key_here"
      }
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:password@localhost:5432/dbname"
      }
    }
  }
}
```

**Transport Types:**

Cursor supports three transport mechanisms:

1. **stdio** (Standard Input/Output) - Default, simpler for local development
2. **SSE** (Server-Sent Events) - HTTP-based, better for distributed teams
3. **WebSocket** - Real-time bidirectional communication

**Example With SSE Transport:**

```json
{
  "mcpServers": {
    "remote-server": {
      "url": "https://your-mcp-server.com/sse",
      "transport": "sse",
      "headers": {
        "Authorization": "Bearer your_token"
      }
    }
  }
}
```

<callout type="tip" description="Project-specific configurations override
  global ones. Use project configs for tools specific to a codebase.">
</callout>

## Authentication And Environment Variables

Both clients support secure credential management through environment variables.

**Secure Token Storage:**

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}",
        "SLACK_TEAM_ID": "${SLACK_TEAM_ID}"
      }
    }
  }
}
```

**Environment Setup:**

```bash
# Add to ~/.bashrc or ~/.zshrc.
export SLACK_BOT_TOKEN="xoxb-your-token-here"
export SLACK_TEAM_ID="T1234567890"
```

<callout type="warning" description="Never hardcode API keys in configuration
  files. Always use environment variables or OAuth when available."> </callout>

## Popular MCP Servers

### Development Tools

- **GitHub**: Repository management, issue tracking
- **GitLab**: CI/CD pipeline integration

### Data Sources

- **PostgreSQL**: Database queries and schema inspection
- **SQLite**: Local database operations
- **Google Drive**: File management and search

### Web Services

- **Slack**: Channel management and messaging
- **Notion**: Page creation and content management
- **Brave Search**: Real-time web search capabilities

### See More

<callout
  type="article"
  description="See my blog on MCP popular servers."
  url="/articles/mcp-servers"
  urltext="See blog">
</callout>

**Installation Example:**

```bash
# Using Composio for quick setup
npx @composio/mcp@latest setup "https://mcp.composio.dev/github" --client cursor
```

## Common Pitfalls

**.claude.json Scope**

Field may not exist in the `.claude.json` file but use the outer most
`mcpServers` field for user scoped servers.

**Claude Desktop:**

- **Server not appearing**: Ensure complete restart after config changes
- **Permission errors**: Check file paths and environment variables
- **Node.js issues**: Verify LTS version installation

<callout
  type="pitfall"
  description="Claude Code and Claude Desktop use different MCP server
  configurations. You will need to configure both if you want to use an MCP for
  each.">
</callout>

**Cursor:**

- **MCP option missing**: Update to latest Cursor version
- **OAuth failures**: Clear browser cache and re-authenticate
- **Transport errors**: Verify network connectivity for remote servers

### Debugging Commands

```bash
# Check MCP server installation.
npx @modelcontextprotocol/server-github --version

# Validate JSON configuration.
cat ~/.cursor/mcp.json | json_pp

# Test environment variables.
echo $GITHUB_PERSONAL_ACCESS_TOKEN
```

<callout type="note" description="MCP servers are still in active development.
  Check server documentation for the latest setup instructions and supported
  features."> </callout>

### Log Analysis

**Claude Desktop logs** (macOS):

```bash
tail -f ~/Library/Logs/Claude/claude.log
```

**Cursor logs**:

```bash
# Access through Command Palette > "Developer: Show Logs"
```

## Security Considerations

- Use environment variables for sensitive credentials
- Limit filesystem access to specific directories only
- Regularly rotate API keys and tokens
- Use project-specific configs for sensitive projects

<callout type="warning" description="MCP servers can access your local
  filesystem and external APIs. Only install servers from trusted sources and
  review their permissions carefully."> </callout>

## Further Reading

[Model Context Protocol Documentation](https://modelcontextprotocol.io/)

[Claude Desktop MCP
Guide](https://support.anthropic.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)

[Cursor MCP
Documentation](https://docs.cursor.com/context/model-context-protocol)

[MCP Server Directory](https://cursor.directory/mcp)
