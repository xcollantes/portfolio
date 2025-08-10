/** Card for recommendations. */

import { Visibility } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material"
import Link from "next/link"
import { RecommendationRawType } from "../recommendation_configs/RecommendationTypes"
import { MaterialLink } from "./MaterialLink"
import { DarkModeClassNames } from "../hooks/useDarkMode"

export interface RecommendationCardType extends RecommendationRawType { }

export default function RecommendationCard(props: RecommendationCardType) {
  const {
    name,
    headline,
    relationship,
    dateCreated,
    profileImagePath,
    linkedInLink,
    previewText,
    showInSlides,
  } = props.metadataObject

  return (
    <Card raised className={DarkModeClassNames.card} sx={{ px: 0.5 }}>
      <CardContent>
        <Stack spacing={3} alignItems="center">

          {/* Centered prominent avatar */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

            <Link href={linkedInLink}>
              <Avatar
                alt="LinkedIn image"
                sx={{
                  width: 96,
                  height: 96,
                  mb: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  }
                }}
                src={profileImagePath}
              />
            </Link>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

              <Typography variant="h6" className={DarkModeClassNames.textPrimary} sx={{ fontWeight: "bold", textAlign: "center" }}>
                {headline}
              </Typography>
              <Typography variant="body1" className={DarkModeClassNames.textPrimary} sx={{ fontWeight: "bold", textAlign: "center" }}>
                {name}
              </Typography>
            </Box>

          </Box>

          <Typography variant="body1" className={DarkModeClassNames.textSecondary} fontStyle={"italic"} sx={{ textAlign: "center" }}>
            {previewText}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Button
              variant="contained"
              component={MaterialLink}
              to={`/recs?recId=${props.fileId}`}
              startIcon={<Visibility />}
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                color: "white",
                fontWeight: "bold",
                transition: "all 0.3s ease-in-out",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  background: "linear-gradient(45deg, #1976D2 30%, #0288D1 90%)",
                  boxShadow: "0 6px 10px 4px rgba(33, 203, 243, .4)",
                  transform: "translateY(-2px)",
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  transition: "left 0.5s",
                  animation: "autoShine 2.5s ease-in-out infinite",
                },
                "&:hover:before": {
                  left: "100%",
                },
                animation: "pulse 0.5s ease-in-out infinite alternate",
                "@keyframes pulse": {
                  "0%": {
                    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                  },
                  "100%": {
                    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .6)",
                  },
                },
                "@keyframes autoShine": {
                  "0%": {
                    left: "-100%",
                  },
                  "20%": {
                    left: "100%",
                  },
                  "100%": {
                    left: "100%",
                  },
                },
              }}
            >
              See full
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
