/** Statically generated article page. */

import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import {
  ArticleDataType,
  getArticle,
  getArticlePathsAsProps,
} from "../../article_configs/process_articles"
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
import rehypeRaw from "rehype-raw"
import Drawer from "../../components/Drawer"
import Footer from "../../components/Footer"
import ReactMarkdownRules from "../../components/ReactMarkdownCustom"

/**
 * Runs at build time to generate possible article paths.
 *
 * Requires return of
 * `{ paths: [{ params: <articleId> }, { params: <articleId> }] }`
 */
export async function getStaticPaths() {
  const articlePaths: Array<{ params: { articleId: string } }> =
    getArticlePathsAsProps()
  return { paths: articlePaths, fallback: false }
}

interface ContextParamsType extends ParsedUrlQuery {
  articleId: string
}

/**
 * Runs at build time to statically generate article pages.
 *
 * Requires return of
 * `{ props: <prop variable> }`
 */
export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<ArticleDataType>> {
  // Add type, otherwise undefined pages will cause error:
  // https://github.com/vercel/next.js/discussions/16522#discussioncomment-130070
  const params = context.params! as ContextParamsType
  const article: ArticleDataType = await getArticle(params.articleId)

  const articleProps = {
    ...article,
    metadata: JSON.parse(article.metadata),
  }

  return { props: articleProps }
}

export default function article({
  fullMarkdown,
  markdownBody,
  htmlBody,
  metadata,
}) {
  const theme: Theme = useTheme()

  let dateLastUpdatedL10n: string = ""
  if (metadata.dateLastUpdated) {
    dateLastUpdatedL10n = new Date(
      metadata.dateLastUpdated
    ).toLocaleDateString()
  }

  let dateWrittenL10n: string = ""
  if (metadata.dateWritten) {
    dateWrittenL10n = new Date(metadata.dateWritten).toLocaleDateString()
  }

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
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              {metadata.title}
            </Typography>
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
          {metadata.author && (
            <Typography variant="body1" color={"gray"}>
              Written by {metadata.author}
            </Typography>
          )}
          {metadata.dateLastUpdated && metadata.dateWritten && (
            <Typography variant="body1" color={"gray"}>
              Created: {dateWrittenL10n}; Last updated: {dateLastUpdatedL10n}
            </Typography>
          )}
          {metadata.dateLastUpdated && !metadata.dateWritten && (
            <Typography variant="body1" color={"gray"}>
              {dateLastUpdatedL10n}
            </Typography>
          )}
          {!metadata.dateLastUpdated && metadata.dateWritten && (
            <Typography variant="body1" color={"gray"}>
              {dateWrittenL10n}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* `rehypeRaw` used for HTML elements to be understood as HTML.
            This includes iframes and ability to use HTML elements.
            https://stackoverflow.com/a/70548866/8278075 */}

        <ReactMarkdown
          components={ReactMarkdownRules()}
          rehypePlugins={[rehypeRaw] as any}
        >
          {markdownBody}
        </ReactMarkdown>
        <Footer />
      </Container>
    </>
  )
}
