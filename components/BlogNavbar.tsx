/** Navbar component specifically for blog-only mode. */

import { Box, Container, Theme, Typography, useTheme } from "@mui/material"
import DarkModeSwitch from "./DarkMode"
import Drawer from "./Drawer"
import { MaterialLink } from "./MaterialLink"
import { getSiteConfig } from "../config/siteConfig"

interface BlogNavbarProps {
  containerWidth?: "xs" | "sm" | "md" | "lg" | "xl"
}

export default function BlogNavbar({ containerWidth = "lg" }: BlogNavbarProps) {
  const theme: Theme = useTheme()
  const siteConfig = getSiteConfig()

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        bgcolor: theme.palette.mode === "dark" ? theme.palette.background.paper : "#ffffff",
        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
        p: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderBottom: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
      }}
    >
      <Container maxWidth={containerWidth}>
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
              color: "inherit",
              "&:hover": {
                textDecoration: "none",
                color: "inherit"
              }
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "24px", sm: "28px", md: "32px" },
                fontWeight: "bold",
                letterSpacing: "-0.02em"
              }}
            >
              Xavier's Blog
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