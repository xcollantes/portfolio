/** Home page. */

// MUI uses createContext() so our use of MUI must be client components only:
// https://github.com/vercel/next.js/discussions/47602
"use client"

import { Typography } from "@mui/material"

export default function Page() {
  return (
    <>
      <Typography variant="h1">Xavier Collantes</Typography>
      <Typography>Software engineer</Typography>
    </>
  )
}
