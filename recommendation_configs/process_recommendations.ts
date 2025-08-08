/** Process recommendation entries from markdown files at build time. */

import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { remark } from "remark"
import html from "remark-html"
import { orderedIncludeRecommendationsConfig } from "./recommendation_order_config"

const recommendationsDirectory: string = path.join(process.cwd(), "recommendations_md")

/**
 * YAML metadata tags set in each Markdown recommendation file.
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

export interface RecommendationDataType {
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
}

/**
 * Read local files IDs from paths of the Markdown files.
 *
 * Include recommendation files which have been explicitly included.
 */
export function getRecommendationPaths(): (string | undefined)[] {
  const fileNames: string[] = fs.readdirSync(recommendationsDirectory)

  const showRecommendations: (string | undefined)[] = orderedIncludeRecommendationsConfig.map(
    (includedRecommendationFileName: string) => {
      if (fileNames.includes(includedRecommendationFileName)) {
        return includedRecommendationFileName
      }
    }
  )
  return showRecommendations
}

/**
 * Get recommendation paths as NextJS props.
 *
 * Remove the file extension and create object for getStaticPaths().
 */
export function getRecommendationPathsAsProps(): Array<{
  params: { recommendationId: string }
}> {
  const fileNames: (string | undefined)[] = getRecommendationPaths()
  return fileNames.map((fileName: string) => ({
    params: {
      recommendationId: `${fileName.replace(/\.md$/, "")}`,
    },
  }))
}

/**
 * Read local file for one Markdown recommendation.
 */
export async function getRecommendation(recommendationId: string): Promise<RecommendationDataType> {
  const fullFilePath: string = path.join(recommendationsDirectory, `${recommendationId}.md`)
  const fileContents: string = fs.readFileSync(fullFilePath, "utf8")

  const recommendationMetadata: matter.GrayMatterFile<string> = matter(fileContents)
  let htmlBody = await remark().use(html).process(recommendationMetadata.content)

  return {
    fileId: recommendationId,
    fullMarkdown: fileContents,
    markdownBody: recommendationMetadata.content,
    htmlBody: htmlBody.value.toString(),
    metadata: JSON.stringify(recommendationMetadata.data as RecommendationMetadataType),
  }
}

/**
 * Get the YAML header with metadata for each recommendation.
 *
 * Deserialized metadata which is string then must be converted to object before use.
 */
export async function getHeaderMetadata(): Promise<string[]> {
  const recommendationPaths: (string | undefined)[] = getRecommendationPaths()

  const recommendations: string[] = await Promise.all(
    recommendationPaths.map(async (recommendationPath: string) => {
      const recommendation: RecommendationDataType = await getRecommendation(
        `${recommendationPath.replace(/\.md$/, "")}`
      )
      return recommendation.metadata
    })
  )

  return recommendations
}

/**
 * Get all recommendation data formatted as the original RecommendationType.
 *
 * This provides backward compatibility with the existing recommendations page.
 */
export async function getRecommendationData(): Promise<any[]> {
  const recommendationPaths: (string | undefined)[] = getRecommendationPaths()

  const recommendations = await Promise.all(
    recommendationPaths.map(async (recommendationPath: string) => {
      const recommendation: RecommendationDataType = await getRecommendation(
        `${recommendationPath.replace(/\.md$/, "")}`
      )
      const metadata = JSON.parse(recommendation.metadata) as RecommendationMetadataType

      return {
        name: metadata.name,
        headline: metadata.headline,
        relationship: metadata.relationship,
        dateCreated: metadata.dateCreated, // Keep as string, let the frontend handle date conversion
        profileImagePath: metadata.profileImagePath,
        linkedInLink: metadata.linkedInLink,
        previewText: metadata.previewText,
        fullRec: recommendation.markdownBody, // Use the markdown body as fullRec
        showInSlides: metadata.showInSlides !== false,
      }
    })
  )

  return recommendations
}