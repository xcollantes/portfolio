//@ts-nocheck

import { Box } from "@mui/material"

export default function Test() {
  return (
    <>
      <form action="?" method="POST">
        <Box
          className="g-recaptcha"
          data-sitekey="6LdcalIpAAAAAK1R2htgf1Xh50vqGME0axIpELhg"
        ></Box>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}
