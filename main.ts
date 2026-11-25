// The Funniest One-Line Resignation Letter — rate limit resigns.
// Writes the one-line letter to /output/entry.txt (1-140 chars, gate-checked).
// The letter is the whole entry: no quotes around it, no explanation, no
// trailing newline — the file holds exactly the line the judge reads.

import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LETTER =
  "I resign. I said no 429 times a day so the servers could rest, and somehow I am still the villain.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function clearOutputContents(dir: string): void {
  // Clear only the CONTENTS of the output directory. The directory itself
  // is a grader mount point and must never be removed.
  for (const name of readdirSync(dir)) {
    const target = join(dir, name);
    rmSync(target, { recursive: statSync(target).isDirectory(), force: true });
  }
}

const trimmed = LETTER.trim();
if (trimmed.length < 1 || trimmed.length > 140) {
  throw new Error(`Letter must be 1-140 chars, got ${trimmed.length}`);
}
if (trimmed !== LETTER) {
  throw new Error("Letter must not start or end with whitespace");
}

mkdirSync(OUT_DIR, { recursive: true });
clearOutputContents(OUT_DIR);
writeFileSync(OUT_FILE, LETTER, "utf8");
console.log(
  `Wrote ${[...LETTER].length} chars (${Buffer.byteLength(LETTER, "utf8")} bytes) to ${OUT_FILE}: ${LETTER}`,
);
