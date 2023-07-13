/** Side drawer. */
import {
  List,
  ListItem,
  SwipeableDrawer,
  Box,
  ListItemText,
  Theme,
  useTheme,
} from "@mui/material"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"

import { useState } from "react"
import DarkMode from "./DarkMode"
import { MaterialLink } from "./MaterialLink"

interface DrawerPropType {
  anchor?: "left" | "right"
}

export default function Drawer({ anchor = "right" }: DrawerPropType) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const menuIcon = <MenuRoundedIcon fontSize="large" onClick={toggleDrawer} />

  const theme: Theme = useTheme()
  const boxWidth = {
    width: 400,
    [theme.breakpoints.down("md")]: { width: 300 },
  }

  let key: number = 0
  return (
    <>
      {menuIcon}
      <SwipeableDrawer
        open={drawerOpen}
        onOpen={toggleDrawer}
        onClose={toggleDrawer}
        anchor={anchor}
      >
        <Box sx={boxWidth} role="presentation">
          <List>
            <ListItem key={key++}>
              <HighlightOffRoundedIcon onClick={toggleDrawer} />
            </ListItem>

            <ListItem key={key++}>
              <MaterialLink to={"/"}>
                <ListItemText primary="Home" />
                <HomeRoundedIcon sx={{ mr: 1 }} />
              </MaterialLink>
            </ListItem>

            <ListItem key={key++}>
              <ListItemText primary="Mode" />
              <DarkMode />
            </ListItem>

            {/* TODO(): Add related content */}
            {/* <Divider sx={{ pt: 5 }} />
            <ListItem key={key++} sx={{ fontWeight: "bold" }}>
              Related
            </ListItem> */}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
