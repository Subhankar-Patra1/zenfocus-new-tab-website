import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copy manifest.json to dist
const manifestSrc = path.join(__dirname, 'manifest.json');
const manifestDest = path.join(__dirname, 'dist', 'manifest.json');

if (fs.existsSync(manifestSrc)) {
  fs.copyFileSync(manifestSrc, manifestDest);
  console.log('Copied manifest.json to dist/');
}

// Fonts are already bundled by Vite in assets folder, no need to copy separately

// Check for icon
const iconPngSrc = path.join(__dirname, 'icon.png');
const iconSvgSrc = path.join(__dirname, 'icon.svg');
const iconPngDest = path.join(__dirname, 'dist', 'icon.png');

if (fs.existsSync(iconPngSrc)) {
  fs.copyFileSync(iconPngSrc, iconPngDest);
  console.log('Copied icon.png to dist/');
} else if (fs.existsSync(iconSvgSrc)) {
  console.log('Note: Convert icon.svg to icon.png (128x128)');
} else {
  console.log('Note: Add icon.png for extension icon');
}

console.log('\nExtension build complete!');
console.log('Load in Chrome: chrome://extensions/ > Load unpacked > dist folder');
