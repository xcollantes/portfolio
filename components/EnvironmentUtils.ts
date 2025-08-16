/** Environment detection utilities for analytics. */

export interface EnvironmentInfo {
  environment: 'development' | 'staging' | 'production'
  hostname: string
  isLocalhost: boolean
  branch?: string
}

/**
 * Detect the current environment based on hostname and NODE_ENV.
 * @returns Environment information object
 */
export function detectEnvironment(): EnvironmentInfo {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'unknown'
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')
  
  let environment: 'development' | 'staging' | 'production'
  
  if (isLocalhost || process.env.NODE_ENV === 'development') {
    environment = 'development'
  } else if (hostname.includes('staging') || hostname.includes('preview') || hostname.includes('vercel.app')) {
    environment = 'staging'
  } else {
    environment = 'production'
  }
  
  return {
    environment,
    hostname,
    isLocalhost,
    branch: process.env.VERCEL_GIT_COMMIT_REF || undefined
  }
}

/**
 * Get environment context to include in analytics events.
 * @returns Object with environment metadata
 */
export function getEnvironmentContext() {
  const envInfo = detectEnvironment()
  
  return {
    environment: envInfo.environment,
    hostname: envInfo.hostname,
    is_localhost: envInfo.isLocalhost,
    ...(envInfo.branch && { git_branch: envInfo.branch })
  }
}

/**
 * Check if analytics should be tracked in the current environment.
 * @returns true if tracking should be enabled
 */
export function shouldTrackAnalytics(): boolean {
  const envInfo = detectEnvironment()
  
  // Skip tracking in development unless explicitly enabled
  if (envInfo.environment === 'development') {
    return process.env.NEXT_PUBLIC_ENABLE_DEV_ANALYTICS === 'true'
  }
  
  return true
}