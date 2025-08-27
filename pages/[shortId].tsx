/**
 * Redirects from xaviercollantes.dev/[shortId] to the corresponding article.
 *
 * Once the new domain is live, this should not be removed.
 */

import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getArticleSlugFromShortUrl } from '../config/shortUrls'

interface ContextParamsType extends ParsedUrlQuery {
  shortId: string
}

export default function ShortUrlRedirect() {
  // This component should never render as we always redirect
  return null
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const params = context.params! as ContextParamsType
  const shortId = params.shortId

  // Only handle numeric short IDs to avoid conflicts with other routes.
  //
  //   Examples:
  // - ✅ "4" → matches
  // - ✅ "123" → matches
  // - ❌ "4a" → doesn't match
  // - ❌ "abc" → doesn't match
  // - ❌ "4-5" → doesn't match
  if (!/^\d+$/.test(shortId)) {
    return {
      notFound: true
    }
  }

  const articleSlug: string | null = getArticleSlugFromShortUrl(shortId)

  if (!articleSlug) {
    return {
      notFound: true
    }
  }

  return {
    redirect: {
      destination: `/articles/${articleSlug}`,
      permanent: false // Use temporary redirect so we can change mappings
    }
  }
}