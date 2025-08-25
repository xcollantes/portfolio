/** Set article order and set articles accessible. */

/**
 * Article order to display.
 *
 * IMPORTANT: If not listed, will not show up on web app and articles will not
 * be accessible when reaching URL.
 * MUST EXACT MATCH CASE TO INCLUDE ARTICLE.
 */

// WORK EXPERIENCES
export const orderedIncludeWorkExp: string[] = [
  "faxion-ai.md",
  "google.md",
  "belva-ai.md",
  "portfolio.md",
  "rx-blockchain.md",
  "itron.md",
  "housing.md",
]

// BLOGS
export const orderedIncludeBlogs: string[] = [
  "rag-langchain.md",
  "history-ai.md",
  "llms-for-non-techies.md",
  "mcp-server-built.md",
  "mcp.md",
  "vectorstores.md",
  "qdrant_awsvector.md",
  "fastapi.md",
  "quant.md",
  "git-worktree.md",
  "gonzaga-speaker-infosys.md",
  "bulldog-band.md",
  "mcps-connect.md",
  "ai-ide.md",
  "rpi-camera.md",
  "measuring-tokens.md",
  "amplitude.md",

  // IN PROGRESS.
  // "choosing-embeddings.md",
  // "aws-gpu-selection-guide.md",

  "claude-cheatsheet.md",
  "llm-leaderboards.md",
  "radio.md",
  "anderson-podcast.md",
  "mcp-servers.md",
  // "gist-example.md",
  "web-opt.md",

  "streamlit-cheatsheet.md",
  "json-python.md",
  "easter-eggs.md",
]

// BLOG SITE SPECIFIC ORDER (for blog-only mode).
//
// Both WORKEXP and BLOG articles can be shown in blog-only mode. The order will
// be maintained.
export const orderedIncludeBlogSite: string[] = [
  "rag-langchain.md",
  "qdrant_awsvector.md",
  "history-ai.md",
  "google.md",
  "llms-for-non-techies.md",
  "vectorstores.md",
  "git-worktree.md",
  "quant.md",
  "ai-ide.md",
  "faxion-ai.md",
  "mcp-server-built.md",
  "mcp.md",
  "amplitude.md",
  "belva-ai.md",
  "rpi-camera.md",
  "gonzaga-speaker-infosys.md",
  "bulldog-band.md",
  "portfolio.md",
  "mcps-connect.md",
  "measuring-tokens.md",
  "claude-cheatsheet.md",
  "llm-leaderboards.md",
  "fastapi.md",
  "rx-blockchain.md",
  "housing.md",
  "anderson-podcast.md",
  "streamlit-cheatsheet.md",
  "itron.md",
  "radio.md",
  "web-opt.md",
  "mcp-servers.md",
  "easter-eggs.md",
]

export const orderedIncludeArticlesConfig = [
  ...orderedIncludeWorkExp,
  ...orderedIncludeBlogs,
]
