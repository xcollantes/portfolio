/** Placeholder for when unauthenticated. */

import { Stack } from "@mui/material"
import { MetadataType } from "../article_configs/process_blogs"
import FadeCustom from "./Fade"
import LongCard from "./LongCard"

export default function ExperienceCardsPlaceholder() {
  const dummyData = {
    title: "Please SignIn Verify",
    cardDescription: "Nice try. Using DevTools won't work here",
    cardPageLink: "",
    imagePath: "",
    tagIds: ["interests", "radio"],
  }

  const dummyList: Array<any> = Array(10).fill(dummyData)

  let key: number = 0
  return (
    <Stack direction="column" spacing={2} alignItems="stretch">
      {dummyList.map((card: MetadataType) => (
        <FadeCustom key={key}>
          <div>
            <LongCard
              title={card.title}
              cardDescription={card.cardDescription}
              cardPageLink={""}
              cardButtonText={card.cardButtonText}
              imagePath={card.imagePath}
              key={key++}
              disabled={true}
            />
          </div>
        </FadeCustom>
      ))}
    </Stack>
  )
}
