/** Bottom footer. */

import { Box, Button, Divider, Theme, useTheme } from "@mui/material"
import { MaterialLink } from "./MaterialLink"

export default function Footer() {
  const theme: Theme = useTheme()
  const sxButton = {
    textTransform: "none",
    textDecoration: "none",
    color: theme.palette.text.primary,
    fontWeight: 600,
    boxShadow: "none",
    p: 2,
    borderRadius: 2,
  }

  return (
    <>
      <Divider sx={{ mt: 8 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Button variant="text" sx={sxButton} to={"/"} component={MaterialLink}>
          Home
        </Button>

        {/* TODO(https://github.com/xcollantes/portfolio/issues/33): Add next article feature */}
        {/*
        <Divider orientation="vertical" variant="middle" flexItem />
         <Button variant="text" sx={sxButton} to={"/"} component={MaterialLink}>
          Next <ArrowForwardIosRoundedIcon sx={{ fontSize: "small", ml: 1 }} />
        </Button> */}
      </Box>
    </>
  )
}
