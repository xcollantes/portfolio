/** Parsing recommendations data for feature use. */

import path from "path"
import YAML from "yaml"
import fs from "fs"
import { RecommendationType } from "./RecommendationType"

export async function getRecommendationData(): Promise<RecommendationType[]> {
  const recommendationsYamlFile: string = path.join(
    process.cwd(),
    "recommendations/recommendations.yaml"
  )

  const fileContents: string = fs.readFileSync(recommendationsYamlFile, "utf8")
  return YAML.parse(fileContents)
}
