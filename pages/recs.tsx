/** Page for all recommendations listed. */

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Stack,
  Theme,
  Typography,
  useTheme,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { GetStaticPropsResult } from "next"
import { RecommendationType } from "../recommendations/RecommendationType"
import { getRecommendationData } from "../recommendations/process_recommendations"
import { MaterialLink } from "../components/MaterialLink"
import DarkModeSwitch from "../components/DarkMode"
import { useEffect, useState } from "react"
import Drawer from "../components/Drawer"
import { NextRouter, useRouter } from "next/router"

/**
 * Runs at build time to statically generate preview cards.
 */
export async function getStaticProps(): Promise<
  GetStaticPropsResult<{
    recommendationsProp: RecommendationType[]
  }>
> {
  // Recommendations data.
  const recommendationData: RecommendationType[] = await getRecommendationData()

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

  /**
   * Creates the initial expansion state for all recommendation accordions.
   *
   * - Each recommendation gets an entry in the dictionary with its ID and expansion state.
   * - If a 'recId' is provided in the URL query parameters, the matching recommendation
   *   will be expanded by default, while others remain collapsed.
   * - The 'recId' parameter allows direct linking to a specific expanded recommendation.
   *
   * @returns An array of objects tracking the expansion state of each recommendation.
   */
  const initialExpandDictWithSelected = () => {
    // Create initial dictionary with all recommendations collapsed
    const initialExpandDict = recommendations.map(
      (recommendation: RecommendationType) => ({
        recId: recommendation.name,
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
    for (let setting of expandDictionary) {
      if (setting.recId == id) {
        newDictionary.push({ recId: setting.recId, expand: !setting.expand })
      } else {
        newDictionary.push(setting)
      }
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

    setExpandDictionary(newDictionary)
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          [theme.breakpoints.down("sm")]: {
            justifyContent: "flex-end",
          },
        }}
      >
        <Drawer />
      </Box>
      <Box>
        <Stack direction={"row"} spacing={2} sx={{ my: 3 }}>
          <DarkModeSwitch />

          <Button variant="contained" onClick={() => handleExpandAll()}>
            Expand all
          </Button>
          <Button variant="contained" onClick={() => handleCollapseAll()}>
            Collapse all
          </Button>
        </Stack>
        {props.recommendationsProp.map((recommendation: RecommendationType) => (
          <Accordion
            // The expanded prop controls whether this accordion is open or closed
            // It finds the matching recId in the expandDictionary and checks its 'expand' value
            expanded={
              expandDictionary.find(
                (setting) => setting.recId === recommendation.name
              )?.expand
            }
            // When clicked, toggle this specific recommendation's expansion state
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
                  {recommendation.dateCreated.toLocaleString()}
                </Typography>
                <Typography variant="body1" fontStyle={"italic"}>
                  {recommendation.fullRec}
                </Typography>
              </Stack>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
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
      </Box>
    </>
  )
}
