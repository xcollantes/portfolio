/** Card with project summary. */

import { Button, Card, CardContent, Typography } from "@mui/material"
import { CardContentType } from "../experience_cards_data/cardData"
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
    <>
      <Card>
        <CardContent>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            component={MaterialLink}
            to={pageLink}
          >
            See more
          </Button>
        </CardContent>
      </Card>
    </>
  )
}
