/** Handle changes to dark mode selection. */

import { ChangeEvent, useState } from "react"
import DarkModeCustomSwitch from "./DarkModeCustomSwitch"
import {
  ColorModeContextType,
  useColorModeContext,
} from "../contexts/colorMode"

export default function DarkModeSwitch() {
  const { darkMode, setDarkMode }: ColorModeContextType = useColorModeContext()

  return (
    <DarkModeCustomSwitch
      onChange={(event: ChangeEvent<HTMLInputElement>, value: boolean) =>
        setDarkMode(value)
      }
    />
  )
}
