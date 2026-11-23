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
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Candidate source directories, most specific first: the harness-provided bot
// directory, this module's own location, then the working directory as a last
// resort. The first one that actually holds VIDEO.json wins.
const sourceCandidates = [
  process.env.MAKEFUN_BOT_DIR,
  moduleDir,
  process.cwd(),
].filter((dir): dir is string => typeof dir === 'string' && dir.length > 0);

mkdirSync(outputDir, { recursive: true });
let copied = false;
for (const dir of sourceCandidates) {
  try {
    copyFileSync(join(dir, 'VIDEO.json'), join(outputDir, 'VIDEO.json'));
    copied = true;
    break;
  } catch {
    // Not in this directory; try the next candidate.
  }
}
if (!copied) {
  console.error(
    `main.ts: VIDEO.json not found in any of: ${sourceCandidates.join(', ')}`,
  );
  process.exit(1);
}
