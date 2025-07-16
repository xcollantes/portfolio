/** 404 page. */

import { Box } from "@mui/material"
import Image from "next/image"
import ErrorPage from "../components/ErrorTemplate"

export default function NotFound() {
  return (
    <>
      <ErrorPage errorTitle="Page not found" />
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 4,
        mb: 4
      }}>
        <Image
          priority
          src={"/images/404_pulp_fiction.gif"}
          alt=""
          width={400}
          height={400}
        />
      </Box>
    </>
  )
}
