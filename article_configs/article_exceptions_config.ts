/**
 * Article Deny List Configuration System
 *
 * This file manages articles that should be restricted from public access and search indexing.
 * By default, all articles bypass human verification and are indexed by search engines.
 * This system allows specific articles to require verification or block search indexing.
 */

export interface ArticleDenyConfig {
  /** Whether this article should require human verification. */
  requireVerification: boolean
  /** Whether this article should be blocked from search engine indexing (add noindex). */
  blockSearchIndexing: boolean
  /** Optional reason for the restriction (for documentation and audit purposes). */
  reason?: string
}

/**
 * Configuration object mapping article filenames to their restriction settings.
 * Articles NOT in this list will be publicly accessible and indexed by search engines.
 *
 * NAMING CONVENTION: Use the full filename including .md extension
 * CATEGORIZATION: Group similar types of content together with comments
 * REASONING: Always provide a clear reason for each restriction
 */
export const articleDenyList: Record<string, ArticleDenyConfig> = {

  "amazon-price.md": {
    requireVerification: true,
    blockSearchIndexing: true,
    reason: "Personal project with potential sensitive pricing information"
  },

  "aws-gpu-selection-guide.md": {
    requireVerification: true,
    blockSearchIndexing: true,
    reason: "Internal technical guide not ready for public consumption"
  },

  "google.md": {
    requireVerification: true,
    blockSearchIndexing: true,
  },

  // TEMPLATE FOR NEW ADDITIONS
  // Copy and modify this template when adding new restrictions:
  // "article-name.md": {
  //   requireVerification: true,
  //   blockSearchIndexing: true,
  //   reason: "Clear explanation of why this article should be restricted"
  // },
}

/**
 * Helper Functions for Deny List Management
 *
 * These functions provide a clean API for checking article restriction status
 * throughout the application. They handle the filename conversion and provide
 * safe defaults when articles are not found in the deny list.
 */

/**
 * Check if an article should bypass human verification.
 *
 * @param articleId - The article identifier (without .md extension)
 * @returns true if the article should skip verification (default), false if it requires verification
 */
export function shouldBypassVerification(articleId: string): boolean {
  const fileName = `${articleId}.md`
  return !articleDenyList[fileName]?.requireVerification
}

/**
 * Check if an article should be indexed by search engines.
 *
 * @param articleId - The article identifier (without .md extension)
 * @returns true if the article should be indexed (default), false if it should be blocked
 */
export function shouldAllowSearchIndexing(articleId: string): boolean {
  const fileName = `${articleId}.md`
  return !articleDenyList[fileName]?.blockSearchIndexing
}

/**
 * Get all articles that are configured with restrictions.
 *
 * @returns Array of article filenames (including .md extension) that have restrictions
 */
export function getRestrictedArticles(): string[] {
  return Object.keys(articleDenyList)
}

/**
 * Get the documented reason for an article restriction.
 *
 * @param articleId - The article identifier (without .md extension)
 * @returns The reason string if available, undefined otherwise
 */
export function getRestrictionReason(articleId: string): string | undefined {
  const fileName = `${articleId}.md`
  return articleDenyList[fileName]?.reason
}