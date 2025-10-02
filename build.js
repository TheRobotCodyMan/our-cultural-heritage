const fs = require('fs-extra');
const path = require('path');
const sass = require('sass');

// Clean public directory
fs.removeSync('public');

// Copy HTML, JS, and assets from src to public
fs.copySync('src', 'public', {
  filter: src =>
    !src.endsWith('.scss')
});

// Compile every .scss in src/scss into public/css
const scssDir = path.join(__dirname, 'src', 'scss');
const outCssDir = path.join(__dirname, 'public', 'css');
fs.ensureDirSync(outCssDir);

if (fs.existsSync(scssDir)) {
  for (const file of fs.readdirSync(scssDir)) {
    if (file.endsWith('.scss')) {
      const srcFile = path.join(scssDir, file);
      const outFile = path.join(outCssDir, file.replace('.scss', '.css'));
      const result = sass.compile(srcFile);
      fs.writeFileSync(outFile, result.css);
      console.log(`Compiled ${file} → css/${file.replace('.scss', '.css')}`);
    }
  }
}

console.log('Build complete. Ready for Netlify!');