/** API route for adding emoji reactions. */

import { NextApiRequest, NextApiResponse } from 'next'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { EmojiId, REACTION_EMOJIS } from '../../../types/reactions'
import { combineReactions } from '../../../utils/reactionUtils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  console.log('Reaction request received: ', req.body)

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
      console.log('Creating initial reactions for article:', articleId)
      console.log('Creating initial document with all emojis set to 0')

      // Create initial document with all emojis set to 0
      const initialReactions = {}
      REACTION_EMOJIS.forEach(r => {
        initialReactions[r.emojiId as EmojiId] = 0
      })

      await setDoc(articleReactionsRef, {
        articleId,
        deprecatedReactions: initialReactions,  // All zeros.
        reactions: initialReactions,
        lastUpdated: serverTimestamp(),
      })
    }

    // Update reaction count
    await updateDoc(articleReactionsRef, {
      [`reactions.${emojiId as EmojiId}`]: increment(1),
      lastUpdated: serverTimestamp(),
    })

    // Get updated reactions using shared utility function
    const updatedSnap = await getDoc(articleReactionsRef)
    const updatedData = updatedSnap.data()
    const totalReactions = combineReactions(updatedData)

    console.log('Updated reactions:', totalReactions)

    res.status(200).json({
      success: true,
      reactions: totalReactions,
    })
  } catch (error) {
    console.error('Error adding reaction:', error)
    res.status(500).json({ error: 'Failed to add reaction' })
  }
}