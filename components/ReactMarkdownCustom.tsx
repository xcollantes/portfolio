/** Custom rules for ReactMarkdown converter. */

import Image from "next/image"
import imageStyles from "../css/images.module.css"
import blogStyles from "../css/blog.module.css"
import { Box, Typography } from "@mui/material"
import Link from "next/link"

const imgCustom = (imageData) => {
  /** Looking for `![some alt text](/the/image/path.png)` => some alt text */
  const altTextSection = imageData.alt?.match(/^([a-zA-Z ]+)/)
  const altText = altTextSection ? altTextSection[1].trim() : ""

  /** Looking for `![some alt text {500x250}](/the/image/path.png)` => {500x250} */
  // const size = imageData.alt?.match(/\{(\d+)x(\d+)\}/)
  // const width = size ? size[1] : "100%"
  // const height = size ? size[2] : "250"

  /** Looking for `![some alt text {priority}](/the/image/path.png)` => {priority} */
  let isPriority: boolean = false
  const matchPriority = imageData.alt?.match(/(\{priority\})/)

  if (matchPriority) {
    isPriority = matchPriority[0] == "{priority}"
  }

  return (
    <Box component={"span"} className={imageStyles.imageContainer}>
      <Image
        src={imageData.src}
        alt={altText}
        blurDataURL="https://davisgitonga.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner.749d546a.jpg"
        fill
        // width={width}
        // height={height}
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
  return (
    <Link href={a.href} passHref className={blogStyles.linkText}>
      {a.children}
    </Link>
  )
}

const ReactMarkdownRules = () => ({
  h1: h1Custom,
  h6: h6Custom,
  img: imgCustom,
  a: aCustom,
})

export default ReactMarkdownRules
