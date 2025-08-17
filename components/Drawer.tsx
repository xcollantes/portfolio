/** Side drawer. */

import CloseIcon from "@mui/icons-material/Close"
import FeedbackRoundedIcon from "@mui/icons-material/FeedbackRounded"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Theme,
  useTheme,
} from "@mui/material"


import { useState } from "react"
import DarkMode from "./DarkMode"
import { MaterialLink } from "./MaterialLink"
import TermsPrivacyLinks from "./TermsPrivacyLinks"

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
        <Box sx={{ ...boxWidth, display: 'flex', flexDirection: 'column', height: '100vh' }} role="presentation">
          <List sx={{ flexGrow: 1 }}>
            <ListItem key={key++} sx={{ pb: 1 }} disablePadding>
              <ListItemButton disableRipple>
                <ListItemText>
                  <CloseIcon onClick={toggleDrawer} />
                </ListItemText>
                <DarkMode />
              </ListItemButton>
            </ListItem>

            <ListItem key={key++} disablePadding>
              <ListItemButton to="/" component={MaterialLink} onClick={toggleDrawer}>
                <ListItemText primary="Home" />
                <HomeRoundedIcon sx={{ mr: 1 }} />
              </ListItemButton>
            </ListItem>

            <ListItem key={key++} disablePadding>
              <ListItemButton to="/recs" component={MaterialLink} onClick={toggleDrawer}>
                <ListItemText primary="Recommendations" />
                <StarRoundedIcon sx={{ mr: 1 }} />
              </ListItemButton>
            </ListItem>

            <ListItem key={key++} disablePadding>
              <ListItemButton to="/feedback" component={MaterialLink} onClick={toggleDrawer}>
                <ListItemText primary="Feedback" />
                <FeedbackRoundedIcon sx={{ mr: 1 }} />
              </ListItemButton>
            </ListItem>

            {/* TODO(): Add related content */}
            {/* <Divider sx={{ pt: 5 }} />
            <ListItem key={key++} sx={{ fontWeight: "bold" }}>
              Related
            </ListItem> */}
          </List>

          <Box sx={{ p: 2, mt: 'auto' }}>
            <TermsPrivacyLinks />
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
