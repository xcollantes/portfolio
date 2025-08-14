/** Custom rules for ReactMarkdown converter. */

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import articleStyles from "../css/article.module.css"
import imageStyles from "../css/images.module.css"
import CodeSnippet from "./CodeSnippet"
import Gist from "./Gist"
import { extractGistId } from "./GistUtils"
import InlineArticleCallout, { ArticleCalloutType, VALID_ARTICLE_CALLOUT_TYPES } from "./InlineArticleCallout"

const imgCustom = (imageData) => {
  /** Looking for `![some alt text](/the/image/path.png)` => some alt text */
  const altTextSection = imageData.alt?.match(/^([a-zA-Z ]+)/)
  const altText = altTextSection ? altTextSection[1].trim() : ""

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  let fill: boolean = !isMobile
  let isPriority: boolean = false
  let width: number | undefined = undefined
  let height: number | undefined = undefined

  const matchPriority = imageData.alt?.match(/(\{priority\})/)
  const matchImageHeight = imageData.alt?.match(/\{h: (\d+)\}/)

  if (matchPriority) {
    isPriority = matchPriority[0] == "{priority}"
  }

  if (matchImageHeight) {
    // Only have user specify the height as the image will maintain ratio when
    // height is specified. Width does not change the image width.
    width = 3000
    height = parseInt(matchImageHeight[1])
    fill = false
  } else if (isMobile) {
    // On mobile, use explicit dimensions for better height fitting
    width = 800
    height = 600
    fill = false
  }

  return (
    <Box component={"span"} className={imageStyles.imageContainer}>
      <Image
        src={imageData.src}
        alt={altText}
        blurDataURL="https://davisgitonga.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner.749d546a.jpg"
        fill={fill}
        width={width}
        height={height}
        priority={isPriority}
        placeholder="blur"
        className={isMobile ? imageStyles.imageItemMobile : imageStyles.imageItem}
      />
    </Box>
  )
}

// Helper function to generate URL-friendly IDs from header text.
const generateHeaderId = (children) => {
  const text = Array.isArray(children)
    ? children.map(child => typeof child === 'string' ? child : '').join('')
    : typeof children === 'string' ? children : ''

  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

/**
 * The matching is offset because the h1 is the main header and the rest are
 * subheaders.
 */
const h1Custom = (h1) => {
  const id = generateHeaderId(h1.children)
  return <Typography variant="h1" id={id}>{h1.children}</Typography>
}

const h2Custom = (h2) => {
  const id = generateHeaderId(h2.children)
  return <Typography variant="h3" id={id} sx={{ mt: 5 }}>{h2.children}</Typography>
}

const h3Custom = (h3) => {
  const id = generateHeaderId(h3.children)
  return <Typography variant="h4" id={id} sx={{ mt: 4 }}>{h3.children}</Typography>
}

const h4Custom = (h4) => {
  const id = generateHeaderId(h4.children)
  return <Typography variant="h5" id={id}>{h4.children}</Typography>
}

const h5Custom = (h5) => {
  const id = generateHeaderId(h5.children)
  return <Typography variant="h6" id={id}>{h5.children}</Typography>
}

/** Using H6 tag as a caption.
 *
 * Markdown has no caption equivalent so I decided to use H6 tag.
 */
const h6Custom = (h6) => {
  return (
    <Typography variant="caption" sx={{ m: 0, p: 0, border: 0 }}>
      {h6.children}
    </Typography>
  )
}

const aCustom = (a) => {
  // Check if this is a GitHub gist URL
  const gistId = extractGistId(a.href)

  if (gistId) {
    // Render as embedded gist
    return <Gist gistId={gistId} />
  }

  // Regular link
  return (
    <Link href={a.href} passHref className={articleStyles.linkText}>
      {a.children}
    </Link>
  )
}

const preCustom = (props) => {
  // ReactMarkdown passes props differently than expected
  const { node, children, ...rest } = props

  // Look for code element in children
  const codeElement = children && children[0]

  // Check if this is a code block (has code element child with language class)
  if (codeElement && codeElement.props && codeElement.props.className) {
    const className = codeElement.props.className || ''

    // Only handle language-specific code blocks
    if (className.startsWith('language-')) {
      const language = className.replace('language-', '') || 'text'
      const code = codeElement.props.children || ''

      // Convert array of children to string if needed
      const codeString = Array.isArray(code) ? code.join('') : String(code)

      // Extract filename from code content if it starts with a comment
      let filename: string | undefined = undefined
      let cleanCode: string = codeString

      if (typeof codeString === 'string') {
        const lines = codeString.split('\n')
        const firstLine = lines[0]?.trim()

        // Check for filename patterns in first line comments
        const filenamePatterns = [
          /^\/\/\s*(.+)$/, // JavaScript/TypeScript: // filename.js
          /^#\s*(.+)$/, // Python/Shell: # filename.py
          /^<!--\s*(.+)\s*-->$/, // HTML: <!-- filename.html -->
          /^\/\*\s*(.+)\s*\*\/$/, // CSS: /* filename.css */
        ]

        for (const pattern of filenamePatterns) {
          const match = firstLine?.match(pattern)
          if (match && match[1] && match[1].includes('.')) {
            filename = match[1].trim()
            // Remove the filename line from code
            cleanCode = lines.slice(1).join('\n').replace(/^\n/, '')
            break
          }
        }
      }

      return (
        <CodeSnippet
          code={cleanCode}
          language={language}
          filename={filename}
        />
      )
    }
  }

  // Fallback for regular pre elements or non-language code blocks
  return <pre {...rest}>{children}</pre>
}

const codeCustom = (props) => {
  const { node, children, className, ...rest } = props

  // Handle inline code (not in pre blocks and without language class)
  const isInline = !className || !className.includes('language-')

  if (isInline) {
    return (
      <Typography
        component="code"
        sx={{
          backgroundColor: (theme) => theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
          padding: '2px 6px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '0.9em',
        }}
      >
        {children}
      </Typography>
    )
  }

  // For code blocks, let the pre handler take care of it
  return <code className={className} {...rest}>{children}</code>
}

const pCustom = (props) => {
  const { children } = props

  // Check if paragraph contains only a single text node that might be a gist URL
  if (Array.isArray(children) && children.length === 1 && typeof children[0] === 'string') {
    const text = children[0].trim()
    const gistId = extractGistId(text)

    if (gistId) {
      // Render as embedded gist
      return <Gist gistId={gistId} />
    }
  }

  // Regular paragraph
  return <Typography component="div" sx={{ my: 2 }}>{children}</Typography>
}

const blockquoteCustom = (props) => {
  const { children } = props

  return (
    <Box
      component="blockquote"
      sx={{
        margin: 0,
        marginY: 3,
        padding: 2,
        paddingLeft: 3,
        borderLeft: (theme) => `4px solid ${theme.palette.mode === 'dark'
          ? 'var(--primary-dark)'
          : 'var(--primary-light)'
          }`,
        backgroundColor: (theme) => theme.palette.mode === 'dark'
          ? 'rgba(59, 130, 246, 0.1)'
          : 'rgba(37, 99, 235, 0.05)',
        borderRadius: '0 8px 8px 0',
        position: 'relative',

        '& > *:first-of-type': {
          marginTop: 1,
        },
        '& > *:last-child': {
          marginBottom: 0,
        },
      }}
    >
      <Typography
        component="div"
        sx={{
          fontStyle: 'italic',
          color: (theme) => theme.palette.mode === 'dark'
            ? 'var(--text-primary-dark)'
            : 'var(--text-primary-light)',
        }}
      >
        {children}
      </Typography>
    </Box>
  )
}

// Custom iframe handler for responsive videos
const iframeCustom = (props) => {
  const { src, width, height, ...rest } = props

  // Check if this is a video embed (YouTube, Vimeo, etc.)
  const isVideoEmbed = src && (
    src.includes('youtube.com') ||
    src.includes('youtu.be') ||
    src.includes('vimeo.com') ||
    src.includes('twitch.tv') ||
    src.includes('loom.com')
  )

  if (isVideoEmbed) {
    return (
      <Box className="responsive-iframe" sx={{ my: 2 }}>
        <iframe
          src={src}
          {...rest}
          style={{
            border: 0,
          }}
          allowFullScreen
        />
      </Box>
    )
  }

  // Regular iframe
  return (
    <Box sx={{ maxWidth: '100%', overflow: 'hidden', my: 2 }}>
      <iframe
        src={src}
        width={width}
        height={height}
        {...rest}
        style={{
          maxWidth: '100%',
        }}
      />
    </Box>
  )
}

// Custom video handler for responsive videos
const videoCustom = (props) => {
  const { src, width, height, ...rest } = props

  return (
    <Box sx={{ maxWidth: '100%', my: 2 }}>
      <video
        src={src}
        controls
        {...rest}
        style={{
          maxWidth: '100%',
        }}
      />
    </Box>
  )
}

// Custom article callout handler
const articleCalloutCustom = (props) => {
  const { type, title, url, urltext, imageurl, personname, quote, children, ...rest } = props

  // Validate required props
  if (!type || !title) {
    console.warn('ArticleCallout missing required props:', { type, title })
    return null
  }

  // Validate type
  if (!VALID_ARTICLE_CALLOUT_TYPES.includes(type as ArticleCalloutType)) {
    console.warn(`Invalid callout type: ${type}. Valid types:`, VALID_ARTICLE_CALLOUT_TYPES)
    return null
  }

  return (
    <InlineArticleCallout
      type={type as ArticleCalloutType}
      title={title}
      url={url}
      urlText={urltext}
      imageUrl={imageurl}
      personName={personname}
      quote={quote}
    >
      {children}
    </InlineArticleCallout>
  )
}

// Custom table handler for responsive tables
const tableCustom = (props) => {
  const { children, ...rest } = props

  return (
    <Box sx={{
      maxWidth: '100%',
      overflow: 'auto',
      my: 2,
      WebkitOverflowScrolling: 'touch',
    }}>
      <table
        {...rest}
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: 'max-content',
        }}
      >
        {children}
      </table>
    </Box>
  )
}

const ReactMarkdownRules = () => ({
  h1: h1Custom,
  h2: h2Custom,
  h3: h3Custom,
  h4: h4Custom,
  h5: h5Custom,
  h6: h6Custom,
  img: imgCustom,
  a: aCustom,
  p: pCustom,
  pre: preCustom,
  code: codeCustom,
  blockquote: blockquoteCustom,
  iframe: iframeCustom,
  video: videoCustom,
  table: tableCustom,
  recommendationbox: articleCalloutCustom,
})

export default ReactMarkdownRules
