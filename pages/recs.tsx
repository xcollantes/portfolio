/** Page for all recommendations listed. */

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import LinkIcon from "@mui/icons-material/Link"
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess"
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material"
import { sendGAEvent } from "@next/third-parties/google"
import { GetStaticPropsResult } from "next"
import { NextRouter, useRouter } from "next/router"
import { useEffect, useState } from "react"
import { trackUserInteraction } from "../components/AnalyticsUtils"
import GenericFilterBar from "../components/GenericFilterBar"
import { MaterialLink } from "../components/MaterialLink"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"
import { RecommendationRawType } from "../recommendation_configs/RecommendationTypes"
import { getRecommendationData } from "../recommendation_configs/process_recommendations"
import {
  getMatchingRelationshipFilters,
  relationshipFilterConfig,
} from "../recommendation_configs/relationship_filters_config"

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
  // Access the router to get URL query parameters, specifically 'recId'.
  // This allows direct linking to a specific recommendation.
  const router: NextRouter = useRouter()

  const recommendations = props.recommendationsProp

  // State for showing the copy success message
  const [copySuccess, setCopySuccess] = useState<boolean>(false)
  const [copyMessage, setCopyMessage] = useState<string>("")

  // Use filter context for relationship filtering
  const { selectedTags, setSelectedTags }: SelectFilterTagContextType =
    useSelectedFilterTagContext()

  // Filter recommendations based on selected relationship filters
  const filteredRecommendations = selectedTags.length > 0
    ? recommendations.filter((rec: RecommendationRawType) => {
      const matchingFilters = getMatchingRelationshipFilters(rec.metadataObject.relationship)
      return selectedTags.some(tag => matchingFilters.includes(tag))
    })
    : recommendations

  // Track page visit when the page loads
  useEffect(() => {
    // Track recommendations page view with count of recommendations
    sendGAEvent("recommendations_page_view", {
      recommendation_count: recommendations.length,
    })
  }, [])

  /**
   * Creates the initial expansion state for all recommendation accordions.
   *
   * - Each recommendation gets an entry in the dictionary with its ID and
   *   expansion state.
   * - If a 'recId' is provided in the URL query parameters, the matching
   *   recommendation will be expanded by default, while others remain
   *   collapsed.
   * - The 'recId' parameter allows direct linking to a specific expanded
   *   recommendation.
   *
   * @returns An array of objects tracking the expansion state of each
   *   recommendation.
   */
  const initialExpandDictWithSelected = () => {
    // Create initial dictionary with ALL recommendations collapsed (not filtered)
    const initialExpandDict = recommendations.map(
      (recommendation: RecommendationRawType) => ({
        recId: recommendation.fileId,
        expand: false,
      })
    )

    // If a specific recommendation ID is specified in the URL (?recId=someId)
    // set that specific recommendation's expand state to true
    if (router.query.recId) {
      const newDictionary: any = []
      for (let setting of initialExpandDict) {
        if (setting.recId == router.query.recId) {
          newDictionary.push({ recId: setting.recId, expand: true })
        } else {
          newDictionary.push(setting)
        }
      }

      // Track direct link to recommendation
      trackUserInteraction("direct_link", `recommendation_${router.query.recId}`, "recommendation")
      return newDictionary
    }

    return initialExpandDict
  }

  // State to track which recommendations are expanded/collapsed
  // Initially set based on the URL query parameter if present
  const [expandDictionary, setExpandDictionary] = useState<
    { recId: string; expand: boolean }[]
  >(initialExpandDictWithSelected())

  /**
   * Effect to handle URL changes with recId parameter.
   *
   * This ensures that when the URL changes with a new recId parameter,
   * or when navigating directly to a URL with a recId parameter,
   * the correct recommendation accordion will be expanded.
   *
   * The dependency array ensures this runs whenever the recId query parameter changes.
   */
  useEffect(() => {
    if (router.query.recId) {
      const newDictionary = expandDictionary.map(setting => {
        if (setting.recId == router.query.recId) {
          return { ...setting, expand: true };
        }
        return setting;
      });
      setExpandDictionary(newDictionary);
    }
  }, [router.query.recId]);

  // Update expand dictionary when filter changes
  useEffect(() => {
    const newExpandDict = recommendations.map(
      (recommendation: RecommendationRawType) => ({
        recId: recommendation.fileId,
        expand: router.query.recId === recommendation.fileId,
      })
    )
    setExpandDictionary(newExpandDict)
  }, [selectedTags.length, filteredRecommendations.length, router.query.recId])

  /**
   * Toggles the expansion state of a specific recommendation when clicked.
   *
   * @param id - The unique identifier (recId) of the recommendation to toggle.
   */
  const handleClick = (id: string) => {
    const newDictionary: any = []
    let isExpanding = false

    for (let setting of expandDictionary) {
      if (setting.recId == id) {
        isExpanding = !setting.expand
        newDictionary.push({ recId: setting.recId, expand: !setting.expand })
      } else {
        newDictionary.push(setting)
      }
    }

    // Track recommendation interaction
    if (isExpanding) {
      trackUserInteraction("expand", `recommendation_${id}`, "recommendation")
    } else {
      trackUserInteraction("collapse", `recommendation_${id}`, "recommendation")
    }

    setExpandDictionary(newDictionary)
  }

  /**
   * Collapses all recommendation accordions.
   * Sets all 'expand' values to false in the expansion dictionary.
   */
  const handleCollapseAll = () => {
    const initialExpandDict = filteredRecommendations.map(
      (recommendation: RecommendationRawType) => ({
        recId: recommendation.fileId,
        expand: false,
      })
    )

    // Track collapse all action
    trackUserInteraction("collapse_all", "recommendations", "recommendation")

    setExpandDictionary(initialExpandDict)
  }

  /**
   * Expands all recommendation accordions.
   * Sets all 'expand' values to true in the expansion dictionary.
   */
  const handleExpandAll = () => {
    const newDictionary: any = []
    for (let setting of expandDictionary) {
      newDictionary.push({ recId: setting.recId, expand: true })
    }

    // Track expand all action
    trackUserInteraction("expand_all", "recommendations", "recommendation")

    setExpandDictionary(newDictionary)
  }

  /**
   * Copies the current URL with a specific recommendation ID to the clipboard.
   *
   * @param recId - The ID of the recommendation to be shared.
   */
  const copyRecommendationLink = (recId: string) => {
    // Get the current URL
    const currentURL = window.location.origin + window.location.pathname;

    // Create a URL with the recId as a query parameter, ensuring it's properly encoded
    const encodedRecId = encodeURIComponent(recId);
    const linkToCopy = `${currentURL}?recId=${encodedRecId}`;

    // Copy the URL to clipboard
    navigator.clipboard.writeText(linkToCopy)
      .then(() => {
        setCopyMessage("Recommendation link copied to clipboard!");
        setCopySuccess(true);

        // Track link sharing
        trackUserInteraction("share_link", `recommendation_${recId}`, "recommendation")
      })
      .catch((err) => {
        console.error("Failed to copy recommendation link: ", err);
        setCopyMessage("Failed to copy recommendation link.");
        setCopySuccess(true);
      });
  };

  // Handle closing the copy success notification
  const handleCloseSnackbar = () => {
    setCopySuccess(false);
  };

  return (
    <>
      <Box sx={{ pb: 10 }}>
        {/* Relationship filter bar with expand/collapse controls */}
        <Box sx={{ my: 3 }}>
          <GenericFilterBar
            filterConfig={relationshipFilterConfig}
            iconTooltip="Filter by relationship type"
            rightContent={
              <>
                <Tooltip title="Expand all">
                  <IconButton onClick={() => handleExpandAll()}>
                    <UnfoldMoreIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Collapse all">
                  <IconButton onClick={() => handleCollapseAll()}>
                    <UnfoldLessIcon />
                  </IconButton>
                </Tooltip>
              </>
            }
          />
        </Box>

        {filteredRecommendations.map((recommendation: RecommendationRawType) => {
          const isExpanded = expandDictionary.find(
            (setting) => setting.recId === recommendation.fileId
          )?.expand

          return (
            <Accordion
              expanded={isExpanded}
              onChange={() => handleClick(recommendation.fileId)}
              key={recommendation.fileId}
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "12px !important",
                mb: 2,
                boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.08)",
                "&:hover": {
                  boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.12)",
                },
                "&:before": {
                  display: "none",
                },
                "& .MuiAccordionSummary-root": {
                  transition: "all 0.3s ease-in-out",
                  borderRadius: "12px 12px 0 0",
                },
                "& .MuiAccordionDetails-root": {
                  transition: "all 0.3s ease-in-out",
                  borderRadius: "0 0 12px 12px",
                },
                "&.Mui-expanded": {
                  "& .MuiAccordionSummary-root": {
                    borderRadius: "12px 12px 0 0",
                  },
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1"
                sx={{
                  "& .MuiAccordionSummary-content": {
                    alignItems: "center",
                  },
                }}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={2.5} sx={{ width: "100%" }}>
                  {/* Avatar visible when collapsed */}
                  <Avatar
                    alt="LinkedIn image"
                    sx={{
                      width: 50,
                      height: 50,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      opacity: isExpanded ? 0 : 1,
                      transform: isExpanded ? "scale(0) translateX(100px)" : "scale(1) translateX(0)",
                    }}
                    src={recommendation.metadataObject.profileImagePath}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        opacity: isExpanded ? 0 : 1,
                        transform: isExpanded ? "translateX(-50px)" : "translateX(0)",
                      }}
                    >
                      {recommendation.metadataObject.headline}
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          ml: 3,
                          fontWeight: "normal",
                          [theme.breakpoints.down("sm")]: {
                            display: "block",
                            ml: 0,
                            mt: 0.5,
                          },
                        }}
                      >
                        {recommendation.metadataObject.relationship}
                      </Typography>
                    </Typography>
                  </Box>
                </Stack>
              </AccordionSummary>

              <AccordionDetails sx={{ pt: 0 }}>
                {/* Header section with animated avatar when expanded */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 1,
                    opacity: isExpanded ? 1 : 0,
                    transform: isExpanded ? "translateY(0)" : "translateY(-20px)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
                  }}
                >
                  <Avatar
                    alt="LinkedIn image"
                    sx={{
                      width: isExpanded ? 80 : 50,
                      height: isExpanded ? 80 : 50,
                      mb: 2,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: isExpanded ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
                    }}
                    src={recommendation.metadataObject.profileImagePath}
                  />
                  <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center" }}>
                    {recommendation.metadataObject.headline}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}>
                    {recommendation.metadataObject.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                    {new Date(recommendation.metadataObject.dateCreated).toLocaleDateString()}
                  </Typography>
                </Box>

                {/* Content */}
                <Box
                  sx={{
                    opacity: isExpanded ? 1 : 0,
                    transform: isExpanded ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: recommendation.htmlBody }} />
                </Box>

                {/* Actions */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 3,
                    opacity: isExpanded ? 1 : 0,
                    transform: isExpanded ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
                  }}
                >
                  <Tooltip title="Copy link to this recommendation">
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        copyRecommendationLink(recommendation.fileId);
                      }}
                      sx={{ mr: 1 }}
                    >
                      <LinkIcon />
                    </IconButton>
                  </Tooltip>
                  <Button
                    variant="contained"
                    component={MaterialLink}
                    to={
                      "https://www.linkedin.com/in/xaviercollantes/details/recommendations"
                    }
                  >
                    See in LinkedIn
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          )
        })}
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
