/** Emoji reaction component for blog articles. */

import { Box, Button, Skeleton, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { getUserSessionId } from '../lib/reactions'
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
  const [userReactions, setUserReactions] = useState<EmojiType[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    // Get user session ID
    const sessionId = getUserSessionId()
    setUserId(sessionId)
  }, [])

  useEffect(() => {
    if (!userId) return

    const fetchReactions = async () => {
      try {
        // Fetch article reactions
        const reactionsResponse = await fetch(`/api/reactions/${articleId}`)
        if (reactionsResponse.ok) {
          const reactionsData = await reactionsResponse.json()
          setReactions(reactionsData)
        }

        // Fetch user's reactions
        const userResponse = await fetch(
          `/api/reactions/user/${articleId}?userId=${userId}`
        )
        if (userResponse.ok) {
          const userData = await userResponse.json()
          setUserReactions(userData.reactions)
        }
      } catch (error) {
        console.error('Error fetching reactions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReactions()
  }, [articleId, userId])

  const handleReaction = async (emoji: EmojiType) => {
    if (!userId) return

    // Optimistic update
    const hasReacted = userReactions.includes(emoji)
    if (hasReacted) {
      // User already reacted with this emoji, don't allow duplicate
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
          emoji,
          userId,
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

        setUserReactions(prev => [...prev, emoji])
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
          const hasUserReacted = userReactions.includes(reactionEmoji.emoji)

          return (
            <Tooltip key={reactionEmoji.emoji} title={reactionEmoji.label}>
              <Button
                variant={hasUserReacted ? "contained" : "outlined"}
                size="small"
                onClick={() => handleReaction(reactionEmoji.emoji)}
                disabled={hasUserReacted}
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
                  opacity: hasUserReacted ? 0.8 : 1,
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