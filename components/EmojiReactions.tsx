/** Emoji reaction component for blog articles. */

import { Box, Button, Skeleton, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { ArticleReactions, EmojiId, REACTION_EMOJIS } from '../types/reactions'

interface EmojiReactionsProps {
  articleId: string
}

export default function EmojiReactions({
  articleId,
}: EmojiReactionsProps) {
  // Don't render if Firebase is not configured
  if (!db) {
    return null
  }

  const [reactions, setReactions] = useState<ArticleReactions | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
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
    const savedReactions = localStorage.getItem('article-reactions')
    if (savedReactions) {
      const reactionsData = JSON.parse(savedReactions)
      if (reactionsData[articleId]) {
        setClickedEmojis(new Set(reactionsData[articleId]))
      }
    }

    getReactions()
  }, [articleId])

  const handleReaction = async (emojiId: EmojiId) => {
    // Check if user has already clicked this emoji
    if (clickedEmojis.has(emojiId)) {
      return
    }

    try {
      const response = await fetch('/api/reactions/add', {
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
        const data = await response.json()

        // Update local state
        setReactions(prev => prev ? {
          ...prev,
          reactions: data.reactions,
          lastUpdated: new Date(),
        } : null)

        // Mark this emoji as clicked and save to localStorage
        const newClickedEmojis = new Set(clickedEmojis)
        newClickedEmojis.add(emojiId)
        setClickedEmojis(newClickedEmojis)

        // Update localStorage with new structure
        const savedReactions = localStorage.getItem('article-reactions')
        const reactionsData = savedReactions ? JSON.parse(savedReactions) : {}
        reactionsData[articleId] = Array.from(newClickedEmojis)
        localStorage.setItem('article-reactions', JSON.stringify(reactionsData))
      }
    } catch (error) {
      console.error('Error adding reaction:', error)
    }
  }

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        mt: 3,
        mb: 2
      }}>
        {REACTION_EMOJIS.map((_, index) => (
          <Skeleton
            key={index}
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
          const count = reactions?.reactions[reactionEmoji.emojiId] || 0
          const hasClicked = clickedEmojis.has(reactionEmoji.emojiId)

          return (
            <Tooltip
              key={reactionEmoji.emojiId}
              title={hasClicked ? `${reactionEmoji.label} (already clicked)` : reactionEmoji.label}
            >
              <Button
                variant={hasClicked ? "contained" : "outlined"}
                size="small"
                onClick={() => handleReaction(reactionEmoji.emojiId)}
                disabled={hasClicked}
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
                  opacity: hasClicked ? 0.7 : 1,
                  cursor: hasClicked ? 'not-allowed' : 'pointer',
                  '&:hover': {
                    transform: hasClicked ? 'none' : 'scale(1.05)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                  '&.Mui-disabled': {
                    opacity: 0.7,
                  },
                }}
              >
                <span>{reactionEmoji.emoji}</span>
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