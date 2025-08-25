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
  getHeaderMetadata,
  MetadataType,
} from "../../article_configs/process_articles"
import {
  getRelatedArticles,
  getCommonTags,
  RelatedArticleType,
} from "../../article_configs/related_articles"
import ArticleAnalytics from "../../components/ArticleAnalytics"
import EmojiReactions from "../../components/EmojiReactions"
import Footer from "../../components/Footer"
import HiddenPreviewImage from "../../components/HiddenPreviewImage"
import ReactMarkdownRules from "../../components/ReactMarkdownCustom"
import RelatedArticles from "../../components/RelatedArticles"
import ShareButton from "../../components/ShareButton"
import TableOfContents from "../../components/TableOfContents"
import { getSiteConfig } from "../../config/siteConfig"

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
interface ArticlePageProps {
  fileId: string
  fullMarkdown: string
  markdownBody: string
  htmlBody: any
  metadata: MetadataType  // Parsed metadata object instead of string
  relatedArticles: RelatedArticleType[]
  commonTags: string[]
  articleId: string
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<ArticlePageProps>> {
  // Add type, otherwise undefined pages will cause error:
  // https://github.com/vercel/next.js/discussions/16522#discussioncomment-130070
  const params = context.params! as ContextParamsType
  const article: ArticleDataType = await getArticle(params.articleId)
  const currentMetadata: MetadataType = JSON.parse(article.metadata)

  // Get all articles to find related ones
  const allArticleMetadata: string[] = await getHeaderMetadata()
  const allArticles: MetadataType[] = allArticleMetadata.map(
    (unparsedMetadata: string) => JSON.parse(unparsedMetadata)
  )

  // Find related articles
  const relatedArticles = getRelatedArticles(currentMetadata, allArticles, 3)
  const commonTags = getCommonTags(currentMetadata, relatedArticles)

  const articleProps: ArticlePageProps = {
    ...article,
    metadata: currentMetadata,
    relatedArticles,
    commonTags,
    articleId: params.articleId,
  }

  return { props: articleProps }
}

export default function article({
  fullMarkdown,
  markdownBody,
  htmlBody,
  metadata,
  relatedArticles,
  commonTags,
  articleId,
}: ArticlePageProps) {
  const theme: Theme = useTheme()
  const siteConfig = getSiteConfig()

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

  console.debug("metadata", metadata.imagePath)

  return (
    <>
      <Head>
        {/* Articles not indexed will fallback to default OG tags. */}
        {!allowIndexing && <meta name="robots" content="noindex" />}

        {/* Dynamic Open Graph meta tags for article sharing */}
        <meta key="og:type" property="og:type" content="article" />
        <meta key="og:url" property="og:url" content={`${siteConfig.baseUrl}/articles/${articleId}`} />
        <meta key="og:title" property="og:title" content={metadata.title} />
        <meta key="og:description" property="og:description" content={metadata.cardDescription || metadata.subTitle || `Read ${metadata.title} by ${metadata.author || 'Xavier Collantes'}`} />
        <meta key="og:image" property="og:image" content={metadata.imagePath ? `${siteConfig.baseUrl}${metadata.imagePath}` : `${siteConfig.baseUrl}/preview_image/front.webp`} />
        <meta key="og:image:width" property="og:image:width" content="1200" />
        <meta key="og:image:height" property="og:image:height" content="630" />
        <meta key="og:image:alt" property="og:image:alt" content={`${metadata.title} - Xavier Collantes`} />
        <meta key="og:site_name" property="og:site_name" content="Xavier Collantes" />
        {metadata.author && <meta key="article:author" property="article:author" content={metadata.author} />}
        {metadata.dateWritten && <meta key="article:published_time" property="article:published_time" content={new Date(metadata.dateWritten).toISOString()} />}
        {metadata.dateLastUpdated && <meta key="article:modified_time" property="article:modified_time" content={new Date(metadata.dateLastUpdated).toISOString()} />}

        {/* Dynamic Twitter Card meta tags */}
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content={metadata.title} />
        <meta key="twitter:description" name="twitter:description" content={metadata.cardDescription || metadata.subTitle || `Read ${metadata.title} by ${metadata.author || 'Xavier Collantes'}`} />
        <meta key="twitter:image" name="twitter:image" content={metadata.imagePath ? `${siteConfig.baseUrl}${metadata.imagePath}` : `${siteConfig.baseUrl}/preview_image/front.webp`} />
        <meta key="twitter:image:alt" name="twitter:image:alt" content={`${metadata.title} - Xavier Collantes`} />

        {/* Article-specific meta tags */}
        <meta key="description" name="description" content={metadata.cardDescription || metadata.subTitle || `${metadata.title} by ${metadata.author || 'Xavier Collantes'}`} />
        <title key="title">{metadata.title} - Xavier Collantes</title>
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1
                }}
              >
                <Typography variant="h2" sx={{ fontWeight: "bold", flex: 1 }}>
                  {metadata.title}
                </Typography>
              </Box>

              {metadata.subTitle && (
                <Typography variant="subtitle2">{metadata.subTitle}</Typography>
              )}
              {metadata.author && (
                <Typography variant="body1" color={"gray"}>
                  By {metadata.author}
                </Typography>
              )}
              {metadata.dateLastUpdated && metadata.dateWritten && (
                <Typography variant="body1" color={"gray"}>
                  Created: {dateWrittenL10n}; Updated: {dateLastUpdatedL10n}
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

            <EmojiReactions articleId={articleId as string} />

            <ShareButton
              shareUrl={`${siteConfig.baseUrl}/articles/${articleId}`}
              title={metadata.title}
              description={metadata.cardDescription || metadata.subTitle || `Read ${metadata.title} by ${metadata.author || 'Xavier Collantes'}`}
              source={`article_${articleId}`}
            />

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

            <EmojiReactions articleId={articleId as string} />

            <RelatedArticles
              relatedArticles={relatedArticles}
              commonTags={commonTags}
            />

            <Footer />
          </Container>
        </Box>
      </Container>
    </>
  )
}
