/** Page for all recommendations listed. */

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import LinkIcon from "@mui/icons-material/Link"
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
import { GetStaticPropsResult } from "next"
import { NextRouter, useRouter } from "next/router"
import { useEffect, useState } from "react"
import { MaterialLink } from "../components/MaterialLink"
import { RecommendationExtractedDataType } from "../recommendation_configs/RecommendationTypes"
import { getRecommendationData } from "../recommendation_configs/process_recommendations"
import { sendGAEvent } from "@next/third-parties/google"
import { trackUserInteraction } from "../components/AnalyticsUtils"

/**
 * Runs at build time to statically generate preview cards.
 */
export async function getStaticProps(): Promise<
  GetStaticPropsResult<{
    recommendationsProp: RecommendationExtractedDataType[]
  }>
> {
  // Recommendations data.
  const recommendationData: RecommendationExtractedDataType[] = await getRecommendationData()

  return {
    props: { recommendationsProp: recommendationData },
  }
}

export default function Recs(props) {
  const theme: Theme = useTheme()
  // Access the router to get URL query parameters, specifically 'recId'.
  // This allows direct linking to a specific recommendation.
  const router: NextRouter = useRouter()

  const recommendations = props.recommendationsProp

  // State for showing the copy success message
  const [copySuccess, setCopySuccess] = useState<boolean>(false)
  const [copyMessage, setCopyMessage] = useState<string>("")

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
    // Create initial dictionary with all recommendations collapsed
    const initialExpandDict = recommendations.map(
      (recommendation: RecommendationExtractedDataType) => ({
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
    const recommendations = props.recommendationsProp
    const initialExpandDict = recommendations.map(
      (recommendation: RecommendationType) => ({
        recId: recommendation.name,
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
      <Box>
        <Stack direction={"row"} spacing={2} sx={{ my: 3 }}>
          <Button variant="contained" onClick={() => handleExpandAll()}>
            Expand all
          </Button>
          <Button variant="contained" onClick={() => handleCollapseAll()}>
            Collapse all
          </Button>
        </Stack>

        {props.recommendationsProp.map((recommendation: RecommendationType) => (
          <Accordion
            // The expanded prop controls whether this accordion is open or
            // closed
            // It finds the matching recId in the expandDictionary and checks
            // its 'expand' value
            expanded={
              expandDictionary.find(
                (setting) => setting.recId === recommendation.name
              )?.expand
            }

            // When clicked, toggle this specific recommendation's expansion
            // state
            onChange={() => handleClick(recommendation.name)}
            key={recommendation.name}

          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1"
            >
              <Stack direction={"row"} alignItems={"center"} spacing={2.5}>
                <Avatar
                  alt="LinkedIn image"
                  sx={{ width: 50, height: 50 }}
                  src={recommendation.profileImagePath}
                />

                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {recommendation.headline}
                </Typography>

                <Typography variant="body1">
                  {recommendation.relationship}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={3}>
                <Typography variant="body1">{recommendation.name}</Typography>
                <Typography variant="body1">
                  {new Date(recommendation.dateCreated).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" fontStyle={"italic"} sx={{ whiteSpace: 'pre-line' }}>
                  {recommendation.fullRec}
                </Typography>
              </Stack>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Tooltip title="Copy link to this recommendation">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent accordion from toggling
                      copyRecommendationLink(recommendation.name);
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
        ))}
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
