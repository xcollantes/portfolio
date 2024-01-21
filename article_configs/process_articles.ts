/** Process content entries for articles and portfolio at build time. */

import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import { orderedIncludeArticlesConfig } from "./article_order_config"

const articlesDirectory: string = path.join(process.cwd(), "articles")

/**
 * YAML metadata tags set in each Markdown article file.
 *
 * Example at the top of every article Markdown file:
 * ```
 * ---
 * title: Technical Solutions in Google Search
 * cardDescription: What I did on the team and how I did it.
 * imagePath: /myarticle/image.png
 * cardPageLink: /myarticlepage-no-extension
 * cardButtonText: See more
 * author: Xavier Collantes
 * dateWritten: 2023-07-01
 * dateLastUpdated: 2023-07-01
 * tagIds:
 *   - python
 *   - cloud
 *   - consulting
 *   - search
 * ---
 * ```
 */
export interface MetadataType {
  // Article type.
  // Either BLOG or WORKEXP.
  articleType: "BLOG" | "WORKEXP"
  // Shown as title on article page and preview card header. Human readable.
  // Case-sensitive.
  title: string
  // Description used on preview card. One or two sentences.
  cardDescription: string
  // Usually the page where the article is located but the link can be an
  // external page and skip the article altogether.
  //
  // NextJS Link page name with no extension in relation to `pages/`.
  // Example: If file path is `pages/articles/project.tsx` => field would be
  // `articles/project`.
  cardPageLink: string
  // Preview card button text. Default is "See more".
  imagePath: string
  // Must match with filterDataConfig.ts list.
  // Add as many tags since only tags specified in filterDataConfig.ts are filterable.
  // Order not considered.
  tagIds: string[]
  // Shown as text under title on article page. Human readable. Case-sensitive.
  subTitle?: string
  // Shown as author on article page. Human readable. Case-sensitive.
  author?: string
  // Location of image icon relative to the `public/` directory.
  cardButtonText?: string
  // Timestamp of creation of article.
  dateWritten?: Date
  // Timestamp of last major update.
  dateLastUpdated?: Date
}

export interface ArticleDataType {
  // Filename of the article entry without any extension.
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
 * Include article files which have been explicitly included.
 */
export function getArticlePaths(): (string | undefined)[] {
  const fileNames: string[] = fs.readdirSync(articlesDirectory)

  const showArticles: (string | undefined)[] = orderedIncludeArticlesConfig.map(
    (includedArticleFileName: string) => {
      if (fileNames.includes(includedArticleFileName)) {
        return includedArticleFileName
      }
    }
  )
  return showArticles
}

/**
 * Get article paths as NextJS props.
 *
 * Remove the file extension and create object for getStaticPaths().
 */
export function getArticlePathsAsProps(): Array<{
  params: { articleId: string }
}> {
  const fileNames: (string | undefined)[] = getArticlePaths()
  console.log("FILEPATHS: ", fileNames)
  return fileNames.map((fileName: string) => ({
    params: {
      articleId: `${fileName.replace(/\.md$/, "")}`,
    },
  }))
}

/**
 * Read local file for one Markdown article.
 */
export async function getArticle(articleId: string): Promise<ArticleDataType> {
  const fullFilePath: string = path.join(articlesDirectory, `${articleId}.md`)
  const fileContents: string = fs.readFileSync(fullFilePath, "utf8")

  const articleMetadata: matter.GrayMatterFile<string> = matter(fileContents)
  let htmlBody = await remark().use(html).process(articleMetadata.content)

  return {
    fileId: articleId,
    fullMarkdown: fileContents,
    markdownBody: articleMetadata.content,
    htmlBody: htmlBody.value.toString(),
    metadata: JSON.stringify(articleMetadata.data as MetadataType),
  }
}

/**
 * Get the YAML header with metadata for each article.
 *
 * Deserialized metadata which is string then must be converted to object before
 * use.
 */
export async function getHeaderMetadata(): Promise<string[]> {
  const articlePaths: (string | undefined)[] = getArticlePaths()

  const articles: string[] = await Promise.all(
    articlePaths.map(async (articlePath: string) => {
      const article: ArticleDataType = await getArticle(
        `${articlePath.replace(/\.md$/, "")}`
      )
      return article.metadata
    })
  )

  return articles
}
