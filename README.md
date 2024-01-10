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

## NextAuth

### Secure all pages behind login

Not adding a `config` variable will secure all pages in web application.

**middleware.js**

```js
export { default } from "next-auth/middleware"
```

https://next-auth.js.org/configuration/nextjs#middleware

## Common pitfalls

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
