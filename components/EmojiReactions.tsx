/** Emoji reaction component for blog articles. */

import { Box, Button, Skeleton, Tooltip, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { ArticleReactions, EmojiId, REACTION_EMOJIS } from '../types/reactions'

interface EmojiReactionsProps {
  articleId: string
}

interface LocalStorageReactions {
  [articleId: string]: EmojiId[]
}

interface ApiResponse {
  success: boolean
  reactions: Record<EmojiId, number>
}

export default function EmojiReactions({
  articleId,
}: EmojiReactionsProps) {
  // Don't render if Firebase is not configured
  if (!db) {
    return null
  }

  const [reactions, setReactions] = useState<ArticleReactions | null>(null)
  const [loading, setLoading] = useState(true)
  const [clickedEmojis, setClickedEmojis] = useState<Set<EmojiId>>(new Set())

  useEffect(() => {
    const getReactions = async () => {
      try {
        // Get article reactions
        const reactionsResponse = await fetch(`/api/reactions/${articleId}`)
        if (reactionsResponse.ok) {
          const reactionsData = await reactionsResponse.json()
          setReactions(reactionsData)
        }
      } catch (error) {
        console.error('Error fetching reactions:', error)
      } finally {
        setLoading(false)
      }
    }

    // Load clicked emojis from localStorage
    const loadClickedEmojis = (): void => {
      try {
        const savedReactions = localStorage.getItem('article-reactions')
        if (savedReactions) {
          const reactionsData: LocalStorageReactions = JSON.parse(savedReactions)
          if (reactionsData[articleId]) {
            setClickedEmojis(new Set(reactionsData[articleId]))
          }
        }
      } catch (error) {
        console.error('Error loading clicked emojis:', error)
      }
    }

    loadClickedEmojis()

    getReactions()
  }, [articleId])

  const updateLocalStorage = useCallback((newClickedEmojis: Set<EmojiId>): void => {
    try {
      const savedReactions = localStorage.getItem('article-reactions')
      const reactionsData: LocalStorageReactions = savedReactions ? JSON.parse(savedReactions) : {}
      reactionsData[articleId] = Array.from(newClickedEmojis)
      localStorage.setItem('article-reactions', JSON.stringify(reactionsData))
    } catch (error) {
      console.error('Error updating localStorage:', error)
    }
  }, [articleId])

  const handleReaction = useCallback(async (emojiId: EmojiId): Promise<void> => {
    const hasClicked = clickedEmojis.has(emojiId)
    const endpoint = hasClicked ? '/api/reactions/remove' : '/api/reactions/add'
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleId,
          emojiId,
        }),
      })

      if (response.ok) {
        const data: ApiResponse = await response.json()

        // Update local state
        setReactions(prev => prev ? {
          ...prev,
          reactions: data.reactions,
          lastUpdated: new Date(),
        } : null)

        // Toggle emoji in clicked set and save to localStorage
        const newClickedEmojis = new Set(clickedEmojis)
        if (hasClicked) {
          newClickedEmojis.delete(emojiId)
        } else {
          newClickedEmojis.add(emojiId)
        }
        setClickedEmojis(newClickedEmojis)
        updateLocalStorage(newClickedEmojis)
      }
    } catch (error) {
      console.error(`Error ${hasClicked ? 'removing' : 'adding'} reaction:`, error)
    }
  }, [articleId, clickedEmojis, updateLocalStorage])

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        mt: 3,
        mb: 2
      }}>
        {REACTION_EMOJIS.map((emoji) => (
          <Skeleton
            key={emoji.emojiId}
            variant="rectangular"
            width={80}
            height={40}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Box>
    )
  }

  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Box sx={{
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {REACTION_EMOJIS.map((reactionEmoji) => {
          const count = reactions?.reactions[reactionEmoji.emojiId] ?? 0
          const hasClicked = clickedEmojis.has(reactionEmoji.emojiId)

          return (
            <Tooltip
              key={reactionEmoji.emojiId}
              title={hasClicked ? `Remove ${reactionEmoji.label} reaction` : `Add ${reactionEmoji.label} reaction`}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleReaction(reactionEmoji.emojiId)}
                aria-label={`${reactionEmoji.label} reaction`}
                sx={{
                  minWidth: 'auto',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: '18px',
                  fontWeight: 'normal',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  textTransform: 'none',
                  backgroundColor: hasClicked ? 'primary.main' : 'transparent',
                  color: hasClicked ? 'primary.contrastText' : 'inherit',
                  border: hasClicked ? '1px solid' : 'none',
                  borderColor: hasClicked ? 'primary.main' : 'transparent',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: hasClicked ? 'primary.dark' : 'action.hover',
                  },
                }}
              >
                <span role="img" aria-label={reactionEmoji.label}>
                  {reactionEmoji.emoji}
                </span>
                <Typography
                  variant="caption"
                  component="span"
                  sx={{
                    fontWeight: 'medium',
                    fontSize: '12px'
                  }}
                >
                  {count}
                </Typography>
              </Button>
            </Tooltip>
          )
        })}
      </Box>
    </Box>
  )
}