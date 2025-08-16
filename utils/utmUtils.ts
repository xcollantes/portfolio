/** Utility functions for handling UTM parameters. */

export interface UTMParameters {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

/**
 * Extracts UTM parameters from a URL or the current window location.
 * @param url - Optional URL to parse. If not provided, uses window.location
 * @returns Object containing UTM parameters
 */
export function extractUTMParameters(url?: string): UTMParameters {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const targetUrl = url ? new URL(url) : new URL(window.location.href)
    const params = targetUrl.searchParams

    const utmParams: UTMParameters = {}

    if (params.has('utm_source')) {
      utmParams.utm_source = params.get('utm_source') || undefined
    }
    if (params.has('utm_medium')) {
      utmParams.utm_medium = params.get('utm_medium') || undefined
    }
    if (params.has('utm_campaign')) {
      utmParams.utm_campaign = params.get('utm_campaign') || undefined
    }
    if (params.has('utm_term')) {
      utmParams.utm_term = params.get('utm_term') || undefined
    }
    if (params.has('utm_content')) {
      utmParams.utm_content = params.get('utm_content') || undefined
    }

    return utmParams
  } catch (error) {
    console.error('Error extracting UTM parameters:', error)
    return {}
  }
}

/**
 * Checks if any UTM parameters are present in the current URL.
 * @returns boolean indicating if UTM parameters exist
 */
export function hasUTMParameters(): boolean {
  const params = extractUTMParameters()
  return Object.keys(params).length > 0
}

/**
 * Stores UTM parameters in session storage for attribution persistence.
 * @param utmParams - UTM parameters to store
 */
export function storeUTMParameters(utmParams: UTMParameters): void {
  if (typeof window === 'undefined') return

  try {
    const filteredParams = Object.fromEntries(
      Object.entries(utmParams).filter(([_, value]) => value !== undefined)
    )
    
    if (Object.keys(filteredParams).length > 0) {
      sessionStorage.setItem('utm_attribution', JSON.stringify(filteredParams))
      console.log('🏷️ UTM parameters stored:', filteredParams)
    }
  } catch (error) {
    console.error('Error storing UTM parameters:', error)
  }
}

/**
 * Retrieves UTM parameters from session storage.
 * @returns Stored UTM parameters or empty object
 */
export function getStoredUTMParameters(): UTMParameters {
  if (typeof window === 'undefined') return {}

  try {
    const stored = sessionStorage.getItem('utm_attribution')
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error retrieving UTM parameters:', error)
    return {}
  }
}

/**
 * Clears stored UTM parameters from session storage.
 */
export function clearStoredUTMParameters(): void {
  if (typeof window === 'undefined') return

  try {
    sessionStorage.removeItem('utm_attribution')
  } catch (error) {
    console.error('Error clearing UTM parameters:', error)
  }
}

/**
 * Gets the most relevant UTM parameters, preferring current URL over stored.
 * @returns Combined UTM parameters (current URL takes precedence)
 */
export function getCurrentUTMParameters(): UTMParameters {
  const currentParams = extractUTMParameters()
  const storedParams = getStoredUTMParameters()
  
  // Current URL parameters take precedence over stored ones
  return { ...storedParams, ...currentParams }
}