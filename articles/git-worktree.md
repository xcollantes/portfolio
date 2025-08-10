---
title: "Git Worktrees + Claude Code: 5x Yourself as a Developer"
cardDescription: "Guide to cloning yourself as a developer with AI."
author: Xavier Collantes
dateWritten: 2025-08-09
cardPageLink: "/articles/git-worktree"
articleType: BLOG
imagePath: "/assets/images/git-tree/army.gif"
tagIds:
  - git
  - devtools
  - cli
  - developer-tools
  - ai
  - llm
  - claude
  - code
  - productivity
  - git-tree
---

[![Git + Claude {priority}](/assets/images/git-tree/git-claude.webp)](https://www.geeky-gadgets.com/claude-code-github-say-goodbye-to-tedious-code-reviews/)

As we explored in my previous article on [AI IDEs](/articles/ai-ide), we touched
on Claude Code, one of the most powerful AI IDEs available at the time of
writing.

Now I will guide you through turning yourself from a solo developer to a team of
Software Engineers with Claude Code and Git.

## The Power of Parallel Development

![Spiderman](/assets/images/git-tree/spoderman.webp)

Traditional development follows a linear path: finish one feature, then start
the next. But what if you could work on multiple features simultaneously while
maintaining clean, organized code?

Claude Code + Git branching creates a superpower:

- **Multiple feature branches:** Work on different features at the same time.
- **AI assistance:** Each workflow is like having a Software Engineer. You are
  now the Software Engineer Manager.
- **Clean environments:** Each workflow is separate from the others.
- **Shift in work:** You do not get rid of context switching altogether. Instead,
  you review the code written by each AI agent, in effect, making you a reviewer
  instead of coder.

## Old "Parallel" Workflow

From my experience, the old quasi-parallel workflow was like this:

1. If you have any changes: `git stash`
2. Sync main with any changes: `git pull origin main`
3. Create new branch from main: `git checkout -b feature/new main`
4. Make changes to the new branch.
5. Add and commit changes: `git add . && git commit -m "Feature: add new feature"`
6. Push branch: `git push origin feature/new`
7. Create a PR: `gh pr create --base main --head feature/new`

> What if I told you that Claude Code can do all of this for you?

## What Are Git Worktrees?

[![Git Tree](/assets/images/git-tree/worktree.webp)](https://www.gitkraken.com/learn/git/git-worktree)

###### [GitKraken.com](https://www.gitkraken.com/learn/git/git-worktree)

Git Worktrees are a way to create a new branch of your repository that is a copy of
your main branch but instead of switching branches, you work in parallel directories.

_Why use Git Worktrees and not just re-clone the repository?_

Git Worktrees have the following benefits over re-cloning in a new directory.
Worktrees are spawned from the main repository, so they all share the same
`.git`. Changes made in one worktree will not affect others, preventing Claude
instances from interfering with each other.

- Make a commit in any worktree and it is immediately visible to parent: No need
  for pulling and pushing
- Saves space since only changed files are duplicated
- No accidental working on the same branch which could result in merge conflicts
- You can clean up the worktrees when you are done with them

## What Is Claude Code Doing?

We will use Claude Code's command line abilities to do the following:

- Interact with your local git and Github commands
- Write code for you
- Debug code for you
- Create branches and PRs with appropriate documentation

NOTE: Technically, any LLM-based AI IDE with terminal support can do this. But I
have chosen Claude Code because you can define per-project prompts and from my
experience, Claude will closely follow the prompts you give it.

## Your New Workflow

1. Create a new branch and worktree from main.
2. Tell Claude to write code for you. You can also refer to an existing Github
   Issue or Pull Request (PR) to help you write the code.
3. Tell Claude to create a PR with complete documentation and testing
   procedures.

### 0. Setup Project Or Profile CLAUDE.md (Optional)

Install Claude Code: [Claude Code Setup](https://docs.anthropic.com/en/docs/claude-code/setup)

Create a file called CLAUDE.md, which is read by Claude and contains
instructions and conventions about the project. This file or files can
contain everything from coding conventions, testing procedures, Git/Github
behavior, docstring styles, modularity, whether it should ask first for certain
actions, etc.

#### Hierarchy

1. `~/.claude/CLAUDE.md` (global preferences)
2. `project-root/CLAUDE.md` (project-specific)
3. `project-root/subdir/CLAUDE.md` (module-specific)

#### Multiple Global Memory Files

Primary file:

- `~/.claude/CLAUDE.md`

Additional files:

- `~/.claude/CLAUDE.coding-standards.md`
- `~/.claude/CLAUDE.python-preferences.md`
- `~/.claude/CLAUDE.javascript-preferences.md`
- `~/.claude/CLAUDE.project-templates.md`

https://gist.github.com/xcollantes/babad8945ac225c257ee1177c5448d93

Claude docs on CLAUDE.md: [anthropic.com](https://www.anthropic.com/engineering/claude-code-best-practices)

### 1. Create New Worktrees from Main

Our example will create two features based on the specifications in Github
Issues:

Add darkmode: [issues/128](https://github.com/xcollantes/portfolio/issues/128)

![Dark Mode Issue](/assets/images/git-tree/dark-issue.webp)

Add memepage: [issues/129](https://github.com/xcollantes/portfolio/issues/129)

![Meme Page Issue](/assets/images/git-tree/meme-issue.webp)

The final structure of the repository will look like this:

```txt
/Documents/
├── my-repo/
│   ├── .git/
│   ├── src/
│   └── README.md
│
├── my-repo-darkmode/
│   ├── .git/
│   ├── src/
│   └── README.md
│
├── my-repo-memepage/
    ├── .git/
    ├── src/
    └── README.md
```

Pull the latest changes from the main branch and create a new worktree command
for each feature. This will create a new worktree and branch for each feature.

```bash
# pwd: /Documents/my-repo

# Update branch main.
git checkout main
git pull origin main

# Create a new worktree for darkmode branch.
#    `my-repo-darkmode` is a new directory that is a copy of the main repository.
#    `darkmode` is the name of the branch in the new worktree. The directory will be created if it doesn't exist.
#    `main` is the branch to start from.
git worktree add ../my-repo-darkmode -b darkmode main

# Create a new worktree for memepage branch.
git worktree add ../my-repo-memepage -b memepage main
```

### 2. Tell Claude What To Build

You can open a `claude` session in each directory and trigger the AI to build.

Now we will open a terminal or IDE such as VSCode in each worktree directory.

For `my-repo-darkmode`:

```bash
# pwd: /Documents/my-repo-darkmode

code .  # For VSCode.

# Should already be in darkmode branch.
git checkout darkmode

# ENV and install dependencies.
# Depending on the language, you will need to install dependencies as the worktree
# does not copy the .env file or the node_modules directory.

#npm install  # For Node.js projects.
#env/bin/pip install -r requirements.txt  # For Python projects.

# Prompt Claude to create a new feature.
# Open session.
claude
# OR trigger with prompt right away.
claude "Create a dark mode feature for the website. Use the darkmode.css file to style the website.
When you are done, create a PR with complete documentation and testing procedures."

```

For `my-repo-memepage`:

```bash
# pwd: /Documents/my-repo-memepage

code .  # For VSCode.

# Should already be in memepage branch.
git checkout memepage

# ENV and install dependencies.
# Depending on the language, you will need to install dependencies as the worktree
# does not copy the .env file or the node_modules directory.

#npm install  # For Node.js projects.
#env/bin/pip install -r requirements.txt  # For Python projects.

# Prompt Claude to create a new feature.
claude
# OR trigger with prompt right away.
claude "Create a new feature for the meme page. This is a new page which
displays random memes when you click on a button.
Use the API at https://github.com/D3vd/Meme_Api. Make sure to look at the API response
structure in the README.md file and handle the data accordingly.
When you are done, create a PR with complete documentation and testing procedures."
```

### 3. Prompt Engineering

You may need to switch back-and-forth between the two worktrees to see if the
prompt [REPL](https://www.google.com/search?q=repl+meaning) is asking for the
next step. Claude Code tends to make changes incrementally and may ask you to
review the code before making the changes unless you have Accept-Edits enabled.

![Accept-Edits](/assets/images/git-tree/accept-edits.webp)

Personally, I tend to be permissive at this step. I will review the code and
make changes as needed at code review time.

You can always review the PR and go back to the worktree to make changes.

The downside of this process is the nature of LLMs can be inconsistent. So you
may need to coach Claude to do the right thing.

Some additional prompts I (sometimes) had to use after running the example
above:

- "ignore lint errors"
- "dark mode should be applied to the entire website"
- "create PR"

### 4. Review PRs

In the prompt I mentioned to create a PR with complete documentation and testing
procedures.

![Create PR](/assets/images/git-tree/create-pr.webp)

Now we will review the code and create a PR.

[![Darkmode PR](/assets/images/git-tree/dark-pr.webp)](https://github.com/xcollantes/portfolio/pull/130)

[![Memepage PR](/assets/images/git-tree/meme-pr.webp)](https://github.com/xcollantes/portfolio/pull/131)

From here, you can review the PRs and merge them into the main branch or go back
to the worktree to make changes.

## Deriving Actual Value From AI

Personally, this has been a game changer for me. I have turned myself into a
small team of Software Engineers. A fix or feature which may have taken me a day
or two to complete now takes me a two or three hours.

The process is far from perfect and Claude Code has its bugs but as tools
improve, so will the process.

With the power of Claude Code, this process can spiral out of control when
unchecked. Keep the following lessons I have learned in mind:

- Let Claude do the work but micromanage when needed such as entering specific
  prompts.
- As long as you can use `git` and `gh` in terminal, so can Claude Code. Feel
  free to reference Github Issues and PRs to help Claude Code do the right
  thing.
- Claude Code can see the internet so feel free to reference external resources.
- If this is your first time using an LLM-based AI IDE, this will be a super
  awkward experience but over time, you will get the hang of it.

![Obiwan at Kamino](/assets/images/git-tree/magnificent.gif)

![The Grand Army of the Republic](/assets/images/git-tree/army.gif)

Claude Code + Git branching transforms you from a single-threaded developer
into a parallel processing powerhouse. It is like you have a clone army of
yourself.

## Common Pitfalls

**Claude not able to find dependencies; "Module not found", etc.**

Remember to install dependencies in the worktree, as it is similar to cloning to
a new repository in that respect where the `.env` file, `node_modules`, and any
other dependencies are not copied over.

**Port 3001 is in use, trying 3002 instead.**

In Node, you may already have a server running on port 3001. This will happen
due to the parallel nature of the worktrees. Usually Claude is smart enough to
find the next available port.

## Further Reading

[anthropic.com: Run Parallel Sessions with Git Worktrees](https://docs.anthropic.com/en/docs/claude-code/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees)

[anthropic.com: Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)

[medium.com: Claude Code for Parallel Development Workflow](https://medium.com/@dtunai/mastering-git-worktrees-with-claude-code-for-parallel-development-workflow-41dc91e645fe)

[gitkraken.com: Git Worktree](https://www.gitkraken.com/learn/git/git-worktree)
