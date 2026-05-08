# presentations

**Live site:** <https://hay-kot.github.io/presentations/>

Monorepo of [Slidev](https://sli.dev) presentations, deployed as a single
GitHub Pages site.

## Layout

```
presentations/
  bubble-tea-tuis/      # one Slidev workspace per presentation
  saas-stack-in-go/
site/
  presentations.json    # manifest: which decks exist, with metadata
  index.html.tmpl       # landing-page template
  build.mjs             # aggregates per-deck builds + landing page into dist/
.github/workflows/      # GitHub Pages deploy workflow
```

Each presentation is an isolated pnpm workspace with its own pinned
Slidev/Vue versions.

## Adding a presentation

1. Copy the deck under `presentations/<slug>/` (must contain a Slidev-shaped
   `package.json` and `slides.md`).
2. In `presentations/<slug>/package.json`, set `"name": "<slug>"` and a
   `build` script of `slidev build --base /presentations/<slug>/`.
3. Add an entry to `site/presentations.json`.

The directory name, the package `name`, and the manifest `slug` MUST be
identical strings — the CI matrix and `pnpm --filter` rely on it.

## Local development

```sh
pnpm install
pnpm --filter <slug> dev      # serve a single deck on :3030
pnpm build                    # produce the full dist/ that CI deploys
```
