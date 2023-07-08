/** Custom fade in for elements. */

import { ReactElement, useMemo, useState } from "react"
import { Grow } from "@mui/material"

interface FadeCustomPropType {
  children: ReactElement<any, any>
}

export default function FadeCustom({ children }: FadeCustomPropType) {
  const [show, setShow] = useState<boolean>(false)

  useMemo(() => {
    setShow(true)
  }, [])

  return (
    <div>
      <Grow in={show}>{children}</Grow>
    </div>
  )
}
