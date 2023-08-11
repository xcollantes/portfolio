/** 403 page. */

import Image from "next/image"
import { Box } from "@mui/material"
import ErrorPage from "../components/ErrorTemplate"

export default function AuthDenied() {
  return (
    <>
      <ErrorPage errorTitle="Ah ah ah, you didn't say the magic word..." />
      <Box sx={{ textAlign: "center", overflow: "hidden" }}>
        <Image
          priority
          src={"/images/dennis.gif"}
          alt=""
          width={418}
          height={498}
        />
      </Box>
    </>
  )
}
