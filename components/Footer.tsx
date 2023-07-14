/** Bottom footer. */

import { Box, Button, Divider } from "@mui/material"
import { MaterialLink } from "./MaterialLink"

export default function Footer() {
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
        <Button variant="text" to={"/"} component={MaterialLink}>
          Home
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button variant="text" to={"/"} component={MaterialLink}>
          Next
        </Button>
      </Box>
    </>
  )
}
