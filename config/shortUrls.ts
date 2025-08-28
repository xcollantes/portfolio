/**
 * Short URL mapping configuration
 * Maps numeric IDs to article slugs for xaviercollantes.dev/[number] shortcuts
 *
 * Once added, do not change.
 *
 * Reserve single character for future use for important links.
 */

export const shortUrlMap: Record<string, string> = {
  "0": "google",
  "1": "history-ai",
  "2": "portfolio",
  "3": "llms-for-non-techies",
  "4": "faxion-ai",
  "5": "mcp",
  "6": "mcp-server-built",
  "7": "mcps-connect",
  "8": "git-worktree",
  "9": "bulldog-band",
  "a": "rag-langchain",
  "b": "belva-ai",
  "c": "vectorstores",
  "d": "radio",

  "10": "ai-ide",
  "11": "rpi-camera",
  "12": "fastapi",

  // "7": "claude-cheatsheet",
  // "8": "git-worktree",
  // "9": "ai-ide",
  // "c": "streamlit-cheatsheet",
  // "d": "pandas-styling-cheatsheet",
  // "e": "sql-cheatsheet",
  // "f": "json-python",
  // "g": "rag-langchain",
  // "h": "choosing-embeddings",
  // "i": "vectorstores",
  // "j": "qdrant_awsvector",
  // "k": "llm-leaderboards",
  // "l": "mcp-servers",
  // "m": "mcp-server-built",
  // "n": "mcps-connect",
  // "o": "aws-gpu-selection-guide",
  // "p": "amplitude",
  // "q": ,
  // "r": "housing",
  // "s": "bulldog-band",
  // "t": "itron",
  // "u": "gonzaga-speaker-infosys",
  // "v": "faxion-ai",
  // "w": "belva-ai",
  // "x": "google",
  // "y": "rx-blockchain",
  // "z": "rpi-camera",
}

/**
 * Reverse mapping for looking up short URL by article slug
 */
export const getShortUrlForArticle = (articleSlug: string): string | null => {
  const entry = Object.entries(shortUrlMap).find(([_, slug]) => slug === articleSlug)
  return entry ? entry[0] : null
}

/**
 * Get article slug from short URL number
 */
export const getArticleSlugFromShortUrl = (shortUrl: string): string | null => {
  return shortUrlMap[shortUrl] || null
}