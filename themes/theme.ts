/**
 * Overrides default Material UI theme.
 *
 * https://mui.com/customization/default-theme
 */

import { Kumbh_Sans, Outfit, Permanent_Marker } from "next/font/google"
import { Theme, ThemeOptions, createTheme } from "@mui/material"

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
})
const kumbhSans = Kumbh_Sans({ subsets: ["latin"], weight: "400" })
const outfit_font = Outfit({ subsets: ["latin"], weight: "300" })
const outfit = outfit_font.style.fontFamily

// Used as a util but not exported as its own theme.
export const defaultTheme: Theme = createTheme()

export const base: ThemeOptions = {
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      outfit,
      "Roboto",
      "Arial",
    ].join(","),
    fontSize: 16,

    h1: { fontFamily: permanentMarker.style.fontFamily, fontSize: 110 },
    subtitle1: { fontFamily: kumbhSans.style.fontFamily, fontSize: 41 },

    h2: { fontFamily: outfit, fontSize: 70 },
    subtitle2: { fontFamily: outfit, fontSize: 28 },

    h3: { fontFamily: outfit, fontSize: 45 },
    h4: { fontFamily: outfit, fontSize: 32, fontWeight: "bold" },

    body1: { fontFamily: outfit, fontSize: 22 },
  },
  palette: {
    primary: { main: "#0070f3" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          boxShadow: `0px 5px 14px 0px rgba(0,118,255,0.39)`,
          borderRadius: 28,
        },
        outlined: { boxShadow: "none" },
      },
    },
    MuiCard: { styleOverrides: { root: { borderRadius: 8 } } },
  },
}

// export const wave: Theme = deepmerge(base, {})

// font-family: 'Koulen' strong and professional
// font-family: 'Permanent Marker' fun
// font-family: 'Tilt Warp'
// font-family: 'Hanuman'

// font-family: 'Quicksand'

// font-family: 'Plus Jakarta Sans', sans-serif;

// font-family: 'Kumbh Sans', sans-serif;
// font-family: 'Outfit', sans-serif;
