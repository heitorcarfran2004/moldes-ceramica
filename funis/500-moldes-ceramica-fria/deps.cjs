const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const D = 'C:/Users/thorz/Downloads/';
const OUT = path.join(__dirname, 'assets', 'depoimentos');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const MAPA = [
  ['images (1).jpg', 'juliana'],
  ['images (2).jpg', 'beatriz'],
  ['images (3).jpg', 'fernanda'],
];

(async () => {
  for (const [src, nome] of MAPA) {
    const p = D + src;
    // 160px quadrado (2x para o avatar de 52px em retina), corte centrado
    await sharp(p).resize(160, 160, { fit: 'cover', position: 'attention' }).webp({ quality: 82 }).toFile(path.join(OUT, nome + '.webp'));
    await sharp(p).resize(160, 160, { fit: 'cover', position: 'attention' }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUT, nome + '.jpg'));
    const kb = (fs.statSync(path.join(OUT, nome + '.webp')).size / 1024).toFixed(0);
    console.log(nome + '.webp: 160x160, ' + kb + ' KB');
  }
})();
