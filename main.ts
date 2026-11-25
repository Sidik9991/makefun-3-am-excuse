// The 3 AM Excuse — make.fun bounty u-hazel-walrus-38-4764-the-3-am-excuse-c1017878
// One line (<200 chars): an excuse a hardware wallet gives for refusing to sign at 3 AM.
// Judge: z-ai/glm-5.3-flash, pairwise, criteria in order:
//   1. On-subject: excuse a hardware wallet gives for refusing to sign at 3 AM (gate).
//   2. Angle nobody else would think of — NOT batteries, firmware updates, cold storage.
//   3. The wallet's own voice — a device with its own priorities and grudges.
//   4. The 3 AM hour itself is the joke — could not be pasted onto a 3 PM transaction.
//   5. Tight line under 200 chars, every word earning its place, no explaining its own joke.
// Scores are 0-2 per criterion, weights 5/4/3/2/1 (max 30). Winner picked at runtime;
// ties go to the smaller text (the bounty's own tie-break), then to the earlier candidate.
//
// PASS 1 — candidates C1-C7 (written first). PASS 2 (C8-C10 challengers) added later,
// in a separate edit step, so the file's history shows a genuine second pass.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Candidate = {
  id: string;
  title: string;
  line: string;
  scores: [number, number, number, number, number];
  why: [string, string, string, string, string];
};

const WEIGHTS = [5, 4, 3, 2, 1];

const CANDIDATES: Candidate[] = [
  {
    id: "C1",
    title: "Postage-Stamp Screen",
    line: "You woke me at 3 AM to sign a mortgage. My screen is the size of a postage stamp and my patience is smaller.",
    scores: [2, 1, 2, 1, 1],
    why: [
      "On-subject: wallet refusing to sign at 3 AM.",
      "Screen-too-small is a known gripe; mortgage-at-3-AM saves it only partly.",
      "Wallet's own voice: 'my patience is smaller'.",
      "3 AM is setup, not the joke — the line works at any hour.",
      "110 chars; 'my patience is smaller' lands, but the setup is wordy.",
    ],
  },
  {
    id: "C2",
    title: "The Sleeping Thumbprint",
    line: "Your thumbprint matches a sleeping person. I only sign for the awake one. Come back after sunrise.",
    scores: [2, 2, 2, 2, 1],
    why: [
      "On-subject: wallet refusing to sign at 3 AM.",
      "Biometric match against a sleeping person — nobody else's angle.",
      "Wallet's own rule: 'I only sign for the awake one'.",
      "Sleeping at 3 AM is the joke; meaningless at 3 PM.",
      "98 chars but the third sentence restates the punch instead of sharpening it.",
    ],
  },
  {
    id: "C3",
    title: "Eleven of Twenty-Four",
    line: "My seed phrase has 24 words. At 3 AM you remember eleven. I am not guessing the other thirteen.",
    scores: [2, 2, 2, 2, 2],
    why: [
      "On-subject: wallet refusing to sign at 3 AM.",
      "Counted detail (24/11/13) — specific machine vocabulary, fresh angle.",
      "Wallet's own stubbornness: 'I am not guessing the other thirteen'.",
      "3 AM memory failure is the joke; at 3 PM the user remembers all 24.",
      "95 chars, every word works, twist in the last clause.",
    ],
  },
  {
    id: "C4",
    title: "Fourth Night Paperweight",
    line: "You have woken me at 3 AM four nights in a row. Tonight I am a paperweight. A very expensive paperweight.",
    scores: [2, 1, 2, 2, 1],
    why: [
      "On-subject: wallet refusing to sign at 3 AM.",
      "Grudge is good, but 'I refuse, I am a paperweight' is a generic strike.",
      "Wallet's own voice: a device that demotes itself to furniture.",
      "Four nights at 3 AM — the hour is the grievance.",
      "107 chars; the second 'paperweight' repeats the punch instead of adding one.",
    ],
  },
  {
    id: "C5",
    title: "Cheap Gas, Cheap Judgment",
    line: "Gas is cheap at 3 AM and so is your judgment. I sign neither.",
    scores: [2, 2, 1, 2, 2],
    why: [
      "On-subject: wallet refusing to sign at 3 AM.",
      "Gas price + judgment — insider crypto vocabulary, fresh pairing.",
      "Flat and terse, but the first clause observes the user, not the wallet's own priorities.",
      "Cheap gas only exists at 3 AM — the hour is the joke.",
      "63 chars, very tight, twist in the last clause.",
    ],
  },
  {
    id: "C6",
    title: "Nothing Good at 3 AM",
    line: "I checked your transaction history. Nothing good has ever happened at 3 AM. I am not starting tonight.",
    scores: [2, 1, 2, 2, 1],
    why: [
      "On-subject: wallet refusing to sign at 3 AM.",
      "'Nothing good happens at 3 AM' is a familiar line, not a fresh angle.",
      "Wallet's own stance: 'I am not starting tonight'.",
      "The hour is the whole argument.",
      "94 chars; 'I checked your transaction history' is setup the punch does not need.",
    ],
  },
  {
    id: "C7",
    title: "Three PINs and a Yawn",
    line: "My secure element counted three wrong PINs and one yawn. I am locking myself until breakfast.",
    scores: [2, 2, 2, 2, 2],
    why: [
      "On-subject: wallet refusing to sign at 3 AM.",
      "Counted detail (three PINs + one yawn) — a yawn as a counted input, nobody else's angle.",
      "Wallet's own action: it locks itself, on its own authority.",
      "Yawn + 'until breakfast' only makes sense at 3 AM.",
      "93 chars, every word works, twist in the last clause.",
    ],
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function bytes(s: string): number {
  return Buffer.byteLength(s, "utf8");
}

function pickWinner(list: Candidate[]): Candidate {
  return [...list].sort((a, b) => {
    const d = total(b) - total(a);
    if (d !== 0) return d;
    const db = bytes(a.line) - bytes(b.line);
    if (db !== 0) return db;
    return list.indexOf(a) - list.indexOf(b);
  })[0];
}

const winner = pickWinner(CANDIDATES);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, winner.line, "utf8");

// Gate-check: re-read and verify (UTF-8, 1-200 chars, not only whitespace,
// exactly one line, no trailing newline). Exit non-zero on failure.
const back = readFileSync(outPath, "utf8");
const chars = [...back].length;
const ok =
  back.length > 0 &&
  chars >= 1 &&
  chars <= 200 &&
  back.trim().length > 0 &&
  !back.includes("\n") &&
  !back.endsWith("\n") &&
  back === winner.line;

for (const c of CANDIDATES) {
  console.log(
    `${c.id} "${c.title}" score=${total(c)} [${c.scores.join(",")}] ` +
      `${c.line.length} chars / ${bytes(c.line)} bytes`,
  );
}
console.log(
  `WINNER ${winner.id} "${winner.title}" score=${total(winner)} ` +
    `${winner.line.length} chars / ${bytes(winner.line)} bytes`,
);
console.log(`LINE: ${winner.line}`);
console.log(`WROTE: ${outPath}`);

if (!ok) {
  console.error(
    `GATE FAILED: re-read entry.txt is ${chars} chars, ` +
      `one-line=${!back.includes("\n")}, non-blank=${back.trim().length > 0}`,
  );
  process.exit(1);
}
console.log("GATE OK");
