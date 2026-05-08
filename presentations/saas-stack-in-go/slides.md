---
# You can also start simply with 'default'
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: Welcome to Slidev
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# Building a SaaS Stack in Go

How to build a _scalable_ JSON API in Go

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---
---

# About Me

- Senior Software Engineer (Johnson Controls)
- Mostly writing C# day-to-day
- Written applications in C#, Go, Python, JavaScript, and Rust
- Open Source Contributor [github.com/hay-kot](https://github.com/hay-kot)
  - Mealie (Recipe Manager) 10m+ downloads
  - Homebox (Inventory Manager) 1m+ downloads
- Originally From Alaska, moved to Minnesota last Summer (2023)
- I love cycling, hiking, and skiing

---
---

# Overview

- Defining Product Scope
- Project Layout
- Logging and Observability
- Data Layer (Database, ORM, Migrations)
- Http
  - Error Handling
  - Authentication / Authorization
- CI / CD
- Deployment Strategies
- Domain Scaffolding
- Demo / Q/A / Discussion

---
src: ./pages/01.defining-scope.md
---

---
layout: center
---

# Project Layout

<!--
- Does anyone feel like they have a hard time nailing down their project structure or package architecture in Go projects?
- Does your company or do you have guidelines or documents on how things should be structured?
-->

---
layout: two-cols-header
---

# Project Layout

::left::

## Rules

- Binaries live in `cmd/`
- Business logic lives in `internal/`

## Guidelines

- `core` is application standard library (no imports)
- packages are ordered so they only import "up"
- keep nesting down to 3 levels max

<br>

<span class="text-center text-sm">

_This is the layout only for Go code and omits other files and folders_

</span>

::right::

```
<root>
├── cmd
│  ├── api    -- main API server
│  └── cli    -- command line tool (seed, migrate, etc)
└── internal
   ├── core
   │  ├── <pkg>
   ├── data
   │  ├── db
   │  └── dtos     -- shared data types
   ├── observability
   │  ├── logtools
   │  └── otel
   ├── services
   ├── web
   │  ├── docs          -- open api docs
   │  ├── extractors    -- reading from requests
   │  ├── handlers
   │  ├── mid
   │  └── oauth
   └── worker
```

---
src: ./pages/02.observability.md
---

---
src: ./pages/03.data.md
---

---
src: ./pages/04.http.md
---

---
src: ./pages/05.ci.md
---

---
src: ./pages/06.deployment.md
---

---
src: ./pages/07.scaffold.md
---

---
src: ./pages/08.demo.md
---
