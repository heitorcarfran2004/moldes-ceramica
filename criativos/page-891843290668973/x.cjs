const fs=require('fs');
const b=fs.readFileSync('bundle.js','utf8');
const m=b.match(/"[^"\]{20,300}"/g)||[];
const pt=m.filter(s=>/molde|bolo|receit|garanti|acesso|voc|R\$|forno|doce|lucr|vend/i.test(s));
console.log([...new Set(pt)].join('\n'));
