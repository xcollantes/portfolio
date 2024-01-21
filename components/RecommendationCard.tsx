/** Card for recommendations. */

import { Card, CardContent, Typography, Box, Button } from "@mui/material"
import { MaterialLink } from "./MaterialLink"

export interface RecommendationCardType {
  name: string
  title: string
  imagePath: string
  previewText: string
  link: string
}

export default function RecommendationCard(props: RecommendationCardType) {
  const { name, title, previewText, imagePath, link } = props

  return (
    <Card raised sx={{ px: 0.5 }}>
      <CardContent>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1">{previewText}</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            component={MaterialLink}
            to={link}
          >
            See full
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
