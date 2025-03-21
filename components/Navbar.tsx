/** Navbar for non-home pages. */

import { Box, Container, Theme, Typography, useTheme } from "@mui/material"
import DarkModeSwitch from "./DarkMode"
import Drawer from "./Drawer"
import { MaterialLink } from "./MaterialLink"

export default function Navbar() {
  const theme: Theme = useTheme()

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        bgcolor: theme.palette.mode === "dark" ? "#6a1b9a" : "#ffffff",
        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
        p: 1.5,
        boxShadow: "0 5px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Container maxWidth={"md"}>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}>
          <Box
            component={MaterialLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "28px",
                [theme.breakpoints.up("sm")]: {
                  fontSize: "36px",
                },
              }}
            >
              xavier collantes
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <DarkModeSwitch />
            <Drawer />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}