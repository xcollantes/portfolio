---
title: "10x my productivity with AI IDEs"
cardDescription: "My Journey Through Cursor, Replit, and VSCode"
author: Xavier Collantes
dateWritten: 2025-05-01
dateLastUpdated: 2025-07-30
cardPageLink: "/articles/ai-ide"
articleType: BLOG
imagePath: "/assets/images/ai-ide/replit.gif"
tagIds:
  - ai
  - llm
  - ide
---

## Software Development Takes a Long Time

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

**Cons:**

- There is no GUI so you have to use the terminal
- You can have multiple terminals working on the same project but you may have
  to deal with merge conflicts

## My Final Decision

I decided on Cursor.

- ✅ AI which had context of my codebase
- ✅ AI which made diff changes but I still need to review and approve
- ✅ Close to what I was using, VSCode

Cursor made some updates to their unclear pricing model which mitigated my
reservations on their Byzantine pricing model.

## Key Takeaways

If you are working solo and value AI assistance, **Cursor** provides the best
balance of power and usability. The learning curve is minimal if you are already
comfortable with VSCode.

> But as all things in AI... this may all change in the next week or days. I
> suggest buying only a monthly subscription and canceling if you are not happy.

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
