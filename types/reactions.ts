/** Types for emoji reaction system. */

// Add remove emojis here.
export type EmojiId = 'like' | 'love' | 'funny' | 'thoughtful'

export const REACTION_EMOJIS: EmojiReaction[] = [
  { emoji: '👍', emojiId: 'like', count: 0, label: 'Like' },
  { emoji: '❤️', emojiId: 'love', count: 0, label: 'Love' },
  { emoji: '🤣', emojiId: 'funny', count: 0, label: 'Funny' },
  { emoji: '🤔', emojiId: 'thoughtful', count: 0, label: 'Thoughtful' },
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
