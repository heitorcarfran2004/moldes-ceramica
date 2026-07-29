const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const D = 'C:/Users/thorz/Downloads/iloveimg-compressed/';
const OUT = path.join(__dirname, 'assets', 'depoimentos');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// Ordem = narrativa da secao: medo -> funcionou -> primeira peca -> obstaculo
// resolvido -> primeira venda.
const MAPA = [
  ['whatsapp_chat (3).png', 'dep-1-rosangela'],
  ['whatsapp_chat (4).png', 'dep-2-claudia'],
  ['whatsapp_chat (2).png', 'dep-3-aline-jarra'],
  ['whatsapp_chat (1).png', 'dep-4-jose'],
  ['whatsapp_chat.png', 'dep-5-aline-azeite']
];

(async () => {
  let antes = 0, depois = 0;
  for (const [src, nome] of MAPA) {
    const p = D + src;
    const m = await sharp(p).metadata();
    antes += fs.statSync(p).size;
    // Mantem os 720px nativos: e print com texto, e qualquer reducao borra a
    // leitura. O ganho de encolher para 580 era de 8 KB — nao compensa.
    await sharp(p).webp({ quality: 82, effort: 6 }).toFile(path.join(OUT, nome + '.webp'));
    const f = await sharp(path.join(OUT, nome + '.webp')).metadata();
    const kb = fs.statSync(path.join(OUT, nome + '.webp')).size;
    depois += kb;
    console.log(nome.padEnd(20) + m.width + 'x' + m.height + ' -> ' + f.width + 'x' + f.height +
      '  ' + (kb / 1024).toFixed(0) + ' KB');
  }
  console.log('\nAntes:  ' + (antes / 1048576).toFixed(2) + ' MB');
  console.log('Depois: ' + (depois / 1048576).toFixed(2) + ' MB');
})();
