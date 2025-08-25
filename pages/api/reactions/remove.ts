/** API route for removing emoji reactions. */

import { NextApiRequest, NextApiResponse } from 'next'
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { EmojiId, REACTION_EMOJIS } from '../../../types/reactions'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  console.log('Remove reaction request received: ', req.body)

  /** Expected body parameters. */
  const { articleId, emojiId } = req.body

  // Validate input
  if (!articleId || !emojiId) {
    return res.status(400).json({
      error: 'Article ID and emojiId are required'
    })
  }

  const validEmojis = REACTION_EMOJIS.map(r => r.emojiId)
  if (!validEmojis.includes(emojiId as EmojiId)) {
    return res.status(400).json({
      error: 'Invalid emojiId'
    })
  }

  if (!db) {
    return res.status(503).json({ error: 'Database not configured' })
  }

  try {
    // Check if article reactions document exists
    const articleReactionsRef = doc(db, 'articleReactions', articleId)
    const articleReactionsSnap = await getDoc(articleReactionsRef)

    if (!articleReactionsSnap.exists()) {
      return res.status(404).json({ error: 'Article reactions not found' })
    }

    // Get current count to prevent going below zero
    const currentData = articleReactionsSnap.data()
    const currentCount = currentData?.reactions?.[emojiId as EmojiId] || 0

    if (currentCount <= 0) {
      return res.status(400).json({ error: 'Cannot decrement below zero' })
    }

    // Update reaction count (decrement by 1)
    await updateDoc(articleReactionsRef, {
      [`reactions.${emojiId as EmojiId}`]: increment(-1),
      lastUpdated: serverTimestamp(),
    })

    // Get updated reactions to return
    const updatedSnap = await getDoc(articleReactionsRef)
    const updatedData = updatedSnap.data()

    console.log('Updated reactions after removal:', updatedData)

    res.status(200).json({
      success: true,
      reactions: updatedData?.reactions || {},
    })
  } catch (error) {
    console.error('Error removing reaction:', error)
    res.status(500).json({ error: 'Failed to remove reaction' })
  }
}