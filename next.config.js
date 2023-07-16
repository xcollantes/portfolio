/** NextJS file. */

const contentSecurityPolicy = `
  default-src 'self';
  script-src 'unsafe-eval';
  font-src 'self' fonts.googleapis.com;
  style-src 'unsafe-inline';
`

const policy = {
  // Helps prevent cross-site scripting (XSS), clickjacking, and other
  // code injection attacks.
  // Content Security Policy (CSP) can specify allowed origins for
  // content including scripts, stylesheets, images, fonts, objects,
  // media (audio, video), iframes, and more.
  key: "Content-Security-Policy",
  value: contentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
}

module.exports = {
  i18n: {
    // Locales you want to support in your application
    locales: ["en-US"],
    // Default locale when visiting a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en-US",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            // HTTPS only
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Server",
            value: "Apache", // Fake server value
          },
          {
            // Helps against XSS attacks where users try to upload using
            // different Content-Types
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "sameorigin",
          },
          {
            // Stops loading when XSS is detected
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            // Controls how much info is passed to other websites user visits
            // https://scotthelme.co.uk/a-new-security-header-referrer-policy
            key: "Referrer-Policy",
            value: "same-origin",
          },
          {
            // Prevents display in iframes to prevent clickjacking
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            // Allows which APIs in browser can be accessed
            // Ex: `camera=(), microphone=(), geolocation=(), browsing-topics=()`
            key: "Permissions-Policy",
            value: "geolocation=*", // allow specified policies here
          },
        ],
      },
    ]
  },
}
