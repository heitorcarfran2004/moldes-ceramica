const fs = require('fs');
const b = fs.readFileSync('bundle.js', 'utf8');
const i = b.indexOf('Finalizar Sua Compra');
const before = b.slice(0, i);
// pega todas as declaracoes "const X=(" antes, a ultima e provavelmente o componente
const m = [...before.matchAll(/const ([A-Za-z_$][\w$]*)=\(?\{?[^=]{0,40}\)?=>/g)];
const cands = m.slice(-8).map(x => x[1]);
console.log('CANDIDATOS A COMPONENTE:', cands.join(', '));
cands.forEach(name => {
  const re = new RegExp('[^\\w$]' + name.replace(/\$/g, '\\$') + '[^\\w$]', 'g');
  const n = (b.match(re) || []).length;
  console.log('  ' + name + ' -> ' + n + ' referencias no bundle');
});
// o botao que abre: procura por onClick perto de "COMPRAR"/"ACESSAR" que NAO seja href
console.log('\n--- CTAs: href externo vs onClick ---');
console.log('links pay.wiapy:', (b.match(/pay\.wiapy\.com/g) || []).length);
console.log('href= com wiapy:', (b.match(/href:"https:\/\/pay\.wiapy/g) || []).length);
