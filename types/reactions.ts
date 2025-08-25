/** Types for emoji reaction system. */

/**
 * To add or remove emoji types:
 *
 * 1. Update the EmojiId type below to include/exclude the emoji ID
 * 2. Update the REACTION_EMOJIS array to add/remove the emoji entry
 *
 * The system will automatically:
 * - Update all API endpoints to handle the new/removed emoji types
 * - Update the frontend component to show/hide the emojis
 * - Generate proper empty reactions objects with all current emoji types
 *
 * Database behavior:
 * - Removed emojis: Data remains in database but won't display
 * - Added emojis: Show as zero count until first reaction is added
 *
 * Example of adding a new emoji:
 * - Add 'wow' to EmojiId type: 'like' | 'love' | 'funny' | 'thoughtful' | 'wow'
 * - Add entry to REACTION_EMOJIS: { emoji: '😮', emojiId: 'wow', count: 0, label: 'Wow' }
 */
export type EmojiId = 'like' | 'love' | 'funny' | 'surprised'

export const REACTION_EMOJIS: EmojiReaction[] = [
  { emoji: '👍', emojiId: 'like', count: 0, label: 'Like' },
  { emoji: '❤️', emojiId: 'love', count: 0, label: 'Love' },
  { emoji: '😂', emojiId: 'funny', count: 0, label: 'Funny' },
  { emoji: '😮', emojiId: 'surprised', count: 0, label: 'Surprised' },
]

export interface EmojiReaction {
  emoji: string
  emojiId: EmojiId
  count: number
  label: string
}

export interface FirestoreReactions {
  articleId: string
  reactions: Record<EmojiId, number>
  deprecatedReactions: Record<EmojiId, number>
  lastUpdated: Date
}

export interface ArticleReactions {
  articleId: string
  reactions: Record<EmojiId, number>
  lastUpdated: Date
}

export function getEmptyReactions(): Record<EmojiId, number> {
  return REACTION_EMOJIS.reduce((acc, reaction) => {
    acc[reaction.emojiId] = 0
    return acc
  }, {} as Record<EmojiId, number>)
}
