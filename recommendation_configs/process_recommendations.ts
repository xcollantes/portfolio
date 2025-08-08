/** Process recommendation entries from markdown files at build time. */

import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { remark } from "remark"
import html from "remark-html"
import { orderedIncludeRecommendationsConfig } from "./recommendation_order_config"
import { RecommendationMetadataType, RecommendationDataType } from "./RecommendationTypes"

const recommendationsDirectory: string = path.join(process.cwd(), "recommendations_md")


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