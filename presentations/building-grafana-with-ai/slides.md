---
theme: seriph
background: https://cover.sli.dev
title: "Building Grafana with AI: What Actually Works"
mdc: true
routerMode: hash
transition: slide-left
drawings:
  persist: false
---

# Building Grafana with AI
## What Actually Works

Hayden Kotelman · Staff Engineer @ Grafana

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/hay-kot" target="_blank"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---
---

# About Me

- Senior Engineer @ Grafana Labs (Adaptive Telemetry, Adaptive Logs)
- Built: Mealie, Recipinned, Hive, Scaffold, and a bunch of other stuff
- Obsessed with AI code generation for the past ~year
- GitHub: [hay-kot](https://github.com/hay-kot)

---
layout: center
class: text-center
---

# I Hate AI

<!--
- Don't like AI-generated art
- Companies skirting fair use because they have money
- Don't have a choice. AI initiatives are here, directive is to use them
- Mortgage to pay, job to do, this is just the way it is
-->

---
layout: center
class: text-center
---

# I Wish Things Were Different

---
layout: section
---

# Setting the Stage

---
layout: center
class: text-center
---

# What We Had Access To

<v-click>

*Codex, Claude, Cursor, any tool available. Put in a request, go through security review, you can probably get it. The directive: explore.*

</v-click>

<!--
- First six months: soft encouragement, explore freely
- Last six months: hard push, explicit directive
-->

---
layout: default
---

# Where Most of Us Started

<div class="mt-10 flex items-start relative">

  <div class="absolute top-6 left-6 right-6 h-px bg-gray-400 opacity-30" />

  <v-clicks>

  <div class="flex-1 flex flex-col items-center relative z-10 px-3">
    <div class="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4">1</div>
    <div class="font-semibold text-sm text-center mb-2">Browser Chats</div>
    <div class="text-xs text-center opacity-60">In-browser AI, copy-pasting<br>responses into the terminal</div>
  </div>

  <div class="flex-1 flex flex-col items-center relative z-10 px-3">
    <div class="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4">2</div>
    <div class="font-semibold text-sm text-center mb-2">Cursor</div>
    <div class="text-xs text-center opacity-60">Manually adding file context,<br>chasing agentic PRs,<br>landed on smarter autocomplete</div>
  </div>

  <div class="flex-1 flex flex-col items-center relative z-10 px-3">
    <div class="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4">3</div>
    <div class="font-semibold text-sm text-center mb-2">Agentic CLIs</div>
    <div class="text-xs text-center opacity-60">Terminal-native agents with<br>full codebase access</div>
  </div>

  <div class="flex-1 flex flex-col items-center relative z-10 px-3">
    <div class="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg mb-4">4</div>
    <div class="font-semibold text-sm text-center mb-2">Wild West</div>
    <div class="text-xs text-center opacity-60">Agents spawning agents,<br>overnight runs,<br>anything goes</div>
  </div>

  </v-clicks>

</div>

<v-click>
<div class="mt-10 text-center text-3xl font-bold text-orange-400">Token Leader Boards</div>
</v-click>

---
layout: section
---

# What Didn't Work

---
layout: center
class: text-center
---

# Everything Became a Skill

<v-click>

*I was paying for conversations that should have been aliases.*

</v-click>

<!--
- Deterministic tasks became skills: PR review, agent coordination, all markdown
- Writing programs as markdown docs, expecting semi-deterministic results
- Eating tokens for things that didn't need tokens
-->

---
layout: center
class: text-center
---

# Skills Don't Transfer

<v-click>

*Your workflow isn't their workflow.*

</v-click>

<!--
- Two types: context skills (fine) vs. workflow skills (don't transfer)
- Workflow skills require buy-in for how to use the tools
- Pace makes alignment nearly impossible
- Everyone siloes, builds their own
- Sharing = maintenance burden
-->

---
layout: center
class: text-center
---

# Research → Plan → Implement

<v-click>

*You can't tell if it's working or if you're just getting lucky.*

</v-click>

<!--
- Good workflow: research, plan, implement in phases, clear context between each
- We were doing it, looked like it was working
- The antipattern: goal-contaminated research prompts
- Non-determinism masks misuse. confident output either way
- Right idea, wrong execution. fix is next
-->

---
layout: center
class: text-center
---

# Outsourcing the Thinking

<v-click>

*You inherit decisions you didn't make, can't explain, and are now on-call for.*

</v-click>

<!--
- Letting LLMs make architectural decisions and technical trade-offs
- Outsourcing the ideas, not just the execution
- These are dumb tools. your expertise is the point
- You're the engineer, own what you ship
-->

---
layout: default
---

# Building Horizontal Layers

<div class="mt-8 flex gap-16 items-center">

  <div class="flex-1 flex flex-col gap-2">
    <div class="py-3 px-6 bg-violet-500/20 border border-violet-500/40 rounded-lg text-center font-semibold text-sm">Frontend</div>
    <div class="py-3 px-6 bg-indigo-500/20 border border-indigo-500/40 rounded-lg text-center font-semibold text-sm">Handlers</div>
    <div class="py-3 px-6 bg-blue-500/20 border border-blue-500/40 rounded-lg text-center font-semibold text-sm">Services</div>
    <div class="py-3 px-6 bg-slate-500/20 border border-slate-500/40 rounded-lg text-center font-semibold text-sm">Database</div>
  </div>

  <div v-click class="flex-1 italic opacity-70 text-lg leading-relaxed">
    10,000 lines. None of it works. You don't know where things went wrong.
  </div>

</div>

<!--
- Build database, then services, then handlers, then frontend. each in isolation
- 10,000 lines of code that doesn't run, can't tell where assumptions broke down
- Fix: vertical slices (covered in what works)
-->

---
layout: center
class: text-center
---

# Attention is the Constraint

<v-click>

*Turns out I'm not infinitely scalable either.*

</v-click>

<!--
- The excitement: spin up agents, crunch the roadmap, asked PM for 3 years of customer requests
- 10 agents, 10 isolated things. couldn't keep up
- PRs and plans piling up faster than I could review
- Agents scale. Attention doesn't.
-->

---
layout: center
class: text-center
---

# Model Providers' Incentives Aren't Yours

<v-click>

*They benefit from you consuming more tokens. You benefit from consuming fewer.*

</v-click>

<!--
- Anthropic, OpenAI: incentive is token consumption. Yours is shipping products that work and make money.
- New and shiny doesn't mean you should use it
- Example: agent orchestration frameworks. too much LLM, not enough deterministic code
- Burned tokens, got nothing done
-->

---
layout: section
---

# What Did Work

---
layout: center
class: text-center
---

# Research → Plan → Implement

<v-click>

*The cycle works. The prompts and the order matter more than you'd expect.*

</v-click>

---
layout: center
class: text-center
---

# Research: Don't Tell It What You're Building

<v-click>

*"How are drop rules stored and how do they currently relate to segments?" Not "I need to link drop rules to segments, find the relevant components."*

</v-click>

<v-click>

*Goal-contaminated prompts produce goal-contaminated results. The agent starts offering opinions instead of surfacing facts.*

</v-click>

<!--
- Ask neutral questions, no mention of what you're building
- Research narrows context to only what matters for the next phase
- The moment you include the goal, you get opinions instead of facts
-->

---
layout: center
class: text-center
---

# Planning: Start With `/interview-me`

<v-click>

*The interview generates a product spec from your input. Without it, the plan reflects what AI thinks you want.*

</v-click>

<!--
- Take your idea + business requirements, feed into /interview-me
- Agent interviews you to understand how you want it built
- Output: a product spec. your requirements, not the LLM's assumptions
- Old way: write a one-shot plan prompt and hope. New way: back and forth until the spec is right.
-->

---
layout: center
class: text-center
---

# Planning: Feed Spec + Research Into `/plan-write`

<v-click>

*Neutral research plus a human-generated spec. The planner has everything it needs without baking in assumptions you never made.*

</v-click>

<!--
- Research = the codebase context (files, patterns, how things work)
- Spec = what you actually want to build, in your words
- Plan = the execution steps you review, edit, and sign off on
- You get much better output because the inputs are clean and separated
-->

---
layout: default
---

# Build Vertical Slices

<div class="mt-8 flex gap-16 items-center">
  <div class="flex-1">
    <div class="grid gap-1.5 [grid-template-columns:auto_1fr_1fr_1fr]">
      <div></div>
      <div class="text-center text-xs font-mono opacity-70 pb-1">Slice 1</div>
      <div class="text-center text-xs font-mono opacity-30 pb-1">Slice 2</div>
      <div class="text-center text-xs font-mono opacity-30 pb-1">Slice 3</div>
      <div class="text-xs font-semibold opacity-60 flex items-center pr-3">Frontend</div>
      <div class="py-3 bg-violet-500/40 border border-violet-500/60 rounded"></div>
      <div class="py-3 bg-gray-500/10 border border-gray-700/30 rounded opacity-30"></div>
      <div class="py-3 bg-gray-500/10 border border-gray-700/30 rounded opacity-30"></div>
      <div class="text-xs font-semibold opacity-60 flex items-center pr-3">Handlers</div>
      <div class="py-3 bg-indigo-500/40 border border-indigo-500/60 rounded"></div>
      <div class="py-3 bg-gray-500/10 border border-gray-700/30 rounded opacity-30"></div>
      <div class="py-3 bg-gray-500/10 border border-gray-700/30 rounded opacity-30"></div>
      <div class="text-xs font-semibold opacity-60 flex items-center pr-3">Services</div>
      <div class="py-3 bg-blue-500/40 border border-blue-500/60 rounded"></div>
      <div class="py-3 bg-gray-500/10 border border-gray-700/30 rounded opacity-30"></div>
      <div class="py-3 bg-gray-500/10 border border-gray-700/30 rounded opacity-30"></div>
      <div class="text-xs font-semibold opacity-60 flex items-center pr-3">Database</div>
      <div class="py-3 bg-slate-500/40 border border-slate-500/60 rounded"></div>
      <div class="py-3 bg-gray-500/10 border border-gray-700/30 rounded opacity-30"></div>
      <div class="py-3 bg-gray-500/10 border border-gray-700/30 rounded opacity-30"></div>
    </div>
  </div>
  <div v-click class="flex-1 italic opacity-70 text-lg leading-relaxed">
    Something works. Validate assumptions before you have 10,000 lines.
  </div>
</div>

<!--
- Full end-to-end feature working as fast as possible
- Everything connects, everything builds, everything runs
- Iterate and expand from a working foundation
- Don't let agents explode the codebase before you've validated anything
-->

---
layout: center
class: text-center
---

# Don't Outsource the Thinking

<v-click>

*Use AI to pull the thinking out of you. Not to replace it.*

</v-click>

<!--
- Reiteration of the /interview-me process
- Use the LLM to pull the thinking out of you: how do you want it built, what do you not want it to do
- Be specific. architecture decisions, constraints, things to avoid
- Then use it to find edge cases and things that could break
- You bring the domain knowledge; the LLM helps you stress-test it
-->

---
layout: center
class: text-center
---

# Please Read the Code

<v-click>

*You're on-call for whatever ships. Read it.*

</v-click>

---
layout: center
class: text-center
---

# The Deterministic Shift

<v-click>

*Use AI to figure out the right approach, then encode it as a script. Stop paying AI to do it.*

</v-click>

<!--
- Use AI to find the right approach, then make it a script
- Stop burning tokens on things that don't need tokens
- Save money, do more with less
-->

---
layout: section
---

# What Tools We're Using Now

---
layout: center
---

<div class="flex gap-16 justify-center items-start">
  <div class="flex flex-col items-center gap-4 flex-1">
    <img src="/beans.png" class="h-72 object-contain" />
    <div class="font-bold text-xl">Beans</div>
    <div class="text-sm opacity-60 text-center">JSON-file task tracking for agents. The agent knows where it left off.</div>
  </div>
  <div class="flex flex-col items-center gap-4 flex-1">
    <img src="/rice.png" class="h-72 object-contain" />
    <div class="font-bold text-xl">Rice</div>
    <div class="text-sm opacity-60 text-center">CLI for tracking, sharing, and searching agentic plans.</div>
  </div>
</div>

<!--
Beans:
- Replacement for beads (if anyone's used that)
- Turns a plan into a list of tasks with dependencies. like JIRA for agents
- Everything stays local, nothing uploaded to the cloud, nothing shared across the team
- Ephemeral: tasks exist for the agent to work through, then they're done
- Used as part of the research, plan, implement phase

Rice:
- Experimental tool for tracking, sharing, and searching agentic plans
- One command to publish a plan to a shared git repository
- Team can access each other's plans
- Agents can search through existing plans. don't reinvent the wheel
- Ties into the next slide
-->

---
layout: center
---

<div class="flex gap-12 items-center justify-center">
  <img src="/brain.png" class="h-72 object-contain" />
  <div class="flex flex-col gap-3 max-w-sm">
    <div class="font-bold text-2xl">The Adaptive Telemetry Brain</div>
    <div class="opacity-60">Indexed plan documents. Past decisions available without you having to remember they exist.</div>
  </div>
</div>

<!--
- Context repository: plans, research, docs all in one place
- Auto-scrapes documentation from repositories via cron job. changes get captured automatically
- Agents use Rice to query it: recent deployments, what changed, architectural decisions
- Cross-team collaboration. ideas and context shared across services
- Ties Rice together with the broader knowledge base
-->

---
layout: center
class: text-center
---

# The On-Call Bot

<v-click>

*Pulls together repository changes and Grafana data into something consumable, with analysis on what could be causing the issue.*

</v-click>

<!--
- Early experiment, not in production. still evaluating
- Responds to incidents, does not take actions. analysis only
- Flow: alert fires, Slack message, react with an emoji, bot starts its analysis
- Uses GCX (Grafana's CLI) to query logs and metrics from the terminal
- Runs with context from the brain repository. knows the system's recent history
- Currently using Cursor automation in the background, looking at other providers
- Synthesizes what changed, proposes a likely cause. better starting point at 2am
-->

---
layout: section
---

# What I Use Day to Day

---
layout: default
---

# Things I Built Because I Had Time

<div class="mt-6 flex flex-col gap-4">
  <v-click>
  <div class="flex gap-4 items-start p-4 rounded-lg border border-gray-700/40 bg-gray-500/5">
    <div class="font-mono font-bold text-primary text-lg w-28 shrink-0">mi</div>
    <div class="text-sm opacity-70">Universal task runner alias. Run <code>mi run</code> in any repo and it figures out whether to use Makefile, Mise, Taskfile, or whatever is configured. Agents love it. they don't have to know or remember which runner the project uses.</div>
  </div>
  </v-click>
  <v-click>
  <div class="flex gap-4 items-start p-4 rounded-lg border border-gray-700/40 bg-gray-500/5">
    <div class="font-mono font-bold text-primary text-lg w-28 shrink-0">ci-check</div>
    <div class="text-sm opacity-70">Queries GitHub for PR status and returns a clean JSON blob. Instead of the agent running multiple commands trying to parse CI output, it gets the same information in a fraction of the tokens.</div>
  </div>
  </v-click>
  <v-click>
  <div class="flex gap-4 items-start p-4 rounded-lg border border-gray-700/40 bg-gray-500/5">
    <div class="font-mono font-bold text-primary text-lg w-28 shrink-0">dirwatch</div>
    <div class="text-sm opacity-70">Runs a command when a directory changes. HEIC images dropped in Downloads get converted to JPEG automatically. Ebooks get sorted by author. Small utility, makes life easier.</div>
  </div>
  </v-click>
  <v-click>
  <div class="flex gap-4 items-start p-4 rounded-lg border border-gray-700/40 bg-gray-500/5">
    <div class="font-mono font-bold text-primary text-lg w-28 shrink-0">solo</div>
    <div class="text-sm opacity-70">Spins up a Tmux session from a <code>.solo</code> config. backend, frontend, Docker deps, log tailing, each in their own window. <code>solo up</code> to start, <code>solo down</code> to kill it all.</div>
  </div>
  </v-click>
  <v-click>
  <div class="flex gap-4 items-start p-4 rounded-lg border border-gray-700/40 bg-gray-500/5">
    <div class="font-mono font-bold text-primary text-lg w-28 shrink-0">gobusgen</div>
    <div class="text-sm opacity-70">Generates a typed in-memory event bus from a Go file. Define your keys and types, get a fully typed pub/sub API out the other side. No more stringly-typed message buses.</div>
  </div>
  </v-click>
</div>

---
layout: center
class: text-center
---

# Hive

*The layer above your coding agents. A shared command center built on Tmux with isolated Git worktrees for concurrent workflows across different projects.*

<!--
- Needed a way to wrangle multiple agents across multiple streams of work
- Sweet spot: 3 working sessions, not 30. Balance human interaction across them.
- Runs on top of Tmux. the layer above your coding agents
- Works with Claude, Codex, anything. Hive spins the sessions up inside Tmux
- Overview: who's idle, who's working, who needs interaction, preview of what's changed
- Git integration: see what's changed and the overall Claude session context
- Meta harness. bounce between agents without 30 terminal tabs
- Built-in local task manager (Jira alternative for agents, like Beans but integrated)
- Documentation integration for sharing context across repositories
- Message bus so agents can message each other
- Demo coming up
-->

---
layout: section
---

# Demo

---
layout: center
---

## Hive: Overview and Navigation

*Prepare: fresh Hive instance with a few sessions in different states*

- Overview page: idle vs. active vs. needs interaction
- Navigating into a session and back to the home page
- Creating a new session
- Command palette

---
layout: center
---

## Research → Plan → Implement in Practice

*Prepare: two sessions. one with completed research, one with a completed plan*

- Walk through the research phase: neutral prompts, what the output looks like
- Feed research into Planinator for plan review
- Show the plan being reviewed and edited
- Apply the same Planinator workflow to code review

---
layout: section
---

# Wrapping Up

---
layout: center
class: text-center
---

# Nobody Has This Figured Out

<v-click>

*Most of this is gut feel. Find the patterns that work for your workflow, not someone else's.*

</v-click>

<!--
- Still very early days. Workflows are evolving fast.
- Most evaluation is vibes-based. no real framework for measuring what works
- People are using the scientific method: try things, see what sticks, iterate
- Best model, best prompts, best workflow. all still up for debate
- If something I said doesn't work for you, don't force it
- Find the patterns that fit your workflow, not someone else's
-->

---
layout: center
class: text-center
---

# Be the AI Person

<v-click>

*Nobody has this figured out. That means you can. Becoming the person in your org who does is a career move that doesn't come around often.*

</v-click>

<!--
- New frontiers like this are rare. most of engineering is well-understood territory
- Nobody knows what they're doing, which means the expert role is unclaimed
- Be the person who experiments, builds judgment, and becomes the go-to
- This is a real way to make yourself important and move your career forward fast
-->

---
layout: center
class: text-center
---

# Questions
