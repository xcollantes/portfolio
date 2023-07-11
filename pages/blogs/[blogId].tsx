/** Statically generated blog page. */

import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import {
  BlogDataType,
  getBlog,
  getBlogsPaths,
} from "../../blog_utils/process_blogs"
import { Box, Divider, Theme, Typography, useTheme } from "@mui/material"
import { ParsedUrlQuery } from "querystring"
import ReactMarkdown from "react-markdown"
import DarkModeSwitch from "../../components/DarkMode"

/**
 * Runs at build time to generate possible blog paths.
 *
 * Requires return of
 * `{ paths: [{ params: <blogId> }, { params: <blogId> }] }`
 */
export async function getStaticPaths() {
  const blogsPaths: Array<{ params: { blogId: string } }> = getBlogsPaths()
  return { paths: blogsPaths, fallback: false }
}

interface ContextParamsType extends ParsedUrlQuery {
  blogId: string
}

/**
 * Runs at build time to statically generate blog pages.
 *
 * Requires return of
 * `{ props: <prop variable> }`
 * */
export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<BlogDataType>> {
  // Add type, otherwise undefined pages will cause error:
  // https://github.com/vercel/next.js/discussions/16522#discussioncomment-130070
  const params = context.params! as ContextParamsType
  const blog: BlogDataType = await getBlog(params.blogId)

  const blogProps = {
    ...blog,
    metadata: JSON.parse(blog.metadata),
  }

  return { props: blogProps }
}

export default function Blog({
  fullMarkdown,
  markdownBody,
  htmlBody,
  metadata,
}) {
  const theme: Theme = useTheme()
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 0.5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column-reverse",
              justifyContent: "right",
            },
          }}
        >
          <Typography variant="h2">{metadata.title}</Typography>
          <DarkModeSwitch />
        </Box>

        {metadata.subTitle && (
          <Typography variant="subtitle2">{metadata.subTitle}</Typography>
        )}
        <Typography variant="body1" color={"gray"}>
          Written by {metadata.author}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Use ReactMarkdown instead of `dangerouslySetInnerHTML` */}
      {/* TODO(https://github.com/xcollantes/portfolio/issues/17): 
            Use MuiMarkdown to input themes */}
      <ReactMarkdown>{markdownBody}</ReactMarkdown>
    </>
  )
}
