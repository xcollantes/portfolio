/** Utility functions for handling emoji reactions. */

import { EmojiId } from '../types/reactions'

interface FirestoreDocument {
  reactions?: Record<EmojiId, number>
  deprecatedReactions?: Record<string, number>
}

/**
 * Combines current reactions with deprecated reactions for backward compatibility.
 * This ensures that historical reaction data is preserved and included in totals.
 */
export function combineReactions(data: FirestoreDocument | null | undefined): Record<EmojiId, number> {
  if (!data) return {} as Record<EmojiId, number>
  
  // Start with current reactions
  const totalReactions = { ...data.reactions } as Record<EmojiId, number>
  
  // Add deprecated reactions if they exist
  if (data.deprecatedReactions) {
    for (const [emojiId, count] of Object.entries(data.deprecatedReactions)) {
      totalReactions[emojiId as EmojiId] = (totalReactions[emojiId as EmojiId] || 0) + count
    }
  }
  
  return totalReactions
}