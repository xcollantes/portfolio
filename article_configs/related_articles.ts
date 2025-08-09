/** Utility functions for finding related articles based on shared tags */

import { MetadataType } from "./process_articles"

export interface RelatedArticleType {
  title: string
  cardDescription: string
  cardPageLink: string
  tagIds: string[]
  dateWritten?: Date | null
  author?: string | null
}

/**
 * Find related articles based on shared tags
 * 
 * @param currentArticle - The current article to find relations for
 * @param allArticles - Array of all available articles
 * @param maxResults - Maximum number of related articles to return (default: 3)
 * @returns Array of related articles sorted by relevance
 */
export function getRelatedArticles(
  currentArticle: MetadataType,
  allArticles: MetadataType[],
  maxResults: number = 3
): RelatedArticleType[] {
  // Filter out the current article and calculate relevance scores
  const scoredArticles = allArticles
    .filter(article => article.cardPageLink !== currentArticle.cardPageLink)
    .map(article => {
      // Count shared tags
      const sharedTags = article.tagIds.filter(tag => 
        currentArticle.tagIds.includes(tag)
      )
      
      // Calculate relevance score (number of shared tags)
      const relevanceScore = sharedTags.length
      
      return {
        article: {
          title: article.title,
          cardDescription: article.cardDescription,
          cardPageLink: article.cardPageLink,
          tagIds: article.tagIds,
          dateWritten: article.dateWritten || null,
          author: article.author || null,
        } as RelatedArticleType,
        score: relevanceScore,
        sharedTags
      }
    })
    .filter(item => item.score > 0) // Only include articles with at least 1 shared tag
    .sort((a, b) => {
      // Sort by relevance score (descending), then by date (newest first)
      if (b.score !== a.score) {
        return b.score - a.score
      }
      
      // If scores are equal, prioritize newer articles
      const dateA = a.article.dateWritten ? new Date(a.article.dateWritten).getTime() : 0
      const dateB = b.article.dateWritten ? new Date(b.article.dateWritten).getTime() : 0
      return dateB - dateA
    })
    .slice(0, maxResults)
  
  return scoredArticles.map(item => item.article)
}

/**
 * Get the most common tags across related articles
 * Used for displaying tag-based groupings
 */
export function getCommonTags(
  currentArticle: MetadataType,
  relatedArticles: RelatedArticleType[]
): string[] {
  const tagCounts = new Map<string, number>()
  
  // Count occurrences of each tag in related articles
  relatedArticles.forEach(article => {
    article.tagIds.forEach(tag => {
      if (currentArticle.tagIds.includes(tag)) {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      }
    })
  })
  
  // Return tags sorted by frequency
  return Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
}