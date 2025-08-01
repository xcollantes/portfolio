/** Side drawer. */

import {
  List,
  ListItem,
  SwipeableDrawer,
  Box,
  ListItemText,
  Theme,
  useTheme,
  ListItemButton,
  Divider,
  Typography,
} from "@mui/material"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import CloseIcon from "@mui/icons-material/Close"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import ArticleIcon from "@mui/icons-material/Article"

import { useState } from "react"
import DarkMode from "./DarkMode"
import { MaterialLink } from "./MaterialLink"
import { MetadataType } from "../article_configs/process_articles"
import { orderedIncludeBlogs } from "../article_configs/article_order_config"

/**
 * Find related blogs based on the top tag of the current article.
 * Filters by top tag and orders according to article_order_config.ts.
 */
function getRelatedBlogs(
  currentArticle: MetadataType | null,
  allArticles: MetadataType[]
): MetadataType[] {
  if (!currentArticle || !currentArticle.tagIds || currentArticle.tagIds.length === 0) {
    return []
  }

  // Get the top tag (first tag in the array).
  const topTag = currentArticle.tagIds[0]

  // Filter blogs that have the same top tag and are different from current article.
  const relatedBlogs = allArticles.filter((article) => {
    return (
      article.articleType === "BLOG" &&
      article.tagIds &&
      article.tagIds.includes(topTag) &&
      article.title !== currentArticle.title
    )
  })

  // Order according to orderedIncludeBlogs config.
  const orderedRelated = relatedBlogs.sort((a, b) => {
    const aFileName = `${a.cardPageLink.split('/').pop()}.md`
    const bFileName = `${b.cardPageLink.split('/').pop()}.md`
    
    const aIndex = orderedIncludeBlogs.indexOf(aFileName)
    const bIndex = orderedIncludeBlogs.indexOf(bFileName)
    
    // If not found in order config, put at end.
    const aOrder = aIndex === -1 ? 9999 : aIndex
    const bOrder = bIndex === -1 ? 9999 : bIndex
    
    return aOrder - bOrder
  })

  // Return maximum of 5 related blogs.
  return orderedRelated.slice(0, 5)
}

interface DrawerPropType {
  anchor?: "left" | "right"
  currentArticle?: MetadataType | null
  allArticles?: MetadataType[]
}

export default function Drawer({ 
  anchor = "right", 
  currentArticle = null, 
  allArticles = [] 
}: DrawerPropType) {
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

  // Get related blogs.
  const relatedBlogs = getRelatedBlogs(currentArticle, allArticles)

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
          <List sx={{}}>
            <ListItem key={key++} sx={{ pb: 1 }} disablePadding>
              <ListItemButton disableRipple>
                <ListItemText>
                  <CloseIcon onClick={toggleDrawer} />
                </ListItemText>
                <DarkMode />
              </ListItemButton>
            </ListItem>

            <ListItem key={key++} disablePadding>
              <ListItemButton to="/" component={MaterialLink}>
                <ListItemText primary="Home" />
                <HomeRoundedIcon sx={{ mr: 1 }} />
              </ListItemButton>
            </ListItem>

            <ListItem key={key++} disablePadding>
              <ListItemButton to="/recs" component={MaterialLink}>
                <ListItemText primary="Recommendations" />
                <StarRoundedIcon sx={{ mr: 1 }} />
              </ListItemButton>
            </ListItem>

            {/* Related content section */}
            {relatedBlogs.length > 0 && (
              <>
                <Divider sx={{ pt: 2, mb: 1 }} />
                <ListItem key={key++} sx={{ fontWeight: "bold", pb: 0 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                    Related Blogs
                  </Typography>
                </ListItem>
                {relatedBlogs.map((blog) => (
                  <ListItem key={key++} disablePadding>
                    <ListItemButton 
                      to={blog.cardPageLink} 
                      component={MaterialLink}
                      onClick={toggleDrawer}
                    >
                      <ListItemText 
                        primary={blog.title}
                        primaryTypographyProps={{ 
                          variant: "body2",
                          sx: { 
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }
                        }}
                      />
                      <ArticleIcon sx={{ mr: 1, fontSize: "small" }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </>
            )}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
