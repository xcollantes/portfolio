---
title: "Claude Code Cheatsheet"
author: Xavier Collantes
dateWritten: 2025-08-06
articleType: BLOG
cardDescription: "Quick guide to using Claude Code"
cardPageLink: "/articles/claude-cheatsheet"
imagePath: "/assets/images/claude/claude-code.webp"
tagIds:
  - llm
  - ai
  - claude
  - ai-agent
  - dev-tools
---

![Claude Code logo {priority}](/assets/images/claude/claude-code.webp)

## Download CLI

```bash
npm install -g @anthropic-ai/claude-code
```

Native install:

```bash
# MacOS, Linux
curl -fsSL claude.ai/install.sh | bash

# Windows. I recommend using the Windows Linux Subsystem.
irm https://claude.ai/install.ps1 | iex
```

Running this should start the CLI:

```bash
claude
```

If you run into issues, you can add the following to your `.zshrc` or `.bashrc`:

```bash
# Path may vary depending on your node version.
alias claude='~/.nvm/versions/node/v22.18.0/bin/claude'
```

[Download CLI](https://docs.anthropic.com/en/docs/claude-code/quickstart)

## Basic Commands

[CLI Reference](https://docs.anthropic.com/en/docs/claude-code/cli-reference)

```bash
claude --help
```

## Extended Thinking

Claude LLMs have "thinking" variants which can reason about the codebase and
provide more accurate responses.

In Cursor you would select the "thinking" variant. In Claude Code, you can ask
the LLM to "think" about the codebase with phrases like intensifying phrases
such as “think more”, “think a lot”, “think harder”, or “think longer” triggers
deeper thinking.

## Run Parallel Processes

You can run parallel sessions in the CLI. You can use `git worktree` to create
a new branch and run a parallel session in that branch.

[Run Parallel Processes](https://docs.anthropic.com/en/docs/claude-code/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees)

## Pipe In And Out

```bash
cat app.log | claude -p 'what is the error?' > output.txt
```

## CLAUDE.md

The project or repo level file named `CLAUDE.md` is used to set up your project
for programming conventions, instructions, and how to structure your codebase.

You can run `/init` in the Claude CLI to initialize a `CLAUDE.md` file.

[CLAUDE.md](https://docs.anthropic.com/en/docs/claude-code/common-workflows#claude-md)

- Write most used commands (build, test, lint) to specify which commands to use
  (Pytest vs Unittest, etc.)
- Naming convention such as `snake_case` or `camelCase`
- How the codebase is structured

In the Cladue CLI, use `/memory` to read the memories in the `CLAUDE.md` file.

Here are the templates I use for my projects.

Python:
[Python
CLAUDE.md](https://gist.github.com/xcollantes/de70408d6831fd405e89af13b93fdd02#file-py-claude-md)

Github: [Github CLAUDE.md](https://gist.github.com/xcollantes/de70408d6831fd405e89af13b93fdd02#file-github-claude-md)

## Github Integration

Tell Claude Code to create a PR: "create a pr"

Tell Claude Code to create a branch: "create a branch for the feature..."

Tell Claude Code to create a Github Issue: "create a github issue about the bug..."

[Github Integration](https://docs.anthropic.com/en/docs/claude-code/common-workflows#github)

## Use Claude As Part of Checks

[Use Claude As Verification Process](https://docs.anthropic.com/en/docs/claude-code/common-workflows#add-claude-to-your-verification-process)
