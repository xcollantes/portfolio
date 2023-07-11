/** Cards found with short descriptions. The order is respected. */

export interface CardContentType {
  // Card header.
  title: string
  // Short description of project. Keep to about two sentences.
  description: string
  // NextJS Link page name with no extension in relation to `pages/`.
  // Example: pages/blogs/project.tsx => blogs/project
  pageLink: string
  // Card button text.
  seeMoreButtonText?: string
  // Location of image icon.
  imagePath: string
  // Must match with filterData.ts list.
  // Add as many tags since only tags specified in filterData.ts are filterable.
  tagIds: string[]
}

export const experienceCardsData: CardContentType[] = [
  {
    title: "Google Search",
    description:
      "Improving the internet's most well-known web application work for all locales.",
    pageLink: "blogs/google",
    imagePath: "",
    tagIds: ["python", "cloud", "google", "search"],
  },
  {
    title: "Google Associate Cloud Engineer",
    description: "",
    pageLink:
      "https://www.credential.net/80f4b296-3033-4ae3-a53b-469c28e1b901#gs.3f56w9",
    imagePath: "",
    tagIds: ["python", "google"],
  },
  {
    title: "Raspberry Pi camera",
    description:
      "Homemade internet-of-things private cloud connected motion-detecting camera.",
    pageLink: "",
    imagePath: "",
    tagIds: ["electronics", "iot", "python"],
  },
  {
    title: "Portfolio website",
    description: "Design, plan, code, and test the website you're looking at.",
    pageLink: "/",
    imagePath: "",
    tagIds: ["typescript", "frontend", "webdev", "design"],
  },
  {
    title: "Homemade Google Home",
    description: "",
    pageLink: "",
    imagePath: "",
    tagIds: ["iot", "python"],
  },

  {
    title: "Prescription Blockchain",
    description: "",
    pageLink: "",
    imagePath: "",
    tagIds: ["leadership", "volunteering", "gonzaga"],
  },
  {
    title: "Amazon Camel",
    description:
      "Built browser extension showing inline graphs price trends on Amazon products.",
    pageLink: "https://github.com/xcollantes/amazon_camel",
    imagePath: "",
    tagIds: ["electronics", "iot", "python"],
  },
  {
    title: "Bulldog Band",
    description:
      'As the "Fungineer" of the Gonzaga University Bulldog Band, responsibilities include keeping morale up for the 80+ members on weekly trips accross the United States for March Madness.',
    pageLink:
      "https://www.king5.com/article/sports/gonzaga-bulldogs/bulldog-band-brings-energy-to-gonzaga-games/293-426827234",
    imagePath: "",
    tagIds: ["interests", "gonzaga", "music"],
  },
  {
    title: "Interviewed by the Dean of the Gonzaga School of Business",
    description:
      "Weekly podcast hosted by Dean Anderson with guest Xavier Collantes.",
    pageLink: "https://www.youtube.com/watch?v=27kAuEFGduI",
    imagePath: "",
    tagIds: ["interests", "gonzaga"],
  },
  {
    title: "Ham radio",
    description: "",
    pageLink: "",
    imagePath: "",
    tagIds: ["interests", "radio"],
  },
]
