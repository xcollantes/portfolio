/**
 * Article Exception Configuration System
 *
 * This file manages articles that are exceptions to the normal access control rules.
 * By default, all articles require human verification and are not indexed by search engines.
 * This system allows specific articles to bypass these restrictions.
 *
 * EXCEPTION CRITERIA:
 * Only add articles here that meet ALL of the following criteria:
 * 1. Content is suitable for public consumption (no sensitive information)
 * 2. Content adds value for public discovery (educational, portfolio, etc.)
 * 3. Content represents professional work or educational material
 * 4. Content does not contain personal or private information
 *
 * WHEN TO ADD EXCEPTIONS:
 * ✅ Portfolio pieces showcasing professional work
 * ✅ Educational tutorials and technical guides
 * ✅ Public-facing work experiences and achievements
 * ✅ Blog posts intended for broader audience reach
 *
 * WHEN NOT TO ADD EXCEPTIONS:
 * ❌ Personal stories or experiences
 * ❌ Content with sensitive company information
 * ❌ Experimental or draft content
 * ❌ Content meant only for specific individuals
 *
 * SECURITY CONSIDERATIONS:
 * - Exceptions bypass all access controls - content becomes fully public
 * - Search engines will index and cache the content permanently
 * - Content will appear in search results and social media previews
 * - Consider data privacy implications before adding exceptions
 *
 * PROCESS FOR ADDING EXCEPTIONS:
 * 1. Ensure article meets all exception criteria above
 * 2. Add entry to articleExceptions object with clear reason
 * 3. Set both bypassVerification and allowSearchIndexing appropriately
 * 4. Test the article accessibility in development
 * 5. Monitor search engine indexing after deployment
 */

export interface ArticleExceptionConfig {
  /** Whether this article should bypass human verification. */
  bypassVerification: boolean
  /** Whether this article should be indexed by search engines (remove noindex). */
  allowSearchIndexing: boolean
  /** Optional reason for the exception (for documentation and audit purposes). */
  reason?: string
}

/**
 * Configuration object mapping article filenames to their exception settings.
 *
 * NAMING CONVENTION: Use the full filename including .md extension
 * CATEGORIZATION: Group similar types of content together with comments
 * REASONING: Always provide a clear reason for each exception
 */
export const articleExceptions: Record<string, ArticleExceptionConfig> = {
  // PORTFOLIO AND WORK EXPERIENCES
  // These showcase professional work and should be discoverable for career purposes.
  "portfolio.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Portfolio overview showcases professional work"
  },

  "rx-blockchain.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Professional work experience suitable for public discovery"
  },

  "faxion-ai.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Professional work experience suitable for public discovery"
  },

  // EDUCATIONAL AND TECHNICAL CONTENT
  // These provide value to the broader technical community.
  "measuring-tokens.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Educational content about LLM tokens that benefits the technical community"
  },

  "llms-for-non-techies.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Educational content that benefits the broader community"
  },

  "fastapi.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Technical tutorial with educational value for developers"
  },

  "bulldog-band.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Educational story about music and technology integration"
  },

  "web-opt.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Technical guide for web optimization best practices"
  },

  "llm-leaderboards.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Public benchmark performance for LLM models"
  },

  "rag-langchain.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Educational content about RAG implementation with LangChain"
  },

  "history-ai.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Public history of AI development"
  },

  "claude-cheatsheet.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Educational content about Claude Code that benefits the developer community"
  },

  "git-worktree.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Educational content about Git Worktrees and Claude Code that benefits the developer community"
  },

  "amplitude.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Technical guide for Amplitude analytics integration that benefits the developer community"
  },

  "vectorstores.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Educational content about vector storage solutions that benefits the developer community"
  },

  "qdrant_awsvector.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Educational content comparing vector database solutions that benefits the developer community"
  },

  "mcp.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Educational content about MCP (Model Context Protocol) that benefits the developer community"
  },

  "mcps-connect.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Educational content about using MCP (Model Context Protocol) that benefits the developer community"
  },

  "mcp-servers.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Educational content about popular MCP servers that benefits the developer community"
  },

  // TEMPLATE FOR NEW ADDITIONS
  // Copy and modify this template when adding new exceptions:
  // "article-name.md": {
  //   bypassVerification: true,
  //   allowSearchIndexing: true,
  //   reason: "Clear explanation of why this article should be public"
  // },
}

/**
 * Helper Functions for Exception Management
 *
 * These functions provide a clean API for checking article exception status
 * throughout the application. They handle the filename conversion and provide
 * safe defaults when articles are not found in the exceptions list.
 */

/**
 * Check if an article should bypass human verification.
 *
 * @param articleId - The article identifier (without .md extension)
 * @returns true if the article should skip verification, false otherwise
 */
export function shouldBypassVerification(articleId: string): boolean {
  const fileName = `${articleId}.md`
  return articleExceptions[fileName]?.bypassVerification || false
}

/**
 * Check if an article should be indexed by search engines.
 *
 * @param articleId - The article identifier (without .md extension)
 * @returns true if the article should be indexed, false otherwise
 */
export function shouldAllowSearchIndexing(articleId: string): boolean {
  const fileName = `${articleId}.md`
  return articleExceptions[fileName]?.allowSearchIndexing || false
}

/**
 * Get all articles that are configured as exceptions.
 *
 * @returns Array of article filenames (including .md extension) that have exceptions
 */
export function getExceptionArticles(): string[] {
  return Object.keys(articleExceptions)
}

/**
 * Get the documented reason for an article exception.
 *
 * @param articleId - The article identifier (without .md extension)
 * @returns The reason string if available, undefined otherwise
 */
export function getExceptionReason(articleId: string): string | undefined {
  const fileName = `${articleId}.md`
  return articleExceptions[fileName]?.reason
}