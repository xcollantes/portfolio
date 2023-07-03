import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material"

export interface LongCardType {
  title: string
  description: string
  imagePath: string
}

export default function LongCard({
  title,
  description,
  imagePath,
}: LongCardType) {
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="body1">{description}</Typography>
          <Button variant="contained">See more</Button>
        </CardContent>
      </Card>
    </>
  )
}
