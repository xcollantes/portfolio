/** Statically generated blog page. */

import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import {
  BlogDataType,
  getBlog,
  getBlogsPathsAsProps,
} from "../../blog_utils/process_blogs"
import {
  Box,
  Container,
  Divider,
  Theme,
  Typography,
  useTheme,
} from "@mui/material"
import { ParsedUrlQuery } from "querystring"
import ReactMarkdown from "react-markdown"
import Drawer from "../../components/Drawer"
import Footer from "../../components/Footer"

/**
 * Runs at build time to generate possible blog paths.
 *
 * Requires return of
 * `{ paths: [{ params: <blogId> }, { params: <blogId> }] }`
 */
export async function getStaticPaths() {
  const blogsPaths: Array<{ params: { blogId: string } }> =
    getBlogsPathsAsProps()
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
 */
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
      <Container maxWidth={"md"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: 0.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",

              [theme.breakpoints.down("sm")]: {
                justifyContent: "flex-end",
                flexDirection: "column-reverse",
              },
            }}
          >
            <Typography variant="h2">{metadata.title}</Typography>
            <Box
              sx={{
                display: "flex",
                [theme.breakpoints.down("sm")]: {
                  justifyContent: "flex-end",
                },
              }}
            >
              <Drawer />
            </Box>
          </Box>

          {metadata.subTitle && (
            <Typography variant="subtitle2">{metadata.subTitle}</Typography>
          )}
          <Typography variant="body1" color={"gray"}>
            Written by {metadata.author}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <ReactMarkdown>{markdownBody}</ReactMarkdown>
        <Footer />
      </Container>
    </>
  )
}
