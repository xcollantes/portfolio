/** Middleware for NextJS which routes pages. */

// Not adding a `config` variable will secure all pages in web application.
export { default } from "next-auth/middleware"

export const config = { matcher: ["/blogs/(.*)"] }
