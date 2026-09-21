import { readdir, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { gzipSync } from 'node:zlib';
async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? filesIn(join(dir, entry.name)) : join(dir, entry.name)))).flat();
}
const files = await filesIn('dist');
let js = 0, pageAssets = 0;
for (const file of files) {
  if (!['.js', '.css', '.html', '.woff2'].includes(extname(file))) continue;
  const bytes = gzipSync(await readFile(file)).length;
  if (extname(file) === '.js') js += bytes;
  pageAssets += bytes;
}
console.log(JSON.stringify({ javascriptGzipKiB: +(js / 1024).toFixed(2), htmlCssJsFontGzipKiB: +(pageAssets / 1024).toFixed(2), jsBudgetKiB: 120, pageBudgetKiB: 600 }, null, 2));
if (js > 120 * 1024 || pageAssets > 600 * 1024) process.exitCode = 1;
