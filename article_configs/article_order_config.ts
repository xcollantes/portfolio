/** Set article order and set articles accessible. */

/**
 * Article order to display.
 *
 * IMPORTANT: If not listed, will not show up on web app and articles will not
 * be accessible when reaching URL.
 * MUST EXACT MATCH CASE TO INCLUDE ARTICLE.
 */

// WORK EXPERIENCES
export const orderedIncludeWorkExp: string[] = [
  "google.md",
  // "cloud.md",
  "portfolio.md",
  "rx-blockchain.md",

  "itron.md",
  "housing.md",
  "rpi-camera.md",
  //  "amazon-price.md",
  //  "google-home.md",
]

// BLOGS
export const orderedIncludeBlogs: string[] = [
  "bulldog-band.md",
  "anderson-podcast.md",
  "web-opt.md",
  "radio.md",
]

export const orderedIncludeArticlesConfig = [
  ...orderedIncludeWorkExp,
  ...orderedIncludeBlogs,
]
