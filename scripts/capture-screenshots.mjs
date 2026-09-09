/**
 * Captures a screenshot of every site in lib/projects.ts and writes it to
 * public/work/<slug>.webp, compressed and resized for the page.
 *
 * Run it again whenever a client site is redesigned:
 *   npm run shots
 *
 * Capture is slow the first time a URL is requested — the service loads the
 * page in a real browser — so each request gets a generous timeout and three
 * spaced retries before falling back to the second provider.
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "work");

const WIDTH = 1280;
const QUALITY = 78;
const TIMEOUT_MS = 90_000;
const RETRIES = 3;
/** mShots returns a placeholder until it has generated the capture, and
 *  thum.io can shoot before paint. Both need a real wait, not a quick retry. */
const RETRY_DELAY_MS = 25_000;

/** Reads the project list straight from the TypeScript source. */
async function readProjects() {
  const source = await readFile(join(root, "lib", "projects.ts"), "utf8");
  const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const urls = [...source.matchAll(/url:\s*"([^"]+)"/g)].map((m) => m[1]);

  if (slugs.length !== urls.length || slugs.length === 0) {
    throw new Error(
      `Could not pair slugs with urls in lib/projects.ts (${slugs.length} slugs, ${urls.length} urls).`,
    );
  }
  return slugs.map((slug, i) => ({ slug, url: urls[i] }));
}

function providers(url) {
  return [
    `https://image.thum.io/get/width/1600/crop/1200/noanimate/${url}`,
    `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1600&h=1200`,
  ];
}

async function fetchImage(src) {
  const response = await fetch(src, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { "User-Agent": "Mozilla/5.0 (portfolio screenshot capture)" },
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const type = response.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) throw new Error(`not an image (${type})`);

  const buffer = Buffer.from(await response.arrayBuffer());
  // A near-empty body means the service returned a placeholder, not a capture.
  if (buffer.byteLength < 15_000) {
    throw new Error(`suspiciously small (${buffer.byteLength} bytes)`);
  }
  return buffer;
}

/**
 * A capture service sometimes shoots before the page has painted and returns
 * a near-blank frame. Those decode fine and look like a success, so measure
 * pixel variation and reject anything too flat to be a real screenshot.
 */
const MIN_VARIATION = 25;

async function assertNotBlank(buffer) {
  const stats = await sharp(buffer).stats();
  const variation =
    stats.channels.reduce((total, c) => total + c.stdev, 0) /
    stats.channels.length;

  if (variation < MIN_VARIATION) {
    throw new Error(`blank frame (variation ${variation.toFixed(1)})`);
  }
}

async function capture({ slug, url }) {
  for (const src of providers(url)) {
    for (let attempt = 1; attempt <= RETRIES; attempt++) {
      try {
        const raw = await fetchImage(src);
        await assertNotBlank(raw);

        const out = await sharp(raw)
          .resize({ width: WIDTH, withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toBuffer();

        await writeFile(join(outDir, `${slug}.webp`), out);
        const kb = (out.byteLength / 1024).toFixed(0);
        const savedFrom = (raw.byteLength / 1024).toFixed(0);
        console.log(`  ${slug}.webp  ${kb} KB  (from ${savedFrom} KB)`);
        return true;
      } catch (error) {
        const label = new URL(src).hostname;
        console.log(`  ${slug}: ${label} attempt ${attempt} — ${error.message}`);
        // Give the service time to finish rendering before trying again.
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }
  }
  console.log(`  ${slug}: FAILED, the gradient plate will be used instead`);
  return false;
}

const projects = await readProjects();
await mkdir(outDir, { recursive: true });

console.log(`Capturing ${projects.length} screenshots into public/work\n`);

const results = await Promise.all(projects.map(capture));
const ok = results.filter(Boolean).length;

console.log(`\nDone: ${ok}/${projects.length} captured.`);
if (ok < projects.length) process.exitCode = 1;
