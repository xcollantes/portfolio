/** 404 page. */

import Image from "next/image"
import { Box } from "@mui/material"
import ErrorPage from "../components/ErrorTemplate"

export default function NotFound() {
  return (
    <>
      <ErrorPage errorTitle="Page not found" />
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
