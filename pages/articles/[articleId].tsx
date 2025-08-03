/** Statically generated article page. */

import {
  Box,
  Container,
  Divider,
  Theme,
  Typography,
  useTheme,
} from "@mui/material"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { shouldAllowSearchIndexing } from "../../article_configs/article_exceptions_config"
import {
  ArticleDataType,
  getArticle,
  getArticlePathsAsProps,
} from "../../article_configs/process_articles"
import ArticleAnalytics from "../../components/ArticleAnalytics"
import Footer from "../../components/Footer"
import HiddenPreviewImage from "../../components/HiddenPreviewImage"
import ReactMarkdownRules from "../../components/ReactMarkdownCustom"
import TableOfContents from "../../components/TableOfContents"

import { useRouter } from "next/router"

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
  const router = useRouter()
  const { articleId } = router.query

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

  const allowIndexing = shouldAllowSearchIndexing(articleId as string)

  return (
    <>
      <Head>
        {!allowIndexing && <meta name="robots" content="noindex" />}

        {/* Dynamic Open Graph meta tags for article sharing */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://xaviercollantes.dev/articles/${articleId}`} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.cardDescription || metadata.subTitle || `Read ${metadata.title} by ${metadata.author || 'Xavier Collantes'}`} />
        <meta property="og:image" content={metadata.imagePath ? `https://xaviercollantes.dev${metadata.imagePath}` : "https://xaviercollantes.dev/preview_image/front.jpeg"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${metadata.title} - Xavier Collantes`} />
        <meta property="og:site_name" content="Xavier Collantes" />
        {metadata.author && <meta property="article:author" content={metadata.author} />}
        {metadata.dateWritten && <meta property="article:published_time" content={new Date(metadata.dateWritten).toISOString()} />}
        {metadata.dateLastUpdated && <meta property="article:modified_time" content={new Date(metadata.dateLastUpdated).toISOString()} />}

        {/* Dynamic Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.cardDescription || metadata.subTitle || `Read ${metadata.title} by ${metadata.author || 'Xavier Collantes'}`} />
        <meta name="twitter:image" content={metadata.imagePath ? `https://xaviercollantes.dev${metadata.imagePath}` : "https://xaviercollantes.dev/preview_image/front.jpeg"} />
        <meta name="twitter:image:alt" content={`${metadata.title} - Xavier Collantes`} />

        {/* Article-specific meta tags */}
        <meta name="description" content={metadata.cardDescription || metadata.subTitle || `${metadata.title} by ${metadata.author || 'Xavier Collantes'}`} />
        <title>{metadata.title} - Xavier Collantes</title>
      </Head>

      {/* Include ArticleAnalytics to track article engagement */}
      <ArticleAnalytics
        articleId={articleId as string}
        articleTitle={metadata.title}
        articleType={metadata.articleType || "BLOG"}
      />

      {/* Hidden image for RCS preview workaround when OG tags aren't respected. */}
      <HiddenPreviewImage />

      {/* Table of Contents - Desktop only, positioned absolutely to the left */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'block' },
          position: 'fixed',
          left: 40,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 300,
          zIndex: 1000,
        }}
      >
        <TableOfContents markdownContent={markdownBody} />
      </Box>

      <Container maxWidth={"xl"} sx={{ px: { xs: 0 } }}>
        <Box sx={{ position: "relative" }}>
          {/* Main Article Content - Full width without offset */}
          <Container maxWidth={"md"} sx={{ px: { xs: 0, sm: 3 } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: 0.5,
              }}
            >
              <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                {metadata.title}
              </Typography>

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
        </Box>
      </Container>
    </>
  )
}
