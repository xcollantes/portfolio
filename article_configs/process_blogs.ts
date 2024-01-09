/** Process content entries for blogs and portfolio at build time. */

import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const blogsDirectory: string = path.join(process.cwd(), "blogs")

/**
 * YAML metadata tags set in each Markdown blog file.
 *
 * Example at the top of every article Markdown file:
 * ```
 * ---
 * title: Technical Solutions in Google Search
 * cardDescription: What I did on the team and how I did it.
 * imagePath: /myblog/image.png
 * cardPageLink: /myblogpage-no-extension
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
  // Shown as title on blog page and preview card header. Human readable.
  // Case-sensitive.
  title: string
  // Description used on preview card. One or two sentences.
  cardDescription: string
  // Usually the page where the article is located but the link can be an
  // external page and skip the article altogether.
  //
  // NextJS Link page name with no extension in relation to `pages/`.
  // Example: pages/blogs/project.tsx => blogs/project
  cardPageLink: string
  // Preview card button text. Default is "See more".
  imagePath: string
  // Must match with filterData.ts list.
  // Add as many tags since only tags specified in filterData.ts are filterable.
  // Order not considered.
  tagIds: string[]
  // Shown as text under title on blog page. Human readable. Case-sensitive.
  subTitle?: string
  // Shown as author on blog page. Human readable. Case-sensitive.
  author?: string
  // Location of image icon relative to the `public/` directory.
  cardButtonText?: string
  // Timestamp of creation of blog.
  dateWritten?: Date
  // Timestamp of last major update.
  dateLastUpdated?: Date
}

export interface BlogDataType {
  // Filename of the blog entry without any extension.
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

/** Read local files IDs from paths of the Markdown files. */
export function getBlogsPaths(): string[] {
  return fs.readdirSync(blogsDirectory)
}

/**
 * Get blog paths as NextJS props.
 *
 * Remove the file extension and create object for getStaticPaths().
 */
export function getBlogsPathsAsProps(): Array<{ params: { blogId: string } }> {
  const fileNames: string[] = getBlogsPaths()
  return fileNames.map((fileName: string) => ({
    params: {
      blogId: `${fileName.replace(/\.md$/, "")}`,
    },
  }))
}

/**
 * Read local file for one Markdown blog.
 */
export async function getBlog(blogId: string): Promise<BlogDataType> {
  const fullFilePath: string = path.join(blogsDirectory, `${blogId}.md`)
  const fileContents: string = fs.readFileSync(fullFilePath, "utf8")

  const blogMetadata: matter.GrayMatterFile<string> = matter(fileContents)
  let htmlBody = await remark().use(html).process(blogMetadata.content)

  return {
    fileId: blogId,
    fullMarkdown: fileContents,
    markdownBody: blogMetadata.content,
    htmlBody: htmlBody.value.toString(),
    metadata: JSON.stringify(blogMetadata.data as MetadataType),
  }
}

/**
 * Get the YAML header with metadata for each blog.
 *
 * Deserialized metadata which is string then must be converted to object before
 * use.
 */
export async function getHeaderMetadata(): Promise<string[]> {
  const blogPaths: string[] = getBlogsPaths()

  const blogs: string[] = await Promise.all(
    blogPaths.map(async (blogPath: string) => {
      const blog: BlogDataType = await getBlog(
        `${blogPath.replace(/\.md$/, "")}`
      )
      return blog.metadata
    })
  )

  return blogs
}
