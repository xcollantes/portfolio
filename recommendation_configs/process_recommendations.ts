/** Process recommendation entries from markdown files at build time. */

import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { remark } from "remark"
import html from "remark-html"
import { orderedIncludeRecommendationsConfig } from "./recommendation_order_config"
import { RecommendationMetadataType, RecommendationRawDataType, RecommendationExtractedDataType } from "./RecommendationTypes"

const recommendationsDirectory: string = path.join(process.cwd(), "recommendations_md")


/**
 * Read local files IDs from paths of the Markdown files.
 *
 * Include recommendation files which have been explicitly included.
 */
function getRecommendationPaths(): (string | undefined)[] {
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
function getRecommendationPathsAsProps(): Array<{
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
async function getRecommendationFile(recommendationId: string): Promise<RecommendationRawDataType> {
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
async function getHeaderMetadata(): Promise<string[]> {
  const recommendationPaths: (string | undefined)[] = getRecommendationPaths()

  const recommendations: string[] = await Promise.all(

    recommendationPaths.map(async (recommendationPath: string) => {

      const recommendation: RecommendationRawDataType = await getRecommendation(
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
export async function getRecommendationData(): Promise<RecommendationExtractedDataType[]> {
  const recommendationPaths: (string | undefined)[] = getRecommendationPaths()

  const recommendations = await Promise.all(

    recommendationPaths.map(async (recommendationPath: string) => {

      const recommendation: RecommendationRawDataType = await getRecommendationFile(
        `${recommendationPath.replace(/\.md$/, "")}`
      )

      const metadata = JSON.parse(recommendation.metadata) as RecommendationMetadataType

      return {
        fileId: recommendation.fileId,
        fullMarkdown: recommendation.fullMarkdown,
        markdownBody: recommendation.markdownBody,
        htmlBody: recommendation.htmlBody,
        metadata: recommendation.metadata, // Keep the original stringified metadata
        name: metadata.name,
        headline: metadata.headline,
        relationship: metadata.relationship,
        dateCreated: metadata.dateCreated, // Keep as string, let the frontend handle date conversion
        profileImagePath: metadata.profileImagePath,
        linkedInLink: metadata.linkedInLink,
        previewText: metadata.previewText,
        fullRec: recommendation.markdownBody.replace(/\n/g, ' '), // Use the markdown body as fullRec, remove line breaks
        showInSlides: metadata.showInSlides !== false,
      }

    })

  )

  return recommendations
}