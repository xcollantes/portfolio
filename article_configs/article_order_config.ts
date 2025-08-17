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
  "git-worktree.md",
  "gonzaga-speaker-infosys.md",
  "bulldog-band.md",
  "measuring-tokens.md",
  "claude-cheatsheet.md",
  "radio.md",
  "vectorstores.md",
  "qdrant_awsvector.md",

  "ai-ide.md",
  "amplitude.md",

  // IN PROGRESS.
  // "choosing-embeddings.md",
  // "aws-gpu-selection-guide.md",

  "llm-leaderboards.md",
  "fastapi.md",
  "anderson-podcast.md",
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
  "ai-ide.md",
  "faxion-ai.md",
  "measuring-tokens.md",
  "amplitude.md",
  "belva-ai.md",
  "gonzaga-speaker-infosys.md",
  "bulldog-band.md",
  "portfolio.md",
  "claude-cheatsheet.md",
  "llm-leaderboards.md",
  "radio.md",
  "fastapi.md",
  "rx-blockchain.md",
  "housing.md",
  "anderson-podcast.md",
  "streamlit-cheatsheet.md",
  "itron.md",
  "web-opt.md",
  "easter-eggs.md",
]

export const orderedIncludeArticlesConfig = [
  ...orderedIncludeWorkExp,
  ...orderedIncludeBlogs,
]
