/** Cards found with short descriptions. The order is respected. */

export interface CardContentType {
  // Card header.
  title: string
  // Short description of project. Keep to about two sentences.
  description: string
  // NextJS Link page name with no extension in relation to `pages/`.
  // Example: pages/blogs/project.tsx => blogs/project
  pageLink: string
  // Location of image icon.
  imagePath: string
  // Must match with filterData.ts list.
  tagIds: string[]
}

export const experienceCardsData: CardContentType[] = [
  {
    title: "Ransomware project",
    description:
      "They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.",
    pageLink: "blogs/google",
    imagePath: "",
    tagIds: ["python", "database"],
  },
  {
    title: "Computer security",
    description:
      "They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.",
    pageLink: "https://google.com",
    imagePath: "",
    tagIds: ["security", "database"],
  },
  {
    title: "Raspberry Pi camera",
    description:
      "They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.",
    pageLink: "",
    imagePath: "",
    tagIds: ["interests", "iot", "python"],
  },
  {
    title: "Python script",
    description:
      "They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.",
    pageLink: "",
    imagePath: "",
    tagIds: ["interests", "iot", "python"],
  },
  {
    title: "Ham radio",
    description:
      "They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.",
    pageLink: "",
    imagePath: "",
    tagIds: ["interests", "radio"],
  },
  {
    title: "Radio repeater",
    description:
      "They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.",
    pageLink: "",
    imagePath: "",
    tagIds: ["radio"],
  },
]
