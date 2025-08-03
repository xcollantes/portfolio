import fs from "fs";
import path from "path";
import { orderedIncludeArticlesConfig } from "../../article_configs/article_order_config";

export default function handler(req, res) {
    // Set the appropriate header
    res.setHeader("Content-Type", "text/xml");

    // Read the sitemap file from the public directory
    try {
        const filePath = path.join(process.cwd(), "public", "sitemap.xml");
        const sitemapContent = fs.readFileSync(filePath, "utf8");

        // Send the sitemap content
        res.status(200).send(sitemapContent);
    } catch (error) {
        console.error("Error serving sitemap:", error);

        // If there's an error, generate a basic sitemap dynamically
        const baseUrl = "https://xaviercollantes.dev";
        const today = new Date().toISOString().split("T")[0];

        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        // Add main pages
        xml += `  <url>\n    <loc>${baseUrl}/</loc>\n    <lastmod>${today}</lastmod>\n    <priority>1.0</priority>\n  </url>\n`;
        xml += `  <url>\n    <loc>${baseUrl}/recs</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.7</priority>\n  </url>\n`;

        // Add article pages
        orderedIncludeArticlesConfig.forEach(articleFile => {
            const articleId = articleFile.replace(/\.md$/, "");
            xml += `  <url>\n    <loc>${baseUrl}/articles/${articleId}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.7</priority>\n  </url>\n`;
        });

        xml += '</urlset>';

        res.status(200).send(xml);
    }
}