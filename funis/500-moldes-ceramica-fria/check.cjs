const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'assets', 'pecas-web');
(async () => {
  const files = fs.readdirSync(DIR).filter(f => f.endsWith('.webp')).sort();
  for (const f of files) {
    const m = await sharp(path.join(DIR, f)).metadata();
    console.log(f + ' -> ' + m.width + 'x' + m.height + (m.width === m.height ? ' OK' : '  <<< NAO E QUADRADA'));
  }
})();
