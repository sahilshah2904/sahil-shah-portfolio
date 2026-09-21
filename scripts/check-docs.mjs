import fs from 'node:fs';
import path from 'node:path';
const files = ['README.md', 'CONTRIBUTING.md', 'WEBSITE_PLAN.md', ...fs.readdirSync('docs').filter(f => f.endsWith('.md')).map(f => 'docs/' + f)];
const errors = [];
let links = 0;
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  if ((text.match(/^```/gm) || []).length % 2) errors.push(file + ': unbalanced code fences');
  for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (/^[a-z]+:/i.test(target)) continue;
    links++;
    const [rel, anchor] = target.split('#');
    const dest = path.resolve(path.dirname(file), rel || path.basename(file));
    if (!fs.existsSync(dest)) { errors.push(file + ': missing ' + target); continue; }
    if (anchor) {
      const content = fs.readFileSync(dest, 'utf8');
      const headings = [...content.matchAll(/^#{1,6}\s+(.+)$/gm)].map(h => h[1].trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/ /g, '-'));
      if (!headings.includes(anchor)) errors.push(file + ': missing anchor ' + target);
    }
  }
}
console.log(JSON.stringify({ filesChecked: files.length, relativeLinksChecked: links, errors }, null, 2));
if (errors.length) process.exitCode = 1;
