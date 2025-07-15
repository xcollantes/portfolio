/** Custom rules for ReactMarkdown converter. */

import { Box, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import articleStyles from "../css/article.module.css"
import imageStyles from "../css/images.module.css"
import CodeSnippet from "./CodeSnippet"
import Gist from "./Gist"
import { extractGistId } from "./GistUtils"

const imgCustom = (imageData) => {
  /** Looking for `![some alt text](/the/image/path.png)` => some alt text */
  const altTextSection = imageData.alt?.match(/^([a-zA-Z ]+)/)
  const altText = altTextSection ? altTextSection[1].trim() : ""

  let fill: boolean = true
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
    height = matchImageHeight[1]

    // Either `width` and `height` are specified OR `fill` is specified; cannot
    // have both.
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
        className={imageStyles.imageItem}
      />
    </Box>
  )
}

const h1Custom = (h1) => {
  return <Typography variant="h1">{h1.children}</Typography>
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
  return <Typography component="p" sx={{ my: 2 }}>{children}</Typography>
}

const ReactMarkdownRules = () => ({
  h1: h1Custom,
  h6: h6Custom,
  img: imgCustom,
  a: aCustom,
  p: pCustom,
  pre: preCustom,
  code: codeCustom,
})

export default ReactMarkdownRules
