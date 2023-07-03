/** Process content entries for blogs and portfolio at build time. */

import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const blogsDirectory: string = path.join(process.cwd(), "blogs")

export interface BlogDataType {
  // Filename of the blog entry without any extension.
  fileId: string
  // Raw text to be placed in the body.
  // Contains headers.
  // WARNING: The body will be directly rendered on user page.
  body: string
  // Text converted from Markdown to HTML.
  // Does not have headers.
  html: any
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
  const content: string = fs.readFileSync(fullFilePath, "utf8")

  const blogMetadata: matter.GrayMatterFile<string> = matter(content)
  let htmlBody = await remark().use(html).process(blogMetadata.content)

  //   let htmlBody = htmlBodyPre.value
  //     .toString()
  //     .replace(/<h1>/, "<Typography variant='h1'>")
  //     .replace(/<\/h1>/, "</Typography>")

  return {
    fileId: blogId,
    body: content,
    html: htmlBody.value.toString(),
    metadata: JSON.stringify(blogMetadata.data),
  }
}
