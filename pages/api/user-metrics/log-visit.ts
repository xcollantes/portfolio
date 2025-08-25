/** API endpoint for logging user visits with geolocation data. */

import { NextApiRequest, NextApiResponse } from 'next'
import { doc, setDoc, getDoc, serverTimestamp, increment, arrayUnion } from 'firebase/firestore'
import { db } from '../../../lib/firebase'

interface IpWhoResponse {
  success: boolean
  ip: string
  type: string
  continent: string
  continent_code: string
  country: string
  country_code: string
  region: string
  region_code: string
  city: string
  latitude: number
  longitude: number
  is_eu: boolean
  postal: string
  calling_code: string
  capital: string
  borders: string
  flag: {
    img: string
    emoji: string
    emoji_unicode: string
  }
  connection: {
    asn: number
    org: string
    isp: string
    domain: string
  }
  timezone: {
    id: string
    abbr: string
    is_dst: boolean
    offset: number
    utc: string
    current_time: string
  }
}

interface UserMetrics {
  ip: string
  lastVisit: any
  userAgent: string
  referer?: string
  visitCount?: number
  pagesVisited?: string[]
  geolocation: {
    country: string
    country_code: string
    region: string
    city: string
    latitude: number
    longitude: number
    timezone: string
  }
  connection: {
    org: string
    isp: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  if (!db) {
    return res.status(503).json({ error: 'Database not configured' })
  }

  try {
    // Get client IP address
    const forwarded = req.headers['x-forwarded-for']
    const ip = forwarded
      ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0])
      : req.connection.remoteAddress || req.socket.remoteAddress || 'unknown'

    // Get page path from request body
    const { pagePath } = req.body
    const currentPath = pagePath || 'unknown'

    console.log('Logging visit for IP:', ip, 'on path:', currentPath)

    // Get geolocation data from ipwho.is
    let geoData: IpWhoResponse | null = null
    try {
      if (ip !== 'unknown' && ip !== '::1' && ip !== '127.0.0.1') {
        const geoResponse = await fetch(`https://ipwho.is/${ip}`)
        if (geoResponse.ok) {
          geoData = await geoResponse.json()
          console.log('Geolocation data:', geoData)
        }
      }
    } catch (geoError) {
      console.warn('Failed to fetch geolocation data:', geoError)
    }

    // Create IP-based document ID (sanitize IP for Firestore document naming)
    const timestamp = new Date()
    const ipDocId = ip.replace(/[^a-zA-Z0-9]/g, '_') // Replace special chars with underscores

    // Use setDoc with merge to handle both create and update cases
    const userMetricsRef = doc(db, 'userMetrics', ipDocId)

    // Base update data that always gets applied
    const updateData = {
      ip: ip,
      lastVisit: serverTimestamp(),
      visitCount: increment(1),
      userAgent: req.headers['user-agent'] || 'unknown',
      referer: req.headers.referer,
      pagesVisited: arrayUnion(currentPath),
    }

    // Add geolocation data only if this might be a new document
    // Since we can't read, we'll include geolocation data in every write
    // Firestore merge will only add these fields if the document doesn't exist
    const fullUserMetrics = {
      ...updateData,
      geolocation: geoData?.success ? {
        country: geoData.country,
        country_code: geoData.country_code,
        region: geoData.region,
        city: geoData.city,
        latitude: geoData.latitude,
        longitude: geoData.longitude,
        timezone: geoData.timezone.id,
      } : {
        country: 'unknown',
        country_code: 'unknown',
        region: 'unknown',
        city: 'unknown',
        latitude: 0,
        longitude: 0,
        timezone: 'unknown',
      },
      connection: geoData?.success ? {
        org: geoData.connection.org,
        isp: geoData.connection.isp,
      } : {
        org: 'unknown',
        isp: 'unknown',
      }
    }

    await setDoc(userMetricsRef, fullUserMetrics, { merge: true })
    console.log('Updated/created visit record for IP:', ip, 'with path:', currentPath)

    res.status(200).json({
      success: true,
      ip: ip,
      documentId: ipDocId,
      location: geoData?.success ? `${geoData.city}, ${geoData.country}` : 'unknown'
    })
  } catch (error) {
    console.error('Error logging user visit:', error)
    res.status(500).json({ error: 'Failed to log visit' })
  }
}