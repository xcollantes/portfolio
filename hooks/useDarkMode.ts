/** Custom hook for dark mode integration with CSS classes */

import { useColorModeContext } from "../contexts/colorMode"

export interface DarkModeHook {
  isDark: boolean
  isLight: boolean
  toggle: () => void
  setDark: () => void
  setLight: () => void
  getClassName: (lightClass?: string, darkClass?: string) => string
}

/**
 * Custom hook that provides easy access to dark mode state and utilities
 * for integrating with CSS classes from darkmode.css
 * 
 * @returns {DarkModeHook} Object containing dark mode state and utilities
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isDark, toggle, getClassName } = useDarkMode()
 *   
 *   return (
 *     <div className={getClassName('light-bg', 'dark-bg')}>
 *       <button 
 *         onClick={toggle}
 *         className="dark-mode-button"
 *       >
 *         Toggle {isDark ? 'Light' : 'Dark'} Mode
 *       </button>
 *     </div>
 *   )
 * }
 * ```
 */
export function useDarkMode(): DarkModeHook {
  const { darkMode, setDarkMode } = useColorModeContext()

  return {
    /** Current dark mode state */
    isDark: darkMode,
    /** Current light mode state */
    isLight: !darkMode,
    
    /** Toggle between dark and light mode */
    toggle: () => setDarkMode(!darkMode),
    
    /** Set to dark mode */
    setDark: () => setDarkMode(true),
    
    /** Set to light mode */
    setLight: () => setDarkMode(false),
    
    /**
     * Get appropriate className based on current theme
     * @param lightClass - Class name for light mode
     * @param darkClass - Class name for dark mode
     * @returns The appropriate class name
     */
    getClassName: (lightClass = '', darkClass = '') => {
      return darkMode ? darkClass : lightClass
    }
  }
}

/**
 * Utility function to combine dark mode classes with existing classes
 * @param baseClasses - Base CSS classes
 * @param darkModeClasses - Dark mode specific classes
 * @returns Combined class string
 */
export function combineDarkModeClasses(
  baseClasses: string,
  darkModeClasses: string
): string {
  return `${baseClasses} ${darkModeClasses}`.trim()
}

/**
 * Pre-built class combinations for common components
 */
export const DarkModeClassNames = {
  card: 'dark-mode-card',
  button: 'dark-mode-button',
  buttonSecondary: 'dark-mode-button-secondary',
  buttonOutline: 'dark-mode-button-outline',
  input: 'dark-mode-input',
  code: 'dark-mode-code',
  navbar: 'dark-mode-navbar',
  modal: 'dark-mode-modal',
  overlay: 'dark-mode-overlay',
  link: 'dark-mode-link',
  divider: 'dark-mode-divider',
  tooltip: 'dark-mode-tooltip',
  badge: 'dark-mode-badge',
  badgeSuccess: 'dark-mode-badge-success',
  badgeWarning: 'dark-mode-badge-warning',
  badgeError: 'dark-mode-badge-error',
  bgPrimary: 'theme-bg-primary',
  bgSecondary: 'theme-bg-secondary',
  bgCard: 'theme-bg-card',
  textPrimary: 'theme-text-primary',
  textSecondary: 'theme-text-secondary',
  textMuted: 'theme-text-muted',
} as const