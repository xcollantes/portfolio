import { Button, Card, CardContent, Typography } from "@mui/material"

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
          <Typography variant="body1" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }}>
            See more
          </Button>
        </CardContent>
      </Card>
    </>
  )
}
