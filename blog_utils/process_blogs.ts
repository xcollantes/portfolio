/** Process content entries for blogs and portfolio at build time. */

import path from "path"
import fs from "fs"

const blogsDirectory: string = path.join(process.cwd(), "blogs")

export interface BlogDataType {
  // Filename of the blog entry without any extension.
  fileId: string
  // Parsed text to be placed in the body.
  // WARNING: The body will be directly rendered on user page.
  body: string
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
export function getBlog(blogId: string): BlogDataType {
  const fullFilePath: string = path.join(blogsDirectory, `${blogId}.md`)
  const content: string = fs.readFileSync(fullFilePath, "utf8")

  return { fileId: blogId, body: content }
}
