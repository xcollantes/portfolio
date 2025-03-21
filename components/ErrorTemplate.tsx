/** Template for error response pages. */

import { Box, Button, Typography } from "@mui/material"
import { MaterialLink } from "./MaterialLink"

interface ErrorPagePropType {
  errorTitle: string
}

export default function ErrorPage({ errorTitle }: ErrorPagePropType) {
  return (
    <>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        {errorTitle}
      </Typography>
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          to={"/"}
          component={MaterialLink}
          sx={{ mb: 7 }}
        >
          Home
        </Button>
      </Box>
    </>
  )
}
