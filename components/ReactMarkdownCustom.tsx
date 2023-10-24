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
