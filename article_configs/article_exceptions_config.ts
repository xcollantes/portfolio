/** Configuration for articles that are exceptions to normal access rules. */

/**
 * Articles that bypass human verification and are indexed by search engines.
 *
 * These articles will:
 * - Skip the verification page (no "Prove you are human" requirement)
 * - Be indexed by search engines (no noindex meta tag)
 * - Be publicly accessible without any checks
 *
 * IMPORTANT: Only add articles here that you want to be:
 * 1. Easily discoverable by search engines
 * 2. Accessible without any human verification
 * 3. Suitable for public consumption
 */

export interface ArticleExceptionConfig {
  // Whether this article should bypass human verification.
  bypassVerification: boolean
  // Whether this article should be indexed by search engines (remove noindex).
  allowSearchIndexing: boolean
  // Optional reason for the exception (for documentation purposes).
  reason?: string
}

export const articleExceptions: Record<string, ArticleExceptionConfig> = {
  // Public-facing work experiences and blogs that should be discoverable.
  "portfolio.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Portfolio overview"
  },

  // Technical blog posts that should be searchable.
  "llms-for-non-techies.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Educational content that should be publicly discoverable"
  },

  "fastapi.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Technical tutorial that should be searchable"
  },

  "faxion-ai.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Work experience that should be searchable"
  },

  "bulldog-band.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Educational content that should be publicly discoverable"
  },

  "web-opt.md": {
    bypassVerification: true,
    allowSearchIndexing: true,
    reason: "Educational content that should be publicly discoverable"
  },

  // Add more exceptions as needed.
  // "article-name.md": {
  //   bypassVerification: true,
  //   allowSearchIndexing: true,
  //   reason: "Description of why this article is an exception"
  // },
}

/**
 * Check if an article should bypass human verification.
 */
export function shouldBypassVerification(articleId: string): boolean {
  const fileName = `${articleId}.md`
  return articleExceptions[fileName]?.bypassVerification || false
}

/**
 * Check if an article should be indexed by search engines.
 */
export function shouldAllowSearchIndexing(articleId: string): boolean {
  const fileName = `${articleId}.md`
  return articleExceptions[fileName]?.allowSearchIndexing || false
}

/**
 * Get all articles that are configured as exceptions.
 */
export function getExceptionArticles(): string[] {
  return Object.keys(articleExceptions)
}

/**
 * Get the reason for an article exception (for documentation).
 */
export function getExceptionReason(articleId: string): string | undefined {
  const fileName = `${articleId}.md`
  return articleExceptions[fileName]?.reason
}