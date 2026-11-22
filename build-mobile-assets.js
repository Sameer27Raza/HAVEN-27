const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const destDir = path.join(__dirname, 'www');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const filesToCopy = [
  'index.html',
  'manifest.json',
  'sw.js',
  'script.js',
  'therapist-portrait.jpg',
  'haven-mark.png',
  'mode2.css',
  'mode3.css',
  'CSS - Copy.css',
  'icon.svg',
  'icon-192.png',
  'icon-512.png',
  'title1.svg',
  'title2.svg',
  'title3.svg',
  'title4.svg'
];

filesToCopy.forEach((file) => {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} -> www/`);
  }
});

const pdfjsSrc = path.join(srcDir, 'vendor', 'pdfjs');
if (!fs.existsSync(pdfjsSrc)) {
  throw new Error(`Required PDF.js assets are missing from ${pdfjsSrc}`);
}
fs.cpSync(pdfjsSrc, path.join(destDir, 'vendor', 'pdfjs'), { recursive: true });
console.log('Copied vendor/pdfjs/ -> www/vendor/pdfjs/');

// Copy api directory if present
const apiSrc = path.join(srcDir, 'api');
const apiDest = path.join(destDir, 'api');
if (fs.existsSync(apiSrc)) {
  fs.cpSync(apiSrc, apiDest, { recursive: true });
  console.log('Copied api/ -> www/api/');
}

const documentsSrc = path.join(srcDir, 'documents');
const studyPdfSrc = path.join(documentsSrc, 'statistics-notes-chapter-ordered-v2.pdf');
const rootStudyPdfSrc = path.join(srcDir, 'statistics-notes-chapter-ordered-v2.pdf');
const cppPdfSrc = path.join(documentsSrc, 'Attractive_CPP_Programming_Notes.pdf');
if (!fs.existsSync(studyPdfSrc) && !fs.existsSync(rootStudyPdfSrc)) {
  throw new Error(`Required study PDF is missing from ${documentsSrc} and ${rootStudyPdfSrc}`);
}
if (!fs.existsSync(cppPdfSrc)) {
  throw new Error(`Required C++ notes PDF is missing from ${cppPdfSrc}`);
}

const documentsDest = path.join(destDir, 'documents');
if (fs.existsSync(documentsSrc)) {
  fs.cpSync(documentsSrc, documentsDest, { recursive: true });
} else {
  fs.mkdirSync(documentsDest, { recursive: true });
}

if (!fs.existsSync(path.join(documentsDest, 'statistics-notes-chapter-ordered-v2.pdf'))) {
  fs.copyFileSync(rootStudyPdfSrc, path.join(documentsDest, 'statistics-notes-chapter-ordered-v2.pdf'));
}
const cppPdfOutput = path.join(documentsDest, 'Attractive_CPP_Programming_Notes.pdf');
if (!fs.existsSync(cppPdfOutput)) {
  fs.copyFileSync(cppPdfSrc, cppPdfOutput);
}
console.log('Copied documents/ -> www/documents/');

const studyPdfOutput = path.join(documentsDest, 'statistics-notes-chapter-ordered-v2.pdf');
if (!fs.existsSync(studyPdfOutput)) {
  throw new Error(`Study PDF was not copied to the Vercel output: ${studyPdfOutput}`);
}
if (!fs.existsSync(cppPdfOutput)) {
  throw new Error(`C++ notes PDF was not copied to the Vercel output: ${cppPdfOutput}`);
}

console.log('Mobile assets preparation complete!');
