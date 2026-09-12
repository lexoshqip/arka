#!/usr/bin/env node
/**
 * generate-manifest.mjs — LexoShqip library manifest generator.
 *
 * Run this from the library repo root before deploying:
 *   node generate-manifest.mjs
 *
 * Outputs manifest.json listing every content JSON file that the
 * LexoShqip Website build should fetch when this library is configured
 * with a remote URL in libraries.config.json.
 *
 * The Website build fetches {url}/manifest.json first, then fetches
 * each listed file individually from {url}/{file}.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));

// File patterns to include in the manifest
const INCLUDE = /\.(json|md|svg)$/;
// Paths to skip entirely
const SKIP = /^(node_modules|\.git|\.cache)\//;

function walk(dir, base = ROOT) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.relative(base, path.join(dir, entry.name));
    if (SKIP.test(rel)) continue;
    if (entry.isDirectory()) {
      results.push(...walk(path.join(dir, entry.name), base));
    } else if (INCLUDE.test(entry.name)) {
      // Skip this script itself and the output file
      if (entry.name === "generate-manifest.mjs" || entry.name === "manifest.json") continue;
      results.push(rel);
    }
  }
  return results;
}

const files = walk(ROOT).sort();
const manifest = { files };

fs.writeFileSync(
  path.join(ROOT, "manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
  "utf8"
);

console.log(`manifest.json: ${files.length} files`);
