import { NextRequest, NextResponse } from "next/server"
import { shouldBypassVerification } from "./article_configs/article_exceptions_config"
/** Middleware for NextJS which routes pages. */

// Not adding a `config` variable will secure all pages in web application.
// export { default } from "next-auth/middleware"

export function middleware(request: NextRequest) {
  const CLICK_CHECK_KEY = "XAVIER_WAS_HERE"

  // Check if this is an article that should bypass verification
  const url = new URL(request.url)
  const pathMatch = url.pathname.match(/^\/articles\/(.+)$/)
  if (pathMatch) {
    const articleId = pathMatch[1]
    if (shouldBypassVerification(articleId)) {
      console.log(`MIDDLEWARE: BYPASSING verification for article: ${articleId}`)
      return NextResponse.next()
    }
  }

  // Coming from simple "CAPTCHA", rewrite to destination
  // Add cookie to let checked users through
  if (request.url.match("verified=true")) {
    console.log("MIDDLEWARE: VERIFIED")

    const cleanUrl = new URL(request.url)
    cleanUrl.searchParams.delete("verified")
    cleanUrl.searchParams.delete("intended")
    cleanUrl.searchParams.delete("articleId")

    const response = NextResponse.next()
    const now = new Date()
    response.cookies.set(CLICK_CHECK_KEY, now.toDateString())

    return response
  }

  // If not checked, rewrite to simple "CAPTCHA"
  if (!request.cookies.has(CLICK_CHECK_KEY)) {
    console.log("MIDDLEWARE: NO COOKIE")

    const verifyPage = new URL("/verify", request.url)
    verifyPage.searchParams.append("intended", request.url)

    return NextResponse.rewrite(verifyPage.href)
  }

  console.log("MIDDLEWARE: Pass")
}

// Applies to both `pages/` and `public/`.
export const config = {
  // Matcher will match the paths that NextAuth will
  // require user authentication.
  //
  // Since NextJS forbids variables and conditional
  // statements, comment out the unused option.
  //
  // `"/articles/(.*)"` is for all articles and article
  // assets in the `public` directory.
  //
  // `["/no-match"]` is a non-existent page value for
  // NextAuth to block NO PAGES.
  matcher: ["/articles/(.*)"],
  // matcher: ["/no-match"],
}
