/** Card for recommendations. */

import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  Stack,
} from "@mui/material"
import { MaterialLink } from "./MaterialLink"
import { RecommendationType } from "../recommendations/RecommendationType"
import Link from "next/link"

export interface RecommendationCardType extends RecommendationType {}

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
              variant="outlined"
              component={MaterialLink}
              to={`/recs?recId={sio}`}
            >
              See full
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
