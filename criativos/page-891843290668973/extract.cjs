const fs = require('fs');
const b = fs.readFileSync('bundle.js', 'utf8');
const m = b.match(/"[^"]{15,400}"/g) || [];
const pt = m.filter(s => /molde|bolo|receit|garanti|acesso|voc[eê]|R\$|forno|doce|lucr|vend|b[oô]nus|comprar|hoje|pix|cart/i.test(s));
console.log([...new Set(pt)].join('\n'));
