/** Emoji reaction component for blog articles. */

import { Box, Button, Skeleton, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { ArticleReactions, EmojiType, REACTION_EMOJIS } from '../types/reactions'

interface EmojiReactionsProps {
  articleId: string
  showInBlogMode?: boolean
}

export default function EmojiReactions({
  articleId,
  showInBlogMode = true
}: EmojiReactionsProps) {
  // Don't render if Firebase is not configured
  if (!db) {
    return null
  }

  const [reactions, setReactions] = useState<ArticleReactions | null>(null)
  const [loading, setLoading] = useState(true)

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

    getReactions()
  }, [articleId])

  const handleReaction = async (emoji: EmojiType) => {
    try {
      const response = await fetch('/api/reactions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleId,
          emoji,
        }),
      })

      if (response.ok) {
        const data = await response.json()

        // Update local state
        setReactions(prev => prev ? {
          ...prev,
          reactions: data.reactions,
          totalReactions: data.totalReactions,
        } : null)
      }
    } catch (error) {
      console.error('Error adding reaction:', error)
    }
  }

  // Don't show in portfolio mode if showInBlogMode is false
  if (!showInBlogMode) {
    return null
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

  const totalReactions = reactions?.totalReactions || 0

  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ mb: 2, fontWeight: 'medium' }}
      >
        How did you like this article?
      </Typography>

      <Box sx={{
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {REACTION_EMOJIS.map((reactionEmoji) => {
          const count = reactions?.reactions[reactionEmoji.emoji] || 0

          return (
            <Tooltip key={reactionEmoji.emoji} title={reactionEmoji.label}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleReaction(reactionEmoji.emoji)}
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
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                <span>{reactionEmoji.emoji}</span>
                {count > 0 && (
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
                )}
              </Button>
            </Tooltip>
          )
        })}
      </Box>

      {totalReactions > 0 && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: 'block' }}
        >
          {totalReactions} {totalReactions === 1 ? 'reaction' : 'reactions'}
        </Typography>
      )}
    </Box>
  )
}