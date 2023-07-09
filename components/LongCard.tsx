/** Card with project summary. */

import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { MaterialLink } from "./MaterialLink"

export interface LongCardType {
  title: string
  description: string
  pageLink: string
  imagePath: string
}

export default function LongCard({
  title,
  description,
  pageLink,
  imagePath,
}: LongCardType) {
  return (
    <Card raised sx={{ px: 0.5 }}>
      <CardContent>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            component={MaterialLink}
            to={pageLink}
          >
            See more
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
