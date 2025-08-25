/** API route for getting article reactions. */

import { doc, getDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/firebase'
import { ArticleReactions, getEmptyReactions } from '../../../types/reactions'
import { combineReactions } from '../../../utils/reactionUtils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { articleId } = req.query

  if (!articleId || typeof articleId !== 'string') {
    return res.status(400).json({ error: 'Article ID is required' })
  }

  if (req.method === 'GET') {
    if (!db) {
      return res.status(503).json({ error: 'Database not configured' })
    }

    console.log('Getting reactions for article:', articleId)

    try {
      const docRef = doc(db, 'articleReactions', articleId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()

        console.log('Reactions data:', data)

        const totalReactions = combineReactions(data)

        console.log('Total reactions:', totalReactions)

        const reactions: ArticleReactions = {
          articleId,
          reactions: totalReactions || {},
          lastUpdated: data.lastUpdated?.toDate() || new Date(),
        }

        console.log('API Reactions:', reactions)

        res.status(200).json(reactions)
      } else {
        // Return empty reactions if document doesn't exist.
        const emptyReactions: ArticleReactions = {
          articleId,
          reactions: getEmptyReactions(),
          lastUpdated: new Date(),
        }

        console.log('Could not find reactions for article:', articleId)
        console.log('API Reactions:', emptyReactions)

        res.status(200).json(emptyReactions)

      }
    } catch (error) {
      console.error('Error getting reactions:', error)
      res.status(500).json({ error: 'Failed to get reactions' })

    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)

  }
}