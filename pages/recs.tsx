/** Page for all recommendations listed with carousel design. */

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import LinkIcon from "@mui/icons-material/Link"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Stack,
  Theme,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { GetStaticPropsResult } from "next"
import { NextRouter, useRouter } from "next/router"
import { useEffect, useState, useCallback } from "react"
import { MaterialLink } from "../components/MaterialLink"
import { RecommendationRawType } from "../recommendation_configs/RecommendationTypes"
import { getRecommendationData } from "../recommendation_configs/process_recommendations"
import { sendGAEvent } from "@next/third-parties/google"
import { trackUserInteraction } from "../components/AnalyticsUtils"

/**
 * Runs at build time to statically generate preview cards.
 */
export async function getStaticProps(): Promise<
  GetStaticPropsResult<{
    recommendationsProp: RecommendationRawType[]
  }>
> {
  // Recommendations data.
  const recommendationData: RecommendationRawType[] = await getRecommendationData()
  console.log(recommendationData)

  return {
    props: { recommendationsProp: recommendationData },
  }
}

interface RecsProps {
  recommendationsProp: RecommendationRawType[]
}

export default function Recs(props: RecsProps) {
  const theme: Theme = useTheme()
  const router: NextRouter = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const recommendations = props.recommendationsProp
  
  // Carousel state
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [copySuccess, setCopySuccess] = useState<boolean>(false)
  const [copyMessage, setCopyMessage] = useState<string>("")
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  // Track page visit when the page loads
  useEffect(() => {
    sendGAEvent("recommendations_page_view", {
      recommendation_count: recommendations.length,
    })
  }, [])

  // Handle direct linking to a specific recommendation
  useEffect(() => {
    if (router.query.recId) {
      const index = recommendations.findIndex(rec => rec.fileId === router.query.recId)
      if (index !== -1) {
        setCurrentIndex(index)
        trackUserInteraction("direct_link", `recommendation_${router.query.recId}`, "recommendation")
      }
    }
  }, [router.query.recId, recommendations])

  // Navigation functions
  const nextRecommendation = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % recommendations.length
      trackUserInteraction("next", `recommendation_${recommendations[newIndex].fileId}`, "recommendation")
      return newIndex
    })
    
    setTimeout(() => setIsAnimating(false), 600)
  }, [recommendations, isAnimating])

  const prevRecommendation = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    
    setCurrentIndex((prev) => {
      const newIndex = prev === 0 ? recommendations.length - 1 : prev - 1
      trackUserInteraction("previous", `recommendation_${recommendations[newIndex].fileId}`, "recommendation")
      return newIndex
    })
    
    setTimeout(() => setIsAnimating(false), 600)
  }, [recommendations, isAnimating])

  const goToRecommendation = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    
    setCurrentIndex(index)
    trackUserInteraction("jump_to", `recommendation_${recommendations[index].fileId}`, "recommendation")
    
    setTimeout(() => setIsAnimating(false), 600)
  }, [recommendations, isAnimating, currentIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextRecommendation()
      if (e.key === 'ArrowLeft') prevRecommendation()
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [nextRecommendation, prevRecommendation])

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isAnimating) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) nextRecommendation()
    if (isRightSwipe) prevRecommendation()
  }

  const copyRecommendationLink = (recId: string) => {
    const currentURL = window.location.origin + window.location.pathname
    const encodedRecId = encodeURIComponent(recId)
    const linkToCopy = `${currentURL}?recId=${encodedRecId}`

    navigator.clipboard.writeText(linkToCopy)
      .then(() => {
        setCopyMessage("Recommendation link copied to clipboard!")
        setCopySuccess(true)
        trackUserInteraction("share_link", `recommendation_${recId}`, "recommendation")
      })
      .catch((err) => {
        console.error("Failed to copy recommendation link: ", err)
        setCopyMessage("Failed to copy recommendation link.")
        setCopySuccess(true)
      })
  }

  const handleCloseSnackbar = () => {
    setCopySuccess(false)
  }

  if (!recommendations.length) return null

  return (
    <>
      <Box 
        sx={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          background: `linear-gradient(135deg, 
            ${theme.palette.primary.dark} 0%, 
            ${theme.palette.primary.main} 50%, 
            ${theme.palette.secondary.main} 100%)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header with navigation info */}
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h4" color="white" gutterBottom>
            Recommendations
          </Typography>
          <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
            {currentIndex + 1} of {recommendations.length} • Use ← → keys or swipe
          </Typography>
        </Box>

        {/* Main carousel container */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          px: 2
        }}>
          
          {/* Carousel track that slides */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              transition: 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
              transform: `translateX(${-currentIndex * (isMobile ? 340 : 500)}px)`,
              gap: isMobile ? '20px' : '40px',
            }}
          >
            {recommendations.map((rec, index) => {
              const offset = index - currentIndex;
              const isCenter = offset === 0;
              const isAdjacent = Math.abs(offset) === 1;
              const isVisible = Math.abs(offset) <= 2;
              
              if (!isVisible) return null;

              const scale = isCenter ? 1 : isAdjacent ? 0.8 : 0.6;
              const opacity = isCenter ? 1 : isAdjacent ? 0.7 : 0.4;
              const zIndex = isCenter ? 3 : isAdjacent ? 2 : 1;

              return (
                <Card 
                  key={rec.fileId}
                  onClick={() => !isCenter && goToRecommendation(index)}
                  sx={{ 
                    width: isMobile ? 320 : 480,
                    maxHeight: '80vh',
                    minWidth: isMobile ? 320 : 480,
                    borderRadius: 4,
                    cursor: isCenter ? 'default' : 'pointer',
                    transform: `scale(${scale}) translateY(${isCenter ? '-20px' : '10px'})`,
                    opacity,
                    zIndex,
                    boxShadow: isCenter 
                      ? '0 30px 60px rgba(0,0,0,0.4)' 
                      : '0 10px 30px rgba(0,0,0,0.2)',
                    background: theme.palette.background.paper,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    transformStyle: 'preserve-3d',
                    filter: isCenter ? 'brightness(1) saturate(1)' : 'brightness(0.8) saturate(0.7)',
                    '&:hover': {
                      transform: isCenter 
                        ? `scale(${scale}) translateY(-20px)` 
                        : `scale(${scale + 0.05}) translateY(5px)`,
                      opacity: isCenter ? 1 : Math.min(opacity + 0.2, 1),
                    }
                  }}
                >
                  {/* Character image section */}
                  <Box sx={{ 
                    textAlign: 'center', 
                    p: isCenter ? 3 : 2, 
                    background: `linear-gradient(to bottom, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                    color: 'white',
                  }}>
                    <Avatar
                      src={rec.metadataObject.profileImagePath}
                      alt={rec.metadataObject.name}
                      sx={{ 
                        width: isCenter ? (isMobile ? 120 : 160) : (isMobile ? 80 : 120), 
                        height: isCenter ? (isMobile ? 120 : 160) : (isMobile ? 80 : 120),
                        mx: 'auto',
                        mb: 2,
                        border: '4px solid white',
                        boxShadow: isCenter 
                          ? '0 12px 24px rgba(0,0,0,0.4)' 
                          : '0 6px 12px rgba(0,0,0,0.2)',
                        transition: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      }}
                    />
                    <Typography 
                      variant={isCenter ? "h5" : "h6"} 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'bold',
                        transition: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        fontSize: isCenter ? undefined : '1rem',
                      }}
                    >
                      {rec.metadataObject.name}
                    </Typography>
                    {isCenter && (
                      <>
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            opacity: 0.9,
                            transition: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
                          }}
                        >
                          {rec.metadataObject.headline}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            opacity: 0.8, 
                            mt: 1,
                            transition: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
                          }}
                        >
                          {rec.metadataObject.relationship}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            opacity: 0.7, 
                            mt: 1, 
                            display: 'block',
                            transition: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
                          }}
                        >
                          {new Date(rec.metadataObject.dateCreated).toLocaleDateString()}
                        </Typography>
                      </>
                    )}
                  </Box>

                  {/* Recommendation content - only show on center card */}
                  {isCenter && (
                    <>
                      <CardContent sx={{ 
                        flex: 1, 
                        overflow: 'auto',
                        p: 3,
                        transition: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        '&::-webkit-scrollbar': {
                          width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                          background: '#f1f1f1',
                          borderRadius: '3px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          background: theme.palette.primary.main,
                          borderRadius: '3px',
                        },
                      }}>
                        <div 
                          dangerouslySetInnerHTML={{ __html: rec.htmlBody }} 
                          style={{ 
                            lineHeight: 1.6,
                            fontSize: isMobile ? '0.9rem' : '1rem',
                          }}
                        />
                      </CardContent>

                      {/* Action buttons - only show on center card */}
                      <Box sx={{ p: 2, textAlign: 'center', borderTop: `1px solid ${theme.palette.divider}` }}>
                        <Stack direction="row" spacing={2} justifyContent="center">
                          <Tooltip title="Copy link to this recommendation">
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                copyRecommendationLink(rec.fileId);
                              }}
                              color="primary"
                            >
                              <LinkIcon />
                            </IconButton>
                          </Tooltip>
                          <Button
                            variant="contained"
                            component={MaterialLink}
                            to="https://www.linkedin.com/in/xaviercollantes/details/recommendations"
                            size="small"
                          >
                            LinkedIn
                          </Button>
                        </Stack>
                      </Box>
                    </>
                  )}
                </Card>
              );
            })}
          </Box>

          {/* Navigation arrows */}
          <IconButton
            onClick={prevRecommendation}
            sx={{
              position: 'absolute',
              left: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'white',
              zIndex: 10,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
              }
            }}
          >
            <ChevronLeftIcon fontSize="large" />
          </IconButton>

          <IconButton
            onClick={nextRecommendation}
            sx={{
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'white',
              zIndex: 10,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
              }
            }}
          >
            <ChevronRightIcon fontSize="large" />
          </IconButton>
        </Box>

        {/* Bottom indicator dots */}
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Stack direction="row" spacing={1} justifyContent="center">
            {recommendations.map((_, index) => (
              <Box
                key={index}
                onClick={() => goToRecommendation(index)}
                sx={{
                  width: index === currentIndex ? 12 : 8,
                  height: index === currentIndex ? 12 : 8,
                  borderRadius: '50%',
                  backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)',
                  boxShadow: index === currentIndex ? '0 0 8px rgba(255,255,255,0.6)' : 'none',
                  '&:hover': {
                    backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.7)',
                    transform: 'scale(1.3)',
                  }
                }}
              />
            ))}
          </Stack>
        </Box>

        <Snackbar
          open={copySuccess}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={copyMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Box>
    </>
  )
}
