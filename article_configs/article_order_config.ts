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
  "faxion-ai.md",
  "google.md",
  "belva-ai.md",
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
  "gist-example.md",
  "web-opt.md",
  "pandas-styling-cheatsheet.md",
  "streamlit-cheatsheet.md",
  "json-python.md",
  "sql-cheatsheet.md",
  "radio.md",
  "easter-eggs.md",
]

export const orderedIncludeArticlesConfig = [
  ...orderedIncludeWorkExp,
  ...orderedIncludeBlogs,
]
