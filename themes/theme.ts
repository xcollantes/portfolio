/**
 * Overrides default Material UI theme.
 *
 * https://mui.com/customization/default-theme
 */

import { createTheme, PaletteOptions, Theme, ThemeOptions } from "@mui/material"
import { Poppins, Permanent_Marker } from "next/font/google"

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
})
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"]
})
const poppinsFamily = poppins.style.fontFamily

// Used as a util but not exported as its own theme.
export const defaultTheme: Theme = createTheme()

// Color palette definition
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: "#2563eb", // Modern blue that's accessible
    light: "#93c5fd",
    dark: "#1e40af",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#FF1493", // Hot pink for accent elements
    light: "#FF8AC4",
    dark: "#FF1493",
    contrastText: "#ffffff",
  },
  error: {
    main: "#ef4444",
    light: "#fca5a5",
    dark: "#b91c1c",
  },
  warning: {
    main: "#f59e0b",
    light: "#fcd34d",
    dark: "#d97706",
  },
  info: {
    main: "#0ea5e9",
    light: "#7dd3fc",
    dark: "#0369a1",
  },
  success: {
    main: "#10b981",
    light: "#6ee7b7",
    dark: "#047857",
  },
  text: {
    primary: "#18181b",
    secondary: "#4b5563",
    disabled: "#9ca3af",
  },
  background: {
    default: "#ffffff",
    paper: "#f8fafc",
  },
}

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: "#3b82f6", // Brighter blue for dark mode
    light: "#93c5fd",
    dark: "#1e3a8a",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#FF1493", // Hot pink for dark mode
    light: "#FF1493",
    dark: "#D1006A",
    contrastText: "#ffffff",
  },
  error: {
    main: "#f87171",
    light: "#fca5a5",
    dark: "#b91c1c",
  },
  warning: {
    main: "#fbbf24",
    light: "#fcd34d",
    dark: "#d97706",
  },
  info: {
    main: "#38bdf8",
    light: "#7dd3fc",
    dark: "#0369a1",
  },
  success: {
    main: "#34d399",
    light: "#6ee7b7",
    dark: "#047857",
  },
  text: {
    primary: "#f8fafc",
    secondary: "#cbd5e1",
    disabled: "#64748b",
  },
  background: {
    default: "#0f172a",
    paper: "#1e293b",
  },
}

export const base: ThemeOptions = {
  typography: {
    fontFamily: [
      poppinsFamily,
      "-apple-system",
      "BlinkMacSystemFont",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),
    fontSize: 16,

    h1: { fontFamily: permanentMarker.style.fontFamily, fontSize: 110 },
    subtitle1: { fontFamily: poppinsFamily, fontSize: 41, fontWeight: 500 },

    h2: { fontFamily: poppinsFamily, fontSize: 70, fontWeight: 600 },
    subtitle2: { fontFamily: poppinsFamily, fontSize: 28, fontWeight: 500 },

    h3: { fontFamily: poppinsFamily, fontSize: 45, fontWeight: 600 },
    h4: { fontFamily: poppinsFamily, fontSize: 32, fontWeight: 600 },

    body1: { fontFamily: poppinsFamily, fontSize: 22, fontWeight: 400 },
  },
  palette: lightPalette,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          boxShadow: `0px 5px 14px 0px rgba(37,99,235,0.45)`,
          borderRadius: 28,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `0px 8px 16px 0px rgba(255,20,147,0.6)`,
            backgroundColor: "#FF1493",
            color: "#ffffff",
          }
        },
        outlined: {
          boxShadow: "none",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `0px 4px 10px 0px rgba(255,20,147,0.35)`,
            backgroundColor: "#FF1493",
            color: "#ffffff",
          }
        },
        containedSecondary: {
          boxShadow: `0px 5px 14px 0px rgba(255,20,147,0.45)`,
          "&:hover": {
            boxShadow: `0px 8px 16px 0px rgba(255,20,147,0.6)`,
            backgroundColor: "#FF1493",
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.12)",
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          transition: "color 0.2s ease",
          "&:hover": {
            textDecoration: "underline",
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        }
      }
    },
  },
}

// font-family: 'Koulen' strong and professional
// font-family: 'Permanent Marker' fun
// font-family: 'Tilt Warp'
// font-family: 'Hanuman'

// font-family: 'Quicksand'

// font-family: 'Plus Jakarta Sans', sans-serif;

// font-family: 'Kumbh Sans', sans-serif;
// font-family: 'Outfit', sans-serif;
