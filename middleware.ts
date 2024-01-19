/** Middleware for NextJS which routes pages. */

// Not adding a `config` variable will secure all pages in web application.
export { default } from "next-auth/middleware"

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

  // matcher: ["/articles/(.*)"],
  matcher: ["/no-match"],
}
