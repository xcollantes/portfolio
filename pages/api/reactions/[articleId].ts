/** API route for getting article reactions. */

import { NextApiRequest, NextApiResponse } from 'next'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { ArticleReactions, getEmptyReactions } from '../../../types/reactions'

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
        const reactions: ArticleReactions = {
          articleId,
          reactions: data.reactions || {},
          totalReactions: data.totalReactions || 0,
          lastUpdated: data.lastUpdated?.toDate() || new Date(),
        }

        console.log('API Reactions:', reactions)

        res.status(200).json(reactions)
      } else {
        // Return empty reactions if document doesn't exist.
        const emptyReactions: ArticleReactions = {
          articleId,
          reactions: getEmptyReactions(),
          totalReactions: 0,
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