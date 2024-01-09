/** Set article order on front page. */

export interface OrderedIncludeArticlesType {
  // Name of the file without the file type.
  articleFileName: string
}

/**
 * Article order to display.
 *
 * IMPORTANT: If not listed, will not show up on web app.
 * MUST EXACT MATCH CASE TO INCLUDE ARTICLE.
 */
export const orderedIncludeArticles: OrderedIncludeArticlesType[] = [
  // Work experiences
  "google",
  "cloud",
  "anderson-podcast",
  "portfolio",
  "itron",
  //  "amazon-price",
  "rpi-camera",
  "rx-blockchain",
  "bulldog-band",
  //  "google-home",

  // Blogs
  // "radio",
]
