/** Cards found with short descriptions. The order is respected. */

import { LongCardType } from "../components/LongCard"

export interface CardContentType extends LongCardType {
  // Must match with filterData.ts list.
  tagIds: string[]
}

export const experienceCardsData: CardContentType[] = [
  {
    title: "Ransomware project",
    description:
      "They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.",
    imagePath: "",
    tagIds: ["python", "database"],
  },
  {
    title: "Computer security",
    description:
      "They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.",
    imagePath: "",
    tagIds: ["security", "database"],
  },
  {
    title: "Raspberry Pi camera",
    description:
      "They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.",
    imagePath: "",
    tagIds: ["interests", "iot", "python"],
  },
  {
    title: "Python script",
    description:
      "They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.",
    imagePath: "",
    tagIds: ["interests", "iot", "python"],
  },
  {
    title: "Ham radio",
    description:
      "They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.",
    imagePath: "",
    tagIds: ["interests", "radio"],
  },
  {
    title: "Radio repeater",
    description:
      "They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.",
    imagePath: "",
    tagIds: ["radio"],
  },
]
