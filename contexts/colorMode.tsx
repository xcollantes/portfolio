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