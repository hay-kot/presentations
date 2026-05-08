import { readFile, writeFile, mkdir, cp, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = join(ROOT, "site");
const DIST = join(ROOT, "dist");
const PRESENTATIONS = join(ROOT, "presentations");

const REQUIRED_FIELDS = ["slug", "title", "description", "date"];

async function loadManifest() {
  const raw = await readFile(join(SITE, "presentations.json"), "utf8");
  const parsed = JSON.parse(raw);
  if (!parsed || !Array.isArray(parsed.presentations)) {
    throw new Error("site/presentations.json: top-level `presentations` array missing");
  }
  parsed.presentations.forEach((entry, i) => {
    for (const field of REQUIRED_FIELDS) {
      if (typeof entry[field] !== "string" || entry[field].length === 0) {
        const id = entry.slug ? `slug=${entry.slug}` : `index=${i}`;
        throw new Error(`site/presentations.json: entry ${id} missing required field "${field}"`);
      }
    }
  });
  return parsed;
}

async function copyPresentation(p) {
  const src = join(PRESENTATIONS, p.slug, "dist");
  const dst = join(DIST, p.slug);
  try {
    const s = await stat(src);
    if (!s.isDirectory()) throw new Error("not a directory");
  } catch (err) {
    throw new Error(`presentations/${p.slug}/dist not found: ${err.message}`);
  }
  await mkdir(DIST, { recursive: true });
  await cp(src, dst, { recursive: true, force: true });
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderCard(p) {
  return [
    `<li class="card">`,
    `  <a href="./${escapeHtml(p.slug)}/">`,
    `    <h2>${escapeHtml(p.title)}</h2>`,
    `    <p>${escapeHtml(p.description)}</p>`,
    `    <time datetime="${escapeHtml(p.date)}">${escapeHtml(p.date)}</time>`,
    `  </a>`,
    `</li>`,
  ].join("\n");
}

function renderTemplate(presentations, template, opts = {}) {
  const cards = presentations.map(renderCard).join("\n");
  return template
    .replaceAll("{{TITLE}}", escapeHtml(opts.title ?? "Presentations"))
    .replaceAll("{{PRESENTATIONS}}", cards)
    .replaceAll("{{GENERATED_AT}}", escapeHtml(opts.generatedAt ?? ""));
}

async function main() {
  const manifest = await loadManifest();
  for (const p of manifest.presentations) {
    await copyPresentation(p);
  }
  const template = await readFile(join(SITE, "index.html.tmpl"), "utf8");
  const generatedAt = process.env.SOURCE_DATE_EPOCH ?? "";
  const html = renderTemplate(manifest.presentations, template, {
    title: "Presentations",
    generatedAt,
  });
  await mkdir(DIST, { recursive: true });
  await writeFile(join(DIST, "index.html"), html, "utf8");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err.message ?? err);
    process.exit(1);
  });
}

export { loadManifest, copyPresentation, renderCard, renderTemplate };
