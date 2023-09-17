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

## Adding a new article

1. Create a Markdown file under `blogs/`. This will be the path used in the URL
   of the article page without the `.md` extension.

   - Use all lowercase
   - Use hyphens and not underscores

1. Add a YAML metadata section to the top of the Markdown file. See
   `portfolio/blog_utils/process_blogs.ts` under `MetadataType` for fields
   required and available.

   The `tagsId` field can be specified a list `tagIds: [tag1, tag2]` or
   button list:

   ```yaml
   tagIds:
     - tag1
     - tag2
   ```

1. Check the `blog_utils/filters.ts` file to make sure your desired filters
   are included and labeled properly. These are the filter options a user can
   filter preview cards by. **The tag MUST match exactly the `tagIds` in the
   Markdown file to be included in a filter.**

1. Write your Markdown article. At build time, the Markdown file will be
   converted to HTML with styles applied.

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
