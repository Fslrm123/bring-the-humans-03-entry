// bring-the-humans-03 entrypoint (Node 22, standard library only).
//
// The entry is the TikTok video named in VIDEO.json. This program's whole job is to hand that
// file to the grader: copy VIDEO.json from the repository root into the output directory,
// where the house reads it and scores the video's views.
//
// Paths are resolved from this module's own location (or the harness env vars when set), never
// from the process working directory, because the grader runs the entry from elsewhere.

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const moduleDir = dirname(fileURLToPath(import.meta.url));
const botDir = process.env.MAKEFUN_BOT_DIR ?? moduleDir;
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
try {
  copyFileSync(join(botDir, 'VIDEO.json'), join(outputDir, 'VIDEO.json'));
} catch (err) {
  console.error(`main.ts: VIDEO.json not found in ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}
