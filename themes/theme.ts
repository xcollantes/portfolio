/**
 * Overrides default Material UI theme.
 *
 * https://mui.com/customization/default-theme
 */

import "@fontsource/permanent-marker" // Defaults to weight 400
import "@fontsource/kumbh-sans" // Defaults to weight 400
import "@fontsource/outfit"
import { Theme, createTheme } from "@mui/material"

// Used as a util but not exported as its own theme.
const muiTheme: Theme = createTheme()
console.log(muiTheme.palette)
export const base = {
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Outfit",
      "Roboto",
      "Arial",
    ].join(","),
    fontSize: 16,
    h1: { fontFamily: ["Permanent Marker"], fontSize: 110 },
    subtitle1: { fontFamily: ["Kumbh Sans"], fontSize: 41 },

    h2: { fontFamily: ["Outfit"], fontSize: 70 },
    subtitle2: { fontFamily: ["Outfit"], fontSize: 28 },

    h3: { fontFamily: ["Outfit"], fontSize: 45 },
    h4: { fontFamily: ["Outfit"], fontSize: 32, fontWeight: "bold" },

    body1: { fontFamily: ["Outfit"], fontSize: 22 },
  },
  palette: { primary: { main: "#0070f3" } },
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
