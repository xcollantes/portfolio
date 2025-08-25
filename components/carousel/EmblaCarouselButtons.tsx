/** Predefined styling for buttons in Embla Carousel. */

import React from "react"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import emblaCss from "../../css/emblaCarousel.module.css"
import { Box } from "@mui/material"

export function PrevButton(props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#666",
        transition: "color 0.2s ease",
        "&:hover": {
          color: "#2196F3"
        }
      }}
      {...props}
    >
      <ArrowBackIosNewIcon fontSize="medium" />
    </Box>
  )
}

export function NextButton(props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#666",
        transition: "color 0.2s ease",
        "&:hover": {
          color: "#2196F3"
        }
      }}
      {...props}
    >
      <ArrowForwardIosIcon fontSize="medium" />
    </Box>
  )
}
