import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Set the appropriate header
  res.setHeader("Content-Type", "application/xml");

  try {
    // Read the static sitemap file from the public directory
    const filePath = path.join(process.cwd(), "public", "sitemap.xml");
    const sitemapContent = fs.readFileSync(filePath, "utf8");

    // Send the sitemap content
    res.status(200).send(sitemapContent);
  } catch (error) {
    console.error("Error serving sitemap:", error);
    res.status(500).send("Error serving sitemap");
  }
}