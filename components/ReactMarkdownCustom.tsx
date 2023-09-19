/** Custom rules for ReactMarkdown converter. */

import Image from "next/image"
import imageStyles from "../css/images.module.css"
import { Box } from "@mui/material"

const imgCustom = (imageData) => {
  /** Looking for `![some alt text](/the/image/path.png)` => some alt text */
  const altTextSection = imageData.alt?.match(/^([a-zA-Z ]+)/)
  const altText = altTextSection ? altTextSection[1].trim() : ""

  /** Looking for `![some alt text {500x250}](/the/image/path.png)` => {500x250} */
  // const size = imageData.alt?.match(/\{(\d+)x(\d+)\}/)
  // const width = size ? size[1] : "400"
  // const height = size ? size[2] : "250"

  /** Looking for `![some alt text {priority}](/the/image/path.png)` => {priority} */
  let isPriority = false
  const matchPriority = imageData.alt?.match(/(\{priority\})/)

  if (matchPriority) {
    isPriority = matchPriority[0] == "{priority}"
  }

  console.log(imageData)
  console.log(matchPriority)
  console.log(isPriority)

  return (
    <Box component={"span"} className={imageStyles.imageContainer}>
      <Image
        src={imageData.src}
        alt={altText}
        blurDataURL="https://davisgitonga.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner.749d546a.jpg"
        fill
        // width={200}
        // height={500}
        priority={isPriority}
        placeholder="blur"
        className={imageStyles.imageItem}
      />
    </Box>
  )
}

const ReactMarkdownRules = () => ({
  img: imgCustom,
})

export default ReactMarkdownRules
