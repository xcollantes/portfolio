/** Process content entries for blogs and portfolio at build time. */

import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const blogsDirectory: string = path.join(process.cwd(), "blogs")

export interface MetadataType {
  // Shown as title on blog page. Human readable. Case-sensitive.
  title: string
  // Shown as text under title on blog page. Human readable. Case-sensitive.
  subTitle?: string
  // Shown as author on blog page. Human readable. Case-sensitive.
  author?: string
  // Timestamp of creation of blog.
  date_written?: Date
  // Timestamp of last major update.
  date_last_updated?: Date
  // Tags that should match some tag in filterData.ts.
  tags?: string[]
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

/**
 * Read local files IDs from paths of the Markdown files.
 */
export function getBlogsPaths(): Array<{ params: { blogId: string } }> {
  const fileNames: string[] = fs.readdirSync(blogsDirectory)

  const pathsProps: Array<{ params: { blogId: string } }> = fileNames.map(
    (fileName: string) => ({
      params: {
        blogId: `${fileName.replace(/\.md$/, "")}`,
      },
    })
  )

  return pathsProps
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
