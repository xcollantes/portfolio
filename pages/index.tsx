/** Home page with conditional rendering based on site mode. */

import { GetStaticPropsResult } from "next"
import {
  MetadataType,
  getHeaderMetadata,
} from "../article_configs/process_articles"
import { getRecommendationData } from "../recommendation_configs/process_recommendations"
import { RecommendationRawType } from "../recommendation_configs/RecommendationTypes"
import { getSiteConfig, isBlogOnlyMode } from "../config/siteConfig"
import BlogLayout from "../components/BlogLayout"
import PortfolioLayout from "../components/PortfolioLayout"
import NewsletterModal from "../components/NewsletterModal"

const SHOW_NEWSLETTER_PROMPT = process.env.NEXT_PUBLIC_NEWSLETTER_PROMPT === "true" || false

/**
 * Runs at build time to statically generate preview cards.
 */
export async function getStaticProps(): Promise<
  GetStaticPropsResult<{
    metadataProps: MetadataType[]
    recommendationsProp: RecommendationRawType[]
  }>
> {
  // Article preview cards.
  const articleMetadata: string[] = await getHeaderMetadata()
  const metadata: MetadataType[] = articleMetadata.map(
    (unparsedMetadata: string) => JSON.parse(unparsedMetadata)
  )

  // Recommendation slides feature.
  const recommendationData: RecommendationRawType[] = await getRecommendationData()

  return {
    props: { metadataProps: metadata, recommendationsProp: recommendationData },
  }
}

interface IndexPropTypes {
  metadataProps: MetadataType[]
  recommendationsProp: RecommendationRawType[]
}

export default function Page(props: IndexPropTypes) {
  // Render different layouts based on site mode
  return (
    <>
      {isBlogOnlyMode() ? <BlogLayout {...props} /> : <PortfolioLayout {...props} />}

      {/* Newsletter signup modal. Shows up after a time. Both portfolio and blog. */}
      {SHOW_NEWSLETTER_PROMPT && <NewsletterModal autoShow={true} delaySeconds={14} />}
    </>
  )
}
