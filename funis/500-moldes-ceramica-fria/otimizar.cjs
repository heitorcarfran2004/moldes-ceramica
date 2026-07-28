const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'assets', 'pecas');
const OUT = path.join(__dirname, 'assets', 'pecas-web');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const files = fs.readdirSync(DIR).filter(f => /\.jpg$/i.test(f)).sort();
  let antes = 0, depois = 0;
  for (const f of files) {
    const src = path.join(DIR, f);
    antes += fs.statSync(src).size;
    const base = f.replace(/\.jpg$/i, '');
    // 800px é suficiente: o card do carrossel tem ~300px, 2x para retina
    await sharp(src).resize(800, 800, { fit: 'cover' }).webp({ quality: 78 }).toFile(path.join(OUT, base + '.webp'));
    await sharp(src).resize(800, 800, { fit: 'cover' }).jpeg({ quality: 76, mozjpeg: true }).toFile(path.join(OUT, base + '.jpg'));
    depois += fs.statSync(path.join(OUT, base + '.webp')).size;
  }
  console.log('Imagens processadas: ' + files.length);
  console.log('Antes:  ' + (antes / 1048576).toFixed(2) + ' MB');
  console.log('Depois: ' + (depois / 1048576).toFixed(2) + ' MB (webp)');
  console.log('Reducao: ' + (100 - depois / antes * 100).toFixed(1) + '%');
})();
