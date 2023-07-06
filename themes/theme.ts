/**
 * Overrides default Material UI theme.
 *
 * https://mui.com/customization/default-theme
 */

import { Theme, createTheme } from "@mui/material"

// Used as a util but not exported as its own theme.
const muiTheme: Theme = createTheme()
console.log(muiTheme.palette)
export const base = {
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Open Sans"',
      "Roboto",
      "Oxygen",
      "Arial",
    ].join(","),
    fontSize: 15,
    h1: {},
    h2: {},
    h3: {},
    subtitle1: {},
    body1: {},
  },
  palette: { primary: { main: "#0070f3" } },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          boxShadow: `0px 5px 14px 0px rgba(0,118,255,0.39)`,
        },
      },
    },
  },
}

// export const wave: Theme = deepmerge(base, {})
