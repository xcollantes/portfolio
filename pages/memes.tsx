/** Random Memes page. */

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Theme,
  Typography,
  useTheme,
} from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import DarkModeSwitch from "../components/DarkMode"

interface MemeData {
  postLink: string
  subreddit: string
  title: string
  url: string
  nsfw: boolean
  spoiler: boolean
  author: string
  ups: number
  preview?: string[]
}

export default function MemesPage() {
  const [meme, setMeme] = useState<MemeData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const theme: Theme = useTheme()

  const fetchRandomMeme = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch("https://meme-api.com/gimme")
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: MemeData = await response.json()
      setMeme(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch meme")
      console.error("Error fetching meme:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      
      <Box sx={{ minHeight: "100vh", py: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, mx: 2 }}>
              <Typography variant="h2" component="h1">
                Random Memes
              </Typography>
              <DarkModeSwitch />
            </Box>
          </Grid>
          
          <Grid xs={12} md={8} lg={6}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={fetchRandomMeme}
                disabled={loading}
                sx={{ minWidth: 200 }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1 }} />
                    Loading...
                  </>
                ) : (
                  "Get Random Meme"
                )}
              </Button>
            </Box>

            {error && (
              <Box sx={{ mb: 4 }}>
                <Typography color="error" align="center">
                  Error: {error}
                </Typography>
              </Box>
            )}

            {meme && !loading && (
              <Card sx={{ maxWidth: "100%", mx: "auto" }}>
                <CardMedia
                  component="img"
                  image={meme.url}
                  alt={meme.title}
                  sx={{
                    maxHeight: 600,
                    objectFit: "contain",
                    width: "100%",
                    backgroundColor: theme.palette.background.default,
                  }}
                  onError={(e) => {
                    console.error("Image failed to load:", meme.url)
                    setError("Failed to load meme image")
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {meme.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    From r/{meme.subreddit} by u/{meme.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    👍 {meme.ups.toLocaleString()} upvotes
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    href={meme.postLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Reddit
                  </Button>
                  <Button size="small" onClick={fetchRandomMeme}>
                    Get Another Meme
                  </Button>
                </CardActions>
              </Card>
            )}

            {!meme && !loading && !error && (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  Click the button above to load your first random meme!
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
      
      <Footer />
    </>
  )
}