/** UTM parameter utilities for tracking share analytics */

export interface UTMParameters {
  utm_source: string
}

export type ShareSource = 'facebook' | 'linkedin' | 'twitter' | 'copy' | 'native'
export type PageType = 'article' | 'homepage' | 'other'

/**
 * Generates UTM parameters for different share sources
 * @param source - The sharing platform
 * @returns UTM parameters object
 */
export function generateUTMParameters(source: ShareSource): UTMParameters {
  return {
    utm_source: source
  }
}

/**
 * Appends UTM parameters to a URL
 * @param url - Base URL to append parameters to
 * @param utmParams - UTM parameters to append
 * @returns URL with UTM parameters
 */
export function appendUTMToUrl(url: string, utmParams: UTMParameters): string {
  // Validate that the URL is properly formatted
  if (!url || typeof url !== 'string') {
    throw new Error('Invalid URL provided: URL must be a non-empty string.')
  }

  // Check if URL contains 'undefined' which would make it invalid
  if (url.includes('undefined')) {
    throw new Error('Invalid URL provided: URL contains undefined values.')
  }

  try {
    const urlObj = new URL(url)

    Object.entries(utmParams).forEach(([key, value]) => {
      if (value) {
        urlObj.searchParams.set(key, value)
      }
    })

    return urlObj.toString()
  } catch (error) {
    throw new Error(`Failed to construct URL from "${url}": ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Creates a trackable share URL with UTM parameters
 * @param baseUrl - The original URL to share
 * @param source - The sharing platform
 * @returns URL with UTM tracking parameters
 */
export function createTrackableShareUrl(
  baseUrl: string,
  source: ShareSource
): string {
  // Validate baseUrl before processing
  if (!baseUrl || typeof baseUrl !== 'string') {
    throw new Error('Invalid baseUrl provided: URL must be a non-empty string.')
  }

  if (baseUrl.includes('undefined')) {
    throw new Error('Invalid baseUrl provided: URL contains undefined values.')
  }

  const utmParams = generateUTMParameters(source)
  return appendUTMToUrl(baseUrl, utmParams)
}