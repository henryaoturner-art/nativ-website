// IndexNow ping — notifies Bing (and other IndexNow engines) of our content on
// each PRODUCTION deploy, so new/updated pages get crawled fast instead of
// waiting for the periodic crawl. Runs as `postbuild` (after `next build`).
//
// Safe by design:
//   - Only fires on Vercel PRODUCTION builds (VERCEL_ENV === "production").
//     Local builds and Vercel preview builds skip it, so testing never pings.
//   - Fully non-blocking: any error is logged and the script still exits 0,
//     so a failed ping can never break a deploy.
//
// Key: hosted at https://gonativ.nl/<key>.txt (public/<key>.txt). Keep the two
// in sync — the key string below MUST match that filename/contents.

import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HOST = "gonativ.nl";
const KEY = "217d253ba6994685b8b3e4e9094bb6d5";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

// Key pages worth re-announcing, plus every blog post (auto-discovered).
const STATIC_PATHS = [
  "/",
  "/company-brain",
  "/digitale-collegas",
  "/kennis/wat-is-een-bedrijfsbrein",
  "/blog",
];

function blogUrls() {
  try {
    const here = dirname(fileURLToPath(import.meta.url));
    const dir = join(here, "..", "content", "blog");
    return readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => `https://${HOST}/blog/${f.replace(/\.md$/, "")}`);
  } catch (err) {
    console.warn("[indexnow] could not read blog dir:", err?.message);
    return [];
  }
}

async function main() {
  if (process.env.VERCEL_ENV !== "production") {
    console.log(
      `[indexnow] skipped (VERCEL_ENV=${process.env.VERCEL_ENV ?? "unset"}; pings only on production deploys)`,
    );
    return;
  }

  const urlList = [
    ...STATIC_PATHS.map((p) => `https://${HOST}${p}`),
    ...blogUrls(),
  ];

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
    });
    console.log(`[indexnow] submitted ${urlList.length} URLs -> HTTP ${res.status}`);
  } catch (err) {
    console.warn("[indexnow] ping failed (non-blocking):", err?.message);
  }
}

// Never fail the build, whatever happens.
main()
  .catch((err) => console.warn("[indexnow] unexpected error (non-blocking):", err?.message))
  .finally(() => process.exit(0));
