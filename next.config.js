/** NextJS file. */

const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://scripts.simpleanalyticscdn.com https://metricsloop.com;
  connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com;
  img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com https://stats.g.doubleclick.net;
  font-src 'self' fonts.googleapis.com;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
`

const securityHeaders = [
  {
    // Helps prevent cross-site scripting (XSS), clickjacking, and other
    // code injection attacks.
    // Content Security Policy (CSP) can specify allowed origins for
    // content including scripts, stylesheets, images, fonts, objects,
    // media (audio, video), iframes, and more.
    key: "Content-Security-Policy",
    value: contentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
]

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.shields.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
  i18n: {
    // Locales you want to support in your application
    locales: ["en-US"],
    // Default locale when visiting a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en-US",
  },
  // Ensure sitemap.xml and robots.txt are served correctly
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          ...securityHeaders,
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
