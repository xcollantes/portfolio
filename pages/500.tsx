/** 500 page. */

import Image from "next/image"
import { Box } from "@mui/material"
import ErrorPage from "../components/ErrorTemplate"

export default function ServerError() {
  return (
    <>
      <ErrorPage errorTitle="Server error" />
      <Box
        sx={{
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <Image
          priority
          src={"/images/office_space_printer.gif"}
          alt=""
          width={500}
          height={200}
        />
      </Box>
    </>
  )
}
