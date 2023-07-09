/** Handle changes to dark mode selection. */

import { ChangeEvent, useState } from "react"
import DarkModeCustomSwitch from "./DarkModeCustomSwitch"
import {
  ColorModeContextType,
  useColorModeContext,
} from "../contexts/colorMode"
import { yoda, darkSideQuotes, lightSideQuotes, darthVader } from "./motd"

export default function DarkModeSwitch() {
  const { darkMode, setDarkMode }: ColorModeContextType = useColorModeContext()
  const [cycle, setCycle] = useState<number>(0)

  const maxCycles: number =
    Math.min(darkSideQuotes.length, lightSideQuotes.length) - 1

  return (
    <DarkModeCustomSwitch
      onChange={(event: ChangeEvent<HTMLInputElement>, value: boolean) => {
        setDarkMode(value)

        if (cycle == maxCycles) {
          setCycle(0)
        }

        if (value == true) {
          // The Dark side, the user has chosen
          console.log(darthVader, darkSideQuotes[cycle])
          // Cycle completes after light side since default is dark side
          setCycle(cycle + 1)
        } else {
          // User redeemed self and switches back to the light
          console.log(yoda, lightSideQuotes[cycle])
        }
      }}
      checked={darkMode}
    />
  )
}
