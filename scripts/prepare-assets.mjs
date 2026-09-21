import { copyFile, mkdir } from 'node:fs/promises';
await mkdir(new URL('../public/', import.meta.url), { recursive: true });
await copyFile(
  new URL('../Sahil_Shah_Resume.pdf', import.meta.url),
  new URL('../public/Sahil_Shah_Resume.pdf', import.meta.url),
);
console.log('Prepared the downloadable resume from the source PDF.');
