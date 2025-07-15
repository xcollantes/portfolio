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
import { RecommendationType } from "../recommendations/RecommendationType"
import { MaterialLink } from "./MaterialLink"

export interface RecommendationCardType extends RecommendationType { }

export default function RecommendationCard(props: RecommendationCardType) {
  const {
    name,
    headline,
    relationship,
    dateCreated,
    profileImagePath,
    linkedInLink,
    previewText,
    fullRec,
  } = props

  return (
    <Card raised sx={{ px: 0.5 }}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction={"row"} alignItems={"center"} spacing={2.5}>
            <Link href={linkedInLink}>
              <Avatar
                alt="LinkedIn image"
                sx={{ width: 50, height: 50 }}
                src={profileImagePath}
              />
            </Link>
            <Typography variant="body2">{name}</Typography>
          </Stack>

          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {headline}
          </Typography>

          <Typography variant="body1" fontStyle={"italic"}>
            {previewText}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              component={MaterialLink}
              to={`/recs?recId=${name}`}
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
