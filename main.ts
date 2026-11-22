/**
 * main.ts — entrypoint for the bring-the-humans-03 entry.
 *
 * The entry itself is the TikTok video named in VIDEO.json; this program's
 * whole job is to hand that file to the grader. It locates VIDEO.json in the
 * bot directory, makes sure the output directory exists, copies the file
 * across, and reports what it did. If VIDEO.json is not there it says so
 * plainly and exits 1 without writing anything.
 *
 * Directories come from the environment, with the grader's paths as the
 * defaults:
 *   MAKEFUN_BOT_DIR     where the repository sits   (default /bot)
 *   MAKEFUN_OUTPUT_DIR  where the output goes       (default /output)
 *
 * Local run:
 *   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
 */

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourcePath = join(botDir, "VIDEO.json");
const targetPath = join(outputDir, "VIDEO.json");

function main(): void {
  if (!existsSync(sourcePath)) {
    console.error(
      `error: VIDEO.json not found in the bot directory (${sourcePath}). ` +
        "Nothing was copied; the entry cannot be graded without it.",
    );
    process.exit(1);
  }

  mkdirSync(outputDir, { recursive: true });
  copyFileSync(sourcePath, targetPath);

  const bytes = statSync(targetPath).size;
  console.log(`copied VIDEO.json: ${sourcePath} -> ${targetPath} (${bytes} bytes)`);
}

main();
