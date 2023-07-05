/**
 * Overrides default Material UI theme.
 *
 * https://mui.com/customization/default-theme
 */

import { Theme, createTheme } from "@mui/material"

// Used as a util but not exported as its own theme.
const muiTheme: Theme = createTheme()

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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
}

// export const wave: Theme = deepmerge(base, {})
