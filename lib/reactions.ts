/** Utility functions for managing emoji reactions. */

import { doc, getDoc } from 'firebase/firestore'
import { ArticleReactions } from '../types/reactions'
import { db } from './firebase'

// Collection names
const REACTIONS_COLLECTION = 'articleReactions'

/**
 * Get reaction counts for an article
 */
export async function getArticleReactions(articleId: string): Promise<ArticleReactions | null> {
  if (!db) {
    console.warn('Firebase not initialized')
    return null
  }

  try {
    const docRef = doc(db, REACTIONS_COLLECTION, articleId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        ...data,
        lastUpdated: data.lastUpdated?.toDate() || new Date(),
      } as ArticleReactions
    }

    return null
  } catch (error) {
    console.error('Error getting article reactions:', error)
    return null
  }
}