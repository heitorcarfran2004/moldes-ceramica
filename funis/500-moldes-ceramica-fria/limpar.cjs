const fs = require('fs');
const p = __dirname + '/pagina-vendas.html';
let h = fs.readFileSync(p, 'utf8');
const antes = (h.match(/<figcaption/g) || []).length;
// remove as legendas dos slides (figcaption existe apenas no carrossel)
h = h.replace(/<figcaption class="leg">[\s\S]*?<\/figcaption>/g, '');
const depois = (h.match(/<figcaption/g) || []).length;
fs.writeFileSync(p, h);
console.log('figcaptions removidas: ' + antes + ' -> ' + depois);
console.log('slides: ' + (h.match(/class="slide"/g) || []).length);
