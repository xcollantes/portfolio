/** Utility functions for handling emoji reactions. */

import { EmojiId } from '../types/reactions'

interface FirestoreDocument {
  reactions?: Record<EmojiId, number>
  deprecatedReactions?: Record<string, number>
}

/**
 * Combines current reactions with deprecated reactions based on environment configuration.
 * This allows controlling whether historical reaction data is included in totals.
 */
export function combineReactions(data: FirestoreDocument | null | undefined): Record<EmojiId, number> {
  if (!data) return {} as Record<EmojiId, number>

  // Start with current reactions
  const totalReactions = { ...data.reactions } as Record<EmojiId, number>

  // Check if deprecated reactions should be included with flag
  // Default will include deprecated reactions
  const includeDeprecated = process.env.INCLUDE_DEPRECATED_REACTIONS !== 'false'

  // Add deprecated reactions if they exist and are enabled
  if (includeDeprecated && data.deprecatedReactions) {
    for (const [emojiId, count] of Object.entries(data.deprecatedReactions)) {
      totalReactions[emojiId as EmojiId] = (totalReactions[emojiId as EmojiId] || 0) + count
    }
  }

  return totalReactions
}