/** Component to display related articles at the bottom of article pages */

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Theme,
  Typography,
  useTheme,
} from "@mui/material"
import Link from "next/link"
import { RelatedArticleType } from "../article_configs/related_articles"

interface RelatedArticlesProps {
  relatedArticles: RelatedArticleType[]
  commonTags?: string[]
}

export default function RelatedArticles({
  relatedArticles,
  commonTags = [],
}: RelatedArticlesProps) {
  const theme: Theme = useTheme()

  if (relatedArticles.length === 0) {
    return null
  }

  return (
    <Box sx={{ mt: 6, mb: 4 }}>
      {/* Section Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 1,
            color: theme.palette.mode === "dark" ? "primary.main" : "primary.dark",
          }}
        >
          Related Articles
        </Typography>

        {commonTags.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Related by topics:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {commonTags.slice(0, 4).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.75rem",
                    height: 24,
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}
      </Box>

      {/* Related Articles Grid */}
      <Stack spacing={2}>
        {relatedArticles.map((article, index) => (
          <Card
            key={`${article.cardPageLink}-${index}`}
            sx={{
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: theme.shadows[8],
              },
            }}
          >
            <Link href={article.cardPageLink} passHref legacyBehavior>
              <CardActionArea>
                <CardContent>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        lineHeight: 1.3,
                        color: theme.palette.mode === "dark" ? "primary.light" : "primary.main",
                      }}
                    >
                      {article.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {article.cardDescription}
                    </Typography>

                    {/* Article metadata */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      {article.author && (
                        <Typography variant="caption" color="text.secondary">
                          By {article.author}
                        </Typography>
                      )}

                      {article.dateWritten && (
                        <Typography variant="caption" color="text.secondary">
                          {new Date(article.dateWritten).toLocaleDateString()}
                        </Typography>
                      )}
                    </Box>

                    {/* Tags */}
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                      {article.tagIds.slice(0, 3).map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="filled"
                          sx={{
                            fontSize: "0.7rem",
                            height: 20,
                            backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                            "&:hover": {
                              backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
                            },
                          }}
                        />
                      ))}
                      {article.tagIds.length > 3 && (
                        <Chip
                          label={`+${article.tagIds.length - 3}`}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: "0.7rem",
                            height: 20,
                          }}
                        />
                      )}
                    </Stack>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}