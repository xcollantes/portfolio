---
title: "10x my productivity with AI IDEs"
cardDescription: "My Journey Through Cursor, Replit, and VSCode"
author: Xavier Collantes
dateWritten: 2025-05-01
dateLastUpdated: 2025-08-06
cardPageLink: "/articles/ai-ide"
articleType: BLOG
imagePath: "/assets/images/ai-ide/replit.gif"
tagIds:
  - ai
  - llm
  - ide
---

## Software Development Takes a Long Time

<callout
  type="note"
  description="AI IDEs are changing drastically by the week. Always check the
  latest features and pricing.">
</callout>

Building with LLMs is not just about writing Python scripts anymore. A Software
Engineer or Developer is juggling API keys, managing different model providers,
starting and stopping Docker containers, making sure you do not commit API keys,
and constantly iterating on complex pipelines. The right IDE becomes your
command center.

My needs:

- AI which had context of my codebase
- AI which made diff changes but I still need to review and approve
- Close to what I was using, VSCode

At this point, AI IDEs have matured significantly. But I am always a bit
skeptical...

![AI IDEs](/assets/images/ai-ide/sv.webp)

## The Contenders

### Cursor: VSCode Clone

![Cursor](/assets/images/ai-ide/cursor.webp)

[cursor.com](https://cursor.com/)

Looks just like VSCode, but with AI assistance. You are able to switch between
models like Sonnet, GPT-4o, Gemini, etc. along with their "thinking" variants.

![Cursor chatbox](/assets/images/ai-ide/agent.webp)

**Pros:**

- Native VSCode compatibility with all my existing extensions
- The AI pair programming felt genuinely helpful, not intrusive
- Excellent at understanding context across large codebases; along with random
  snippets of text with "notes"
- AI which made diff changes but I still need to review and approve
- Easily switch between models like Sonnet, GPT-4o, Gemini, etc. along with
  their "thinking" variants
- Add images to help the LLM understand the context; for example, I gave the LLM
  an image of a color palette and it was able to generate a Tailwind CSS class
  based on the color palette
- You can connect MCPs to your project

- **Cons:**

- Background Agent has the same performance as the regular Cursor agent
- Cannot move the Cursor Chat window
- Cursor pricing is not straight-forward and recent changes caused [developer
  discontent](https://www.reddit.com/r/singularity/comments/1ls951k/cursors_recent_pricing_change_was_met_with_strong/)

### Replit: For Non-Coders

![Replit](/assets/images/ai-ide/replit.gif)

[replit.com](https://replit.com/)

I was shocked at how my friend who has no coding experience, was able to create
a web app with a set of prompts. The app has a simple Tailwind UI with simple
password login and user management.

**Pros:**

- Low setup time: from idea to running code in minutes
- Excellent for rapid prototyping
- Hosting was free has fee plan but you need paid to make it worth it
- Hosting and DevOps were an afterthought since Replit took care of hosting and
  deploying
- Built-in NoSQL, SQL, and Redis databases

**Cons:**

- Code generator is proprietary and cannot choose the model
- Limited control over the underlying environment
- Awful for integrating with specific tools and frameworks such as using your
  existing Firestore database
- Though the AI debugged itself, it would sometimes get stuck and having to
  debug it manually was a challenge because it would be the first time looking
  at the source code

### Claude Code: Terminal Lover's Dream

![Claude Code](/assets/images/ai-ide/claude.webp)

[claude.ai/code](https://claude.ai/code)

**Pros:**

- You can run on terminal so great for headless development or if you just
  prefer terminal editors like nano or vim
- Part of Claude's Pro plan so no need to worry about pricing
- Works best if your IDE has a terminal in which case, integrates better with
  your workflow
- You can process images by dragging and dropping them [into the
  terminal](https://docs.anthropic.com/en/docs/claude-code/common-workflows#work-with-images)
- You can connect MCPs to your project
- Customizable `CLAUDE.md` file to set up your project for programming
  conventions, instructions, and how to structure your codebase

**Cons:**

- There is no GUI so you have to use the terminal
- You can have multiple terminals working on the same project but you may have
  to deal with merge conflicts

## My Final Decision

Previously...

> I decided on Cursor.
>
> - ✅ AI which had context of my codebase
> - ✅ AI which made diff changes but I still need to review and approve
> - ✅ Close to what I was using, VSCode

Now...

I switched from Cursor to Claude Code. As I found out more about Claude Code
features such as the `CLAUDE.md` file, ability to pull Github Issues and push
Github PRs, along with fact Claude Code is part of Claude's Pro plan which I
already had, the choice was more clear.

I could still use Cursor or VSCode as an editor but now I can have Claude Code
open in the in-editor terminal.

### Price

Cursor has always had friction and controversy with its pricing model.
Personally, I was not sure when I would hit the token-based limit for my $20 /
month tier plan. In the last month I did hit the limit and started paying at a
variable rate.

With Claude Code, the pricing is more straightforward. You pay $20 / month for
the Pro plan and $20 / month which includes all the features of Claude Code.

<callout
  type="warning"
  description="These prices and tier terms are as of August 2025.">
</callout>

### External Abilities

Claude Code has external abilities which are not available in Cursor.

Both Cursor and Claude Code can interface with MCPs, but Claude Code has a few
more external abilities.

- Pull Github Issues and push Github PRs
- Use command line to run commands while restricting some dangerous commands
  like `rm -rf`

### Per Project Settings

Optionally you can define a file called `CLAUDE.md` and this can contain your
instructions for a project which may have differing coding conventions, variable
naming, file structure, etc.

## Key Takeaways

If you are working solo and value AI assistance, **Claude Code** provides the
best balance of power and usability. The learning curve is minimal if you are
already comfortable with terminal.

<callout
  type="warning"
  description="But as all things in AI... this may all change in the next week or days. I
  suggest buying only a monthly subscription and canceling if you are not happy.">
</callout>

## Looking Forward

The AI IDE space is evolving rapidly. By the time you read this, several of
these tools will likely have new features that change the equation. My advice:

1. **Start with your use case**: Are you prototyping, collaborating, or shipping
   to production?
2. **Consider your team**: What tools do they already know and trust?
3. **Think about lock-in**: How important is vendor independence for your
   project?
4. **Test with real work**: Do not just try the demos and build something you
   actually need.
