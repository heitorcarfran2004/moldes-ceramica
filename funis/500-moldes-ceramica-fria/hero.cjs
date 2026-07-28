const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const SRC = 'C:/Users/thorz/Downloads/Design_sem_nome (1).png';
const OUT = path.join(__dirname, 'assets');

(async () => {
  const m = await sharp(SRC).metadata();
  console.log('original: ' + m.width + 'x' + m.height + ' | canais: ' + m.channels + ' | alpha: ' + m.hasAlpha);

  let base = sharp(SRC).resize({ width: 900, withoutEnlargement: true });

  if (!m.hasAlpha) {
    // sem alpha: o fundo e branco -> recorta por luminancia invertida
    const { data, info } = await base.raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    const BAIXO = 244, ALTO = 252; // rampa: >=252 vira transparente
    const rgba = Buffer.alloc(width * height * 4);
    let transp = 0;
    for (let i = 0, j = 0; i < data.length; i += channels, j += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const lum = Math.min(r, g, b);
      let a = 255;
      if (lum >= ALTO) { a = 0; transp++; }
      else if (lum > BAIXO) a = Math.round((1 - (lum - BAIXO) / (ALTO - BAIXO)) * 255);
      rgba[j] = r; rgba[j + 1] = g; rgba[j + 2] = b; rgba[j + 3] = a;
    }
    base = sharp(rgba, { raw: { width, height, channels: 4 } });
    console.log('recorte por luminancia: ' + (transp / (width * height) * 100).toFixed(1) + '% transparente');
  } else {
    console.log('ja tem alpha — mantido como esta');
  }

  await base.clone().webp({ quality: 84, alphaQuality: 92 }).toFile(path.join(OUT, 'hero.webp'));
  await base.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT, 'hero.png'));

  const f = await sharp(path.join(OUT, 'hero.webp')).metadata();
  console.log('final: ' + f.width + 'x' + f.height);
  console.log('hero.webp: ' + (fs.statSync(path.join(OUT, 'hero.webp')).size / 1024).toFixed(0) + ' KB');
  console.log('hero.png:  ' + (fs.statSync(path.join(OUT, 'hero.png')).size / 1024).toFixed(0) + ' KB');

  // preview sobre o creme da pagina
  await sharp({ create: { width: f.width, height: f.height, channels: 4, background: '#F0E5D6' } })
    .composite([{ input: path.join(OUT, 'hero.webp') }]).jpeg({ quality: 80 })
    .toFile(path.join(OUT, '_teste-hero.jpg'));
})();
