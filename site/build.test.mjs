import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, writeFile, rm, mkdir } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { renderCard, renderTemplate, loadManifest } from "./build.mjs";

const exec = promisify(execFile);
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const MANIFEST = join(HERE, "presentations.json");
const BUILD_SCRIPT = join(HERE, "build.mjs");

test("renderCard emits relative href and required fields", () => {
  const out = renderCard({
    slug: "my-deck",
    title: "Deck",
    description: "Desc",
    date: "2026-05-07",
  });
  assert.match(out, /href="\.\/my-deck\/"/);
  assert.match(out, /<h2>Deck<\/h2>/);
  assert.match(out, /<time datetime="2026-05-07">2026-05-07<\/time>/);
});

test("renderCard escapes HTML in user-supplied fields", () => {
  const out = renderCard({
    slug: "x",
    title: "Title <script>",
    description: 'a "b" & c',
    date: "2026-01-01",
  });
  assert.ok(!out.includes("<script>"));
  assert.match(out, /Title &lt;script&gt;/);
  assert.match(out, /a &quot;b&quot; &amp; c/);
});

test("renderTemplate substitutes all tokens and leaves none behind", () => {
  const tpl = "<h1>{{TITLE}}</h1><ul>{{PRESENTATIONS}}</ul><footer>{{GENERATED_AT}}</footer>";
  const out = renderTemplate(
    [{ slug: "a", title: "A", description: "d", date: "2026-01-01" }],
    tpl,
    { title: "Hello", generatedAt: "now" },
  );
  assert.ok(!out.includes("{{"), "no leftover tokens");
  assert.match(out, /<h1>Hello<\/h1>/);
  assert.match(out, /<footer>now<\/footer>/);
  assert.match(out, /href="\.\/a\/"/);
});

test("loadManifest throws when a required field is missing", async () => {
  const original = await readFile(MANIFEST, "utf8");
  const broken = JSON.stringify({
    presentations: [{ slug: "missing-title", description: "d", date: "2026-01-01" }],
  });
  await writeFile(MANIFEST, broken);
  try {
    await assert.rejects(loadManifest(), /missing required field "title"/);
  } finally {
    await writeFile(MANIFEST, original);
  }
});

test("build.mjs exits non-zero when a presentation source dir is missing", async () => {
  const original = await readFile(MANIFEST, "utf8");
  const parsed = JSON.parse(original);
  parsed.presentations.push({
    slug: "nonexistent-deck",
    title: "x",
    description: "x",
    date: "2024-01-01",
  });
  await writeFile(MANIFEST, JSON.stringify(parsed));
  const distBackup = join(ROOT, "dist-backup-test");
  const dist = join(ROOT, "dist");
  await rm(distBackup, { recursive: true, force: true });
  try {
    // Move dist out of the way so the test doesn't pollute prior local builds
    await exec("mv", [dist, distBackup]).catch(() => {});
    await mkdir(dist, { recursive: true });
    const result = await exec("node", [BUILD_SCRIPT]).catch((err) => err);
    assert.notEqual(result.code, 0, "expected non-zero exit");
    assert.match(String(result.stderr ?? ""), /nonexistent-deck/);
  } finally {
    await writeFile(MANIFEST, original);
    await rm(dist, { recursive: true, force: true });
    await exec("mv", [distBackup, dist]).catch(() => {});
  }
});
