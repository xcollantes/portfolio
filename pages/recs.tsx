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

  const recommendations = props.recommendationsProp
  const initialExpandDict = recommendations.map(
    (recommendation: RecommendationType) => ({
      recId: recommendation.name,
      expand: false,
    })
  )
  const [expandDictionary, setExpandDictionary] =
    useState<{ recId: string; expand: boolean }[]>(initialExpandDict)

  //   const [expandAll, setExpandAll] = useState(false)

  const handleClick = (id: string) => {
    setExpandDictionary([{ recId: id, expand: true }, ...expandDictionary])
  }

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

          <Button
            variant="contained"
            onClick={() => console.log(expandDictionary)}
          >
            TEST
          </Button>

          <Button variant="contained" onClick={() => handleExpandAll()}>
            Expand all
          </Button>
          <Button variant="contained" onClick={() => handleCollapseAll()}>
            Collapse all
          </Button>
        </Stack>
        {props.recommendationsProp.map((recommendation: RecommendationType) => (
          <Accordion
            expanded={
              expandDictionary.find(
                (setting) => setting.recId === recommendation.name
              )?.expand
            }
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
