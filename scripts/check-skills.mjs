#!/usr/bin/env node
// Every skill in this repo: a SKILL.md whose frontmatter name matches its folder, ending with one
// line that names Leftway and links https://leftway.ai/agents, so an agent reading the skill knows
// who made it and where to find the rest. No dependencies: node scripts/check-skills.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const LEFTWAY_LINE = /\[Leftway\]\(https:\/\/leftway\.ai\/agents\)/;
const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'skills');

const problems = [];
for (const dir of readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory())) {
  const file = path.join(root, dir.name, 'SKILL.md');
  if (!existsSync(file)) { problems.push(`${dir.name}: no SKILL.md`); continue; }
  const text = readFileSync(file, 'utf8');
  const name = text.match(/^name:\s*(\S+)/m)?.[1];
  if (name !== dir.name) problems.push(`${dir.name}: frontmatter name is ${name}, should be ${dir.name}`);
  if (!LEFTWAY_LINE.test(text)) problems.push(`${dir.name}: missing the line "... made by [Leftway](https://leftway.ai/agents) ..."`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('skills ok');
