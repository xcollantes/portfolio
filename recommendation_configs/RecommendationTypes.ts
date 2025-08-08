/** Type definitions for recommendation processing. */

/**
 * YAML metadata tags set in each Markdown recommendation file.
 *
 * This is the deserialized metadata from the YAML header of each
 * recommendation.
 *
 * Example at the top of every recommendation Markdown file:
 * ```
 * ---
 * name: Siobhan Williams, Ph.D.
 * headline: Software Engineer at Google
 * relationship: Siobhan worked with Xavier but on different teams
 * dateCreated: 2024-01-18
 * profileImagePath: "/recommendations/profile_pics/siobhan.jpeg".
 * linkedInLink: https://www.linkedin.com/in/sio-williams
 * previewText: >
 *   Here's an example of Xavier's excellence...
 * showInSlides: true
 * ---
 * ```
 */
export interface RecommendationMetadataType {
  // Recommendation giver; full name.
  name: string
  // LinkedIn headline of recommendation giver, usually job title.
  headline: string
  // Recommendation giver relationship to me; "Worked directly with", "Mentored".
  relationship: string
  // Date the recommendation was given on LinkedIn.
  dateCreated: Date | string
  // Path to profile image saved locally.
  //
  // Must be relative to the repository.
  // Example: recommendations/profile_pics/siobhan.jpeg
  profileImagePath: string
  // Full URL to LinkedIn profile.
  //
  // Example: `https://www.linkedin.com/in/jaypinnamaneni`
  linkedInLink: string
  // Preview text of full recommendation used on cards.
  //
  // Include highlights or a short blurb quoting full text.
  // Keep at about 250 characters.
  previewText: string
  // Set to true if show recommendation on slideshow in preview.
  // By default is true.
  showInSlides?: boolean
}

/**
 * Raw data from the recommendation file.
 *
 * This is the data that is read from the recommendation file.
 */
export interface RecommendationRawDataType {
  // Filename of the recommendation entry without any extension.
  fileId: string
  // Raw text to be placed in the body.
  // Contains headers.
  // WARNING: The body will be directly rendered on user page.
  fullMarkdown: string
  // Markdown content without headers.
  markdownBody: string
  // Text converted from Markdown to HTML.
  // Does not have headers.
  htmlBody: any
  // YAML metadata at head of Markdown file.
  // Must stringify to serialize first then deserialize when used because NextJS
  // static props cannot handle objects.
  metadata: string
}

export interface RecommendationExtractedDataType {
  // Filename of the recommendation entry without any extension.
  fileId: string
  // Raw text to be placed in the body.
  // Contains headers.
  // WARNING: The body will be directly rendered on user page.
  fullMarkdown: string
  // Markdown content without headers.
  markdownBody: string
  // Text converted from Markdown to HTML.
  // Does not have headers.
  htmlBody: any
  // YAML metadata at head of Markdown file.
  // Must stringify to serialize first then deserialize when used.
  metadata: string
  // Recommendation giver; full name.
  name: string
  // LinkedIn headline of recommendation giver, usually job title.
  headline: string
  // Recommendation giver relationship to me; "Worked directly with", "Mentored".
  relationship: string
  // Date the recommendation was given on LinkedIn.
  dateCreated: Date | string
  // Path to profile image saved locally.
  //
  // Must be relative to the repository.
  // Example: recommendations/profile_pics/siobhan.jpeg
  profileImagePath: string
  // Full URL to LinkedIn profile.
  //
  // Example: `https://www.linkedin.com/in/jaypinnamaneni`
  linkedInLink: string
  // Preview text of full recommendation used on cards.
  //
  // Include highlights or a short blurb quoting full text.
  // Keep at about 250 characters.
  previewText: string
  // The full recommendation text (now comes from markdown body).
  fullRec: string
  // Set to true if show recommendation on slideshow in preview.
  // By default is true.
  showInSlides?: boolean
}
