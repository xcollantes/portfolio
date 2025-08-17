/** Navbar component specifically for blog-only mode with scroll-responsive behavior. */

import { Box, Container, Theme, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import DarkModeSwitch from "./DarkMode"
import Drawer from "./Drawer"
import { MaterialLink } from "./MaterialLink"

interface BlogNavbarProps {
  containerWidth?: "xs" | "sm" | "md" | "lg" | "xl"
}

export default function BlogNavbar({ containerWidth = "lg" }: BlogNavbarProps) {
  const theme: Theme = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100) // Change navbar after scrolling 100px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        bgcolor: isScrolled 
          ? (theme.palette.mode === "dark" ? theme.palette.background.paper : "#ffffff")
          : "transparent",
        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
        p: isScrolled ? 2 : { xs: 2, md: 3 },
        boxShadow: isScrolled ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
        borderBottom: isScrolled 
          ? `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`
          : "none",
        transition: "all 0.3s ease-in-out",
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
                fontSize: isScrolled 
                  ? { xs: "20px", sm: "24px", md: "28px" }
                  : { xs: "32px", sm: "48px", md: "56px" },
                fontWeight: "bold",
                letterSpacing: "-0.02em",
                transition: "font-size 0.3s ease-in-out",
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