/** Template for error response pages. */

import { Box, Button, Typography } from "@mui/material"
import DarkModeSwitch from "./DarkModeCustomSwitch"
import { MaterialLink } from "./MaterialLink"
import Image from "next/image"

interface ErrorPagePropType {
  errorTitle: string
}

export default function ErrorPage({ errorTitle }: ErrorPagePropType) {
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <DarkModeSwitch />
      </Box>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        {errorTitle}
      </Typography>
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
        }}
      >
        <Button variant="contained" to={"/"} component={MaterialLink}>
          Home
        </Button>
      </Box>
      <Box sx={{ textAlign: "center", mt: 4, ml: 5 }}>
        <Image
          src={"/images/404_pulp_fiction.gif"}
          alt=""
          width={300}
          height={300}
        />
      </Box>
    </>
  )
}
