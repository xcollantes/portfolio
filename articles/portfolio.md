---
title: NextJS Portfolio Web Application
author: Xavier Collantes
dateWritten: 2024-01-24
cardDescription: Evaluate technical trade-offs and code the website you're looking at.
cardPageLink: "/articles/portfolio"
imagePath: "/assets/images/portfolio/markdown.webp"
articleType: WORKEXP
tagIds:
  [
    "typescript",
    "frontend",
    "javascript",
    "react",
    "ux",
    "ui",
    "webdev",
    "design",
    "nextjs",
    "vercel",
  ]
---

I provide an in-depth insight into the development of my personal portfolio
website, xaviercollantes.dev. Serving in the roles of Software Engineer, Project
Manager, and UX designer, I share my journey from planning to execution,
highlighting the technical trade-offs and decisions made during the process.

![Image of Figma dashboard](/assets/images/portfolio/figma.webp)

Github repository:
[github.com/xcollantes/portfolio](github.com/xcollantes/portfolio)

## Planning

The motivation for creating a portfolio website is driven by the need to show
context of the diversity of interests and technical ability I have accumulated
over the last 8+ years professionally and personally.

### Collection of requirements through Critical User Journeys

Collect [Critical User
Journeys](https://www.reforge.com/blog/brief-critical-user-journeys-how-google-product-teams-react-when-growth-slows)
from the following groups in my personal network:

- Senior Software Engineer Manager
- Peer level Software Engineer
- Non-technical Program Manager
- Technical recruiter
- Non-technical recruiter

The goal was to understand what these people looked for when doing their jobs
and build a solution around that process. When constructing a solution, there is
always a person who should benefit; in this case, I aim to make the jobs easier
for Hiring Managers and Recruiters to find the information they need. At Google,
we would call this "reducing toil" ([Google SRE
Handbook](https://sre.google/workbook/eliminating-toil)).

Collection of requirements is a skill I was able to sharpen at Google.

_As an employer..._

- I need to see the core qualifications of a candidate
- I need to see proof the prior work of a candidate is analogous to the work I'm
  looking to fill

_As a developer..._

- I need to easily deploy new releases
- I need to view development deployments before releasing to production
- I need to spend $0 per year on hosting with 50 daily users
- I should be able to add new articles in 15 minutes (overhead for new articles
  not counting time to write article)

### Defining success metrics

In a project, there must be a point where we can determine success. This must be
measurable outcomes linked to the business case. The user determines these
outcomes through user interviews and testing throughout the development process.

1. User can find detailed context on a past work or project in less than 30
   seconds from first click on `xaviercollantes.dev`
1. Google Lighthouse metrics must be 95+ for Accessibility, Performance, SEO
1. Exercise modern UX and UI practices
1. Add new articles in 30 minutes (not counting time to write new articles)

## Testing strategy

### Speed and tech efficiency

I employed tools like [Google
Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)
and Chrome Browser DevTools to ensure optimal speed and technical efficiency.

![Image of Lighthouse](/assets/images/portfolio/lighthouse.webp)

### User satisfaction

1.  Gather people I personally know who are in the target demographic and send
    them a link on desktop and mobile. The mix of people should represent
    technical and non-technical since the site content and wording should give
    both groups a sense of impact and depth in the projects. The Senior members
    of this test group should have experience hiring reports.

    - Senior Software Engineer Manager
    - Peer level Software Engineer
    - Non-technical Program Manager
    - Technical recruiter
    - Non-technical recruiter
    - Someone's parent who knows nothing of the tech industry (if this person
      can get a general idea of what Xavier does, then the message is proven to
      be clear)

    **NOTE:** Notice this list is the same as the group from the Critical User
    Journeys from the beginning of the process. If you are building for a group
    of people, the same people should be the decision makers on the quality of
    the solution.

1.  Ask:
    - How fast did you find detailed information on a project?
    - Is the text easy to read?
    - Are you able to understand in under 30 seconds the article's general gist?
    - If you did not know this person, do you understand his capabilities?
    - How does this profile rank with candidates you have seen in the past?
    - Any other feedback?

## Design decisions

### Inspirations

To get inspiration for ideas for a "modern and intuitive" web application
design, I looked up existing portfolios to see how other Software Engineers
designed and organized the sections of their site.

- <https://brittanychiang.com>

  - Classic layout with name and position on first load above the fold
  - Color scheme of blues and greens is common in the tech industry
  - Color scheme is reminiscent of my favorite VScode theme, [Solarized
    Dark](https://ethanschoonover.com/solarized)
  - UPDATE: Brittany has updated her website to the same format as
    https://www.sarahdayan.dev; when I started my site, Brittany's site had a
    full page scroll

- <https://www.sarahdayan.dev>

  - Scrolling right-hand side with stationary left-hand side is a clean layout
  - Color scheme is dark and simple: black and white
  - Good use of open space
  - Cards on the right-hand side are varying in size and delimitates sections
    well with the bolding of current section in a sort of "table of contents"

- <https://jhooq.com>

  - Screams "developers, developers, developers!"
  - Follows Material Design with app bar and similar "floating cards"
  - Color scheme is exactly Solarized Dark
  - Not a portfolio site; meant for blogs

### Mock ups

![Image of Figma dashboard](/assets/images/portfolio/figma.webp)

Based on inspiration from other Engineer's portfolios and about 25 other
instances I found, I began a rough Figma diagram of what I wanted the site to
look like.

Then after mockups, I would apply guidelines in [Material
Design](https://m2.material.io/design/layout/applying-density.html#usage). My
design decisions took greatly from [Material Design's Color
system](https://m2.material.io/design/color/the-color-system.html#color-usage-and-palettes)
which was made accessible in the [MaterialUI](https://mui.com) package for NPM.

Upon my research, I learned more abstract approaches design such as using
[Fibonacci
Sequences](https://3.7designs.co/blog/how-to-design-using-the-fibonacci-sequence)
to space modules on a page.

## Technical decisions

Finally! The technical parts!

### Components

To achieve the goal of building with "modern UX and UI practices", I decided on
using Material UI as the design library given its ease of importing components
in React NextJS. I have extensive experience in using React and I was satisfied
with performance of NextJS and React. Code written in React and NextJS to be
little in boilerplate and easily readable.

Other options considered:

- Google Material Design: Original source for design I wanted; too many steps
  and took too long to [integrate with
  NextJS](https://m2.material.io/develop/web/guides/framework-integration). Too
  much boilerplate code.
- Bootstrap: I had prior experience but I didn't like the visual design compared
  to Material UI.
- TailwindCSS: Lots of docs on NextJS integration but I wanted a way a more
  compatible library for React.

### Ease of use for the developer (me)

![Image of Obiwan Kenobi {h: 300}](/assets/images/portfolio/obiwan.webp)

###### My relationship with the developer

My goal as a developer is to leave my web application alone for months and years
at a time and quickly make changes when I return to add articles or fix bugs. I
achieve this by:

- Extremely detailed documentation for my future self with step-by-step process
- Well-written code not requiring constant updates
- High-readability and comments for when needed to make fixes

I employ the `remark` NPM package which converts my Markdown notes into Material
UI components at build time.

![Image of writing article {h: 600}](/assets/images/portfolio/markdown.webp)

Each article is written in a Markdown with a YAML header which contains metadata
for tags for the front page's filters, title, author, written date, and
description.

[See
code](https://github.com/xcollantes/portfolio/blob/ee57cd5ef2724827cb3f4ac0e146caf94d4985e4/article_configs/process_articles.ts)

The `remark` package for parsing the articles contents and the `gray-matter`
package for parsing the YAML header for metadata for each articles lacks a
feature I needed for each article rendering. There is a lack of control of the
image tag. So I needed to define a parsable Markdown syntax which translates
into attributes for the Material UI's Typography component.

So a Markdown tag in notes would be:

```markdown
![Image of Obiwan Kenobi {priority} {h: 300}](/assets/images/portfolio/obiwan.webp)
```

Translates into:

```js
<Image
  priority={true}
  height={300}
  src={"/assets/images/portfolio/obiwan.webp"}
  alt={"Image of Obiwan Kenobi"}
/>
```

[See full
code](https://github.com/xcollantes/portfolio/blob/ee57cd5ef2724827cb3f4ac0e146caf94d4985e4/components/ReactMarkdownCustom.tsx#L9)

### Asset optimization

Each image in the web application has been optimized by compressing the image
and converting to the webp format which on average reduces image size by ~70%.

This will benefit the user experience by faster loading images and smaller
caches.

[github.com/xcollantes/image-reducer](https://github.com/xcollantes/image-reducer)

### Auth

Privacy is a personal concern and I'd like to impede OSINT efforts against me.
Adverting a personal portfolio is the complete anthesis of the previous sentence
but I believe a balance can be achieved.

**OAuth2:** At first I created an OAuth2 interface where the user is required to
create an account with their Google, LinkedIn, or GitHub account. This proved
too much friction for users since most users are not willing to create another
account.

**CAPTCHA:** I created a proof of concept for implementing a Google CAPTCHA
challenge to at least prevent search engines from indexing my images and
content. But this proved to be too extensive as the code required for NextJS was
cumbersome and the experience for users would be impeded in the same way as
OAuth2 where users would add to the 30 seconds maximum time to get information.

**Homemade CAPTCHA and robots.txt:** A more maintainable solution would be
adding a robots.txt file which would forbid the indexing of my web app in
conjunction with a CAPTCHA but simple enough that a bot could be stopped.

### Hosting

Vercel is natural choice since Vercel also created NextJS. The decision to host
a NextJS application is hard because NextJS has middleware which cannot run as a
static web page. For example, you would need to build a section of the NextJS
code separately if you were hosting on Linux server: one for the web pages and
another for the middleware.

This middleware is responsible for routing and caching which adds more control
for the developer when setting up the web application.

Vercel features:

- Automatic creation of deployments for each branch
- Fast rollback option
- For for one project
- ENV variables tracked in hosted platform for development and production
  deployments
- Development deployments have a Google Docs-like editor where you can leave
  comments directly on features

![Image of Vercel editor](/assets/images/portfolio/vercel.webp)

Other options considered:

- Firebase Hosting:
  - Prior experience in Firebase tools
  - Requires more developer time to maintain; Vercel is more managed
- Google Cloud AppEngine:
  - Requires payment even at small user traffic
- Google Cloud Compute instance:
  - Cheapest options if traffic exceeds about 1,000 daily users I never expect
    to have more than 50 daily users
  - Need to setup release pipeline in Cloud Build and Artifact Registry
  - NextJS required Cloud Run instances to run middleware
  - Need to keep track of multiple instances for development testing

## Easter eggs

Thank you reading this far. You will now be rewarded with the secrets of my
portfolio.

In classic Googler fashion such as [_do a barrel
role_](https://www.google.com/search?q=do+a+barrel+roll) and [_google in
1998_](https://www.google.com/search?q=google+in+1998), I have created some
easter eggs of my own.

![Image of hackerman meme](/assets/images/portfolio/hackerman.webp)

### Hello Hackerman

1. Open Chrome Console by pressing `F12` on `ctrl + shift + i`.
1. Click on `Console`.

You will see the messages

### The Dark Side

1. Open Chrome Console by pressing `F12` on `ctrl + shift + i`.
1. Flip the switch on the page and see which side you switch to.
   - You might need to open the menu on the top of articles

### 404 Pulp Fiction

Visit a non-existent page such as
<https://xaviercollantes.dev/non-existing-page>.

### 500 Office Space

Visit server error page such at <https://xaviercollantes.dev/500>.

## Conclusion

My personal portfolio reflects a comprehensive software design lifecycle. The
journey involved meticulous planning, user-centric testing, design inspiration,
and technical decision-making. The resulting NextJS portfolio web application
not only serves its purpose but also showcases my commitment to excellence in
software engineering and user-centric design. The inclusion of easter eggs adds
a personal and engaging touch to enhance the overall user experience.
