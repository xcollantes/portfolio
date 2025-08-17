/** Types for emoji reaction system. */

export type EmojiType = '👍' | '❤️' | '😄' | '🤔' | '🔥' | '🎉'

export interface EmojiReaction {
  emoji: EmojiType
  count: number
  label: string
}

export interface ArticleReactions {
  articleId: string
  reactions: Record<EmojiType, number>
  totalReactions: number
  lastUpdated: Date
}

export interface ReactionCounts {
  [key: string]: number // emoji -> count mapping
}

// Predefined emoji set for reactions
export const REACTION_EMOJIS: EmojiReaction[] = [
  { emoji: '👍', count: 0, label: 'Like' },
  { emoji: '❤️', count: 0, label: 'Love' },
  { emoji: '😄', count: 0, label: 'Funny' },
  { emoji: '🤔', count: 0, label: 'Thoughtful' },
  { emoji: '🔥', count: 0, label: 'Fire' },
  { emoji: '🎉', count: 0, label: 'Celebrate' },
]