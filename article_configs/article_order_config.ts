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
  "measuring-tokens.md",
  "gonzaga-speaker-infosys.md",
  "bulldog-band.md",
  "ai-ide.md",
  "claude-cheatsheet.md",
  "radio.md",
  "rpi-camera.md",
  "git-worktree.md",

  // IN PROGRESS.
  // "choosing-embeddings.md",
  // "vector-databases.md",
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

export const orderedIncludeArticlesConfig = [
  ...orderedIncludeWorkExp,
  ...orderedIncludeBlogs,
]
