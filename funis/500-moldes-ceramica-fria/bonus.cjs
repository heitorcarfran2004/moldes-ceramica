const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const D = 'C:/Users/thorz/Downloads/iloveimg-compressed/';
const OUT = path.join(__dirname, 'assets', 'bonus');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const MAPA = [
  ['ChatGPT_Image_20_de_jul._de_2026,_01_27_41.png', 'bonus-1'],
  ['ChatGPT_Image_20_de_jul._de_2026,_01_27_44.png', 'bonus-2'],
  ['ChatGPT_Image_20_de_jul._de_2026,_01_27_50.png', 'bonus-3'],
  ['ChatGPT_Image_20_de_jul._de_2026,_01_27_52.png', 'bonus-4'],
  ['ChatGPT_Image_20_de_jul._de_2026,_01_27_53.png', 'bonus-5'],
];

(async () => {
  let antes = 0, depois = 0;
  for (const [src, nome] of MAPA) {
    const p = D + src;
    const m = await sharp(p).metadata();
    antes += fs.statSync(p).size;
    await sharp(p).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(OUT, nome + '.webp'));
    await sharp(p).resize({ width: 1000, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(OUT, nome + '.jpg'));
    const f = await sharp(path.join(OUT, nome + '.webp')).metadata();
    depois += fs.statSync(path.join(OUT, nome + '.webp')).size;
    console.log(nome + ': ' + m.width + 'x' + m.height + ' -> ' + f.width + 'x' + f.height +
      ' (proporcao ' + (f.width / f.height).toFixed(2) + ')');
  }
  console.log('\nAntes:  ' + (antes / 1048576).toFixed(2) + ' MB');
  console.log('Depois: ' + (depois / 1048576).toFixed(2) + ' MB');
})();
