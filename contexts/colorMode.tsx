/** Color context. */

"use client"

import {
  Theme,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material"
import {
  Context,
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { deepmerge } from "@mui/utils"
import { darkPalette, lightPalette } from "../themes/theme"

export interface ColorModeContextType {
  darkMode: boolean
  setDarkMode: Dispatch<SetStateAction<boolean>>
}

const ColorModeContext: Context<ColorModeContextType> =
  createContext<ColorModeContextType>({
    darkMode: true,
    setDarkMode: (darkMode: boolean) => {},
  })

export const useColorModeContext = () => {
  return useContext(ColorModeContext)
}

interface ColorModeContextProps {
  theme: Object
  children: ReactNode
}

/** ThemeProvider must contain the ColorModeContext. */
export function ColorModeProvider({ theme, children }: ColorModeContextProps) {
  const [darkMode, setDarkMode] = useState<boolean>(true)

  // Initialize dark mode from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode')
      if (savedMode !== null) {
        setDarkMode(JSON.parse(savedMode))
      } else {
        // Check user's system preference if no saved preference
        const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        setDarkMode(systemDarkMode)
      }
    }
  }, [])

  // Save dark mode preference to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }
  }, [darkMode])

  // Apply CSS classes to document element for CSS custom properties
  useMemo(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      
      if (darkMode) {
        root.setAttribute('data-theme', 'dark')
        root.classList.add('dark-theme')
        root.classList.remove('light-theme')
      } else {
        root.setAttribute('data-theme', 'light')
        root.classList.add('light-theme')
        root.classList.remove('dark-theme')
      }
    }
  }, [darkMode])

  /**
   * Read in object with customization and `createTheme` will fill in any
   * fields for theme which are not already defined.
   */
  const themeWithMode = useMemo<Theme>(
    () =>
      responsiveFontSizes(
        createTheme(
          deepmerge(theme, {
            palette: darkMode ? darkPalette : lightPalette,
          })
        )
      ),
    [darkMode, theme]
  )

  return (
    <ThemeProvider theme={themeWithMode}>
      <ColorModeContext.Provider value={{ darkMode, setDarkMode }}>
        {children}
      </ColorModeContext.Provider>
    </ThemeProvider>
  )
}