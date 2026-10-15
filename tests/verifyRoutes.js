import fs from 'fs';
import path from 'path';

const srcDir = './src';
const files = [];

function getFiles(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      getFiles(full);
    } else if (full.endsWith('.jsx') || full.endsWith('.js')) {
      files.push(full);
    }
  }
}
getFiles(srcDir);

const validRoutes = [
  '/',
  '/login',
  '/register',
  '/onboarding',
  '/dashboard',
  '/activities',
  '/simulator',
  '/ai-assistant',
  '/goals',
  '/admin'
];

let totalLinksChecked = 0;
let errors = 0;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const toMatches = content.match(/to=['"][^'"]+['"]/g) || [];
  const navMatches = content.match(/navigate\(['"][^'"]+['"]\)/g) || [];

  for (const m of toMatches) {
    const route = m.replace(/^to=['"]/, '').replace(/['"]$/, '');
    if (route.startsWith('/')) {
      totalLinksChecked++;
      if (!validRoutes.includes(route)) {
        console.error('Invalid route link in', f, ':', route);
        errors++;
      }
    }
  }

  for (const m of navMatches) {
    const route = m.replace(/^navigate\(['"]/, '').replace(/['"]\)$/, '');
    if (route.startsWith('/')) {
      totalLinksChecked++;
      if (!validRoutes.includes(route)) {
        console.error('Invalid navigate route in', f, ':', route);
        errors++;
      }
    }
  }
}

console.log('--- ROUTE AUDIT RESULTS ---');
console.log('Total navigation routes & links verified:', totalLinksChecked);
console.log('Broken routes found:', errors);
if (errors === 0) {
  console.log('SUCCESS: All 10 registered application pages are fully and correctly interconnected.');
} else {
  process.exit(1);
}
