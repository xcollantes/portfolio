/** Process recommendation entries from markdown files at build time. */

import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { remark } from "remark"
import html from "remark-html"
import { orderedIncludeRecommendationsConfig } from "./recommendation_order_config"
import { RecommendationMetadataType, RecommendationRawType } from "./RecommendationTypes"

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
 * Read local file for one Markdown recommendation.
 */
async function getRecommendationFile(recommendationId: string): Promise<RecommendationRawType> {
  const fullFilePath: string = path.join(recommendationsDirectory, `${recommendationId}.md`)
  const fileContents: string = fs.readFileSync(fullFilePath, "utf8")

  const recommendationMetadata: matter.GrayMatterFile<string> = matter(fileContents)
  let htmlBody = await remark().use(html).process(recommendationMetadata.content)

  // Ensure dateCreated is converted to string to avoid NextJS static props type errors.
  const metadata = recommendationMetadata.data as any
  if (metadata.dateCreated) {
    metadata.dateCreated = metadata.dateCreated.toString()
  }

  return {
    fileId: recommendationId,
    fullMarkdown: fileContents,
    markdownBody: recommendationMetadata.content,
    htmlBody: htmlBody.value.toString(),
    metadataObject: metadata as RecommendationMetadataType,
  }
}

/**
 * Get all recommendation data.
 */
export async function getRecommendationData(): Promise<RecommendationRawType[]> {
  const recommendationPaths: (string | undefined)[] = getRecommendationPaths()

  const recommendations = await Promise.all(

    recommendationPaths.map(async (recommendationPath: string) => {


      /**
       * Get the recommendation files asynchronously.
       * The name of the Markdown file is the fileId.
       *
       * This includes the metadata and the markdown body.
       */
      const recommendation: RecommendationRawType = await getRecommendationFile(
        `${recommendationPath.replace(/\.md$/, "")}`
      )

      return recommendation

    })

  )

  return recommendations
}