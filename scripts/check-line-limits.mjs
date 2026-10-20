import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOTS = ['src', 'tests', 'scripts'];
const EXTENSIONS = new Set(['.ts', '.mts', '.cts', '.js', '.mjs', '.cjs']);
const LIMIT = 800;

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async entry => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(target);
    return EXTENSIONS.has(path.extname(entry.name)) ? [target] : [];
  }));
  return nested.flat();
}

const failures = [];
for (const root of ROOTS) {
  for (const file of await sourceFiles(root)) {
    const lines = (await readFile(file, 'utf8')).split(/\r?\n/u).length;
    if (lines > LIMIT) failures.push(`${file}: ${lines} lines`);
  }
}

if (failures.length > 0) {
  console.error(`Handwritten files exceed ${LIMIT} lines:\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Line limit passed (${LIMIT})`);
}
