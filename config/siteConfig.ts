/**
 * Site configuration based on environment variables.
 * Handles different site modes (portfolio vs blog-only).
 */

export type SiteMode = 'portfolio' | 'blog-only'

export interface SiteConfig {
  mode: SiteMode
  title: string
  showPortfolioContent: boolean
  showRecommendations: boolean
  showExperienceCards: boolean
  baseUrl: string
  description: string
}

/**
 * Get current site configuration based on environment variables.
 */
export function getSiteConfig(): SiteConfig {
  const mode = (process.env.NEXT_PUBLIC_SITE_MODE || 'portfolio') as SiteMode
  const isPortfolio = mode === 'portfolio'

  return {
    mode,
    title: isPortfolio
      ? 'Xavier Collantes'
      : "Xavier's Blog",
    showPortfolioContent: isPortfolio,
    showRecommendations: isPortfolio,
    showExperienceCards: true, // Always show articles/experience cards
    baseUrl: isPortfolio
      ? 'https://xaviercollantes.dev'
      : 'https://blog.xaviercollantes.dev',
    description: isPortfolio
      ? 'Portfolio and blog of Software Engineer Xavier Collantes'
      : 'Technical blog by Xavier Collantes covering AI, software engineering'
  }
}

/**
 * Check if current site is in blog-only mode.
 */
export function isBlogOnlyMode(): boolean {
  return getSiteConfig().mode === 'blog-only'
}

/**
 * Check if current site is in portfolio mode.
 */
export function isPortfolioMode(): boolean {
  return getSiteConfig().mode === 'portfolio'
}