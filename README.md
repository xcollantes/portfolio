Xavier's personal portfolio of work.

![](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge)
![](https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=ts-node&logoColor=white)
![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)

## Getting started with deploying

1. Get variables for `.env.production.examples`
1. Depending on how you're deploying (on a server or a service), you may not use
   the `.env.production` file but in any case you'll need the tokens, variables,
   and IDs.

## Getting environment variables from Vercel

You can download a file with all the environment variables from Vercel for local
development. In the Vercel account, the env vars marked with `Development` will
be used when pulling with this method.

1. Download the Vercel CLI: `npm i -g vercel`
1. Authenticate and link project: `vercel link`
1. Download env vars file: `vercel env pull <download_filename>`

## Adding a new article

### Page registering

1. Create a Markdown file under `pages/articles/`. This path will be used in
   the URL of the article page without `pages/` and the `.md` extension.

   - Use all lowercase
   - Use hyphens and not underscores

1. Add a YAML metadata section to the top of the Markdown file. See
   `article_configs/process_articles.ts` under `MetadataType` for fields
   required and available.

1. The `title` field is the header of the entire article.
1. Make sure the `cardPageLink` field is the path to the article found in the
   repository without the `pages/` directory.

1. The `tagsId` field can be specified a list `tagIds: [tag1, tag2]` or
   button list:

   ```yaml
   tagIds:
     - tag1
     - tag2
   ```

### Article order and enabling articles

**IMPORTANT:** To make an article accessible through the URL and in general, you
have to explicitly include the filename with the extension in
`article_configs/article_order_config.ts`.

### Registering filter

1. Check the `article_configs/filters_config.ts` file to make sure your desired
   filters are included and labeled properly. These are the filter options a
   user can filter preview cards by. **The tag MUST match exactly the `tagIds`
   in the Markdown file to be included in a filter.**

### Article content

Write your Markdown article. At build time, the Markdown file will be
converted to HTML with styles applied.

#### Images

Use the Markdown for H6 as caption for photos. Example: `###### My caption`.

Images will fill the width of the article container. Specify the height of the
image to make the image smaller than the container. Only specify the height as
the image will maintain ratio when height is specified.

```markdown
![{h: 200}](my/article/image.webp)
```

If the image is above the fold when the article first renders, you can assign a
priority load flag the same way you would use
`[priority](https://nextjs.org/docs/pages/api-reference/components/image#priority)`
in NextJS or ReactJS:

```markdown
![{priority}](my/article/image.webp)
```

Compress images.

Favor WEBP format for quality and compression.

#### Embedded content

Use this snippet for making `iframe` responsive and replace the src:

```html
<div
  style="padding-bottom:56.25%; position:relative; display:block; width: 100%"
>
  <iframe
    width="100%"
    height="100%"
    src="https://youtu.be/j5a0jTc9S10?si=eGX-bRyQGBp4cAed"
    frameborder="0"
    allowfullscreen=""
    style="position:absolute; top:0; left: 0"
  >
  </iframe>
</div>
```

NOTE: For best results from YouTube, use
`https://www.youtube-nocookie.com/embed/27kAuEFGduI?si=rYG3QUug9_FN5nEO&start=5`
with `nocookie` if using the `start=` parameter.

To make embedded content such as HTML rendered, we use `rehypeRaw` plugin for
ReactMarkdown [more info](https://stackoverflow.com/a/70548866/8278075).

#### GitHub Gists

The portfolio supports automatic GitHub gist embedding. Simply paste a gist URL in your markdown:

```markdown
Here's a useful utility function:

https://gist.github.com/xcollantes/abc123def456789

This function helps with data processing.
```

Or use markdown link syntax:

```markdown
Check out this [React hook example](https://gist.github.com/xcollantes/abc123def456789).
```

The system automatically:

- Fetches live content from GitHub's API
- Shows author information and gist metadata
- Supports multi-file gists with tabbed interface
- Inherits your existing CodeSnippet styling and dark mode
- Provides syntax highlighting and copy functionality

For more details, see `docs/gist-usage.md`.

## Article access control and exceptions

By default, all articles require human verification and are not indexed by
search engines. This protects sensitive or personal content from public access.
However, certain articles can be configured as exceptions to bypass these
restrictions and become fully public.

### When to make articles public

Only add articles to the exception list if they meet **ALL** of the following criteria:

✅ **Safe for exceptions:**

- Portfolio pieces showcasing professional work
- Educational tutorials and technical guides
- Public-facing work experiences and achievements
- Blog posts intended for broader audience reach

❌ **Do NOT make public:**

- Personal stories or experiences
- Content with sensitive company information
- Experimental or draft content
- Content meant only for specific individuals

### Adding article exceptions

**Important:** Exception articles bypass ALL access controls and become fully
public. Search engines will index and cache the content permanently.

1. **Review criteria:** Ensure your article meets all exception criteria above
2. **Edit config:** Add entry to `articleExceptions` object in `article_configs/article_exceptions_config.ts`
3. **Configure settings:**

   ```typescript
   "your-article.md": {
     bypassVerification: true,        // Skip human verification
     allowSearchIndexing: true,       // Allow search engine indexing
     reason: "Clear explanation of why this should be public"
   }
   ```

4. **Test accessibility:** Verify the article works in development
5. **Monitor indexing:** Check search engine indexing after deployment

### Security considerations

- Exception articles become permanently public and searchable
- Content will appear in search results and social media previews
- Consider data privacy implications before adding exceptions
- Review the detailed security guidelines in `article_configs/article_exceptions_config.ts`

## Adding new recommendation

You can add recommendations to boost credibility and give insight to your
quality of work.

Tend to use LinkedIn Recommendations since recommendation givers can be verified.

1. Copy and paste recommendation and relevant data in
   `recommendations/ordered_recommendations.yaml`. List is ordered.
1. See `recommendations/RecommendationType.ts` for fields.
1. Download the profile picture from LinkedIn of the recommendation giver and
   upload to `public/recommendations/profile_pics/`. Be sure to specify the
   picture in the ordered_recommendations.yaml.

## NextAuth

### Secure all pages behind login

Not adding a `config` variable will secure all pages in web application.

**middleware.js**

```js
export { default } from "next-auth/middleware"
```

https://next-auth.js.org/configuration/nextjs#middleware

### Enable or disable 3rd party OAuth user requirement

Change the following variables.

- In the `env` file, set `NEXT_PUBLIC_AUTH_USERS` to `true` to block elements if
  user is not authenticated.
- In `middleware.ts`, choose the pattern to block if user is not authenticated.

NOTE: Since NextJS forbids variables and conditional statements in middleware.ts
just comment out the unused option.

## Common pitfalls

### ENV arg is always true

Adding boolean values in `.env` files will return as true every time. Process
the string to match "true" or "false".

`NEXT_PUBLIC_CAPTCHA=false` for example will always return true if evaluated
since the value is a type string.

### Use `secrets` for Next Auth

Specify a `NEXTAUTH_SECRET=` in the ENV file which is required for productions:
https://next-auth.js.org/configuration/options#secret

### State not created in error from OAuth

Check to make sure the ENV vars are formatted correctly.

### Origin error when accessing the web application

Must match what you entered with OAuth provider `NEXTAUTH_URL=`.

### Add URL for branch and production to OAuth for provider

There are multiple places in the OAuth provider where you may need to specify
the URLs for the OAuth to recognize the call from the application backend.
