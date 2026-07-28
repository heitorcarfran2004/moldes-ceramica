const fs = require('fs');
const b = fs.readFileSync('bundle.js', 'utf8');
['originalPrice:', 'price:', 'checkoutUrl', 'pay.wiapy'].forEach(k => {
  let i = -1;
  while ((i = b.indexOf(k, i + 1)) !== -1) {
    console.log('### ' + k + ' @' + i);
    console.log(b.slice(Math.max(0, i - 400), i + 400).replace(/\s+/g, ' '));
    console.log('');
  }
});
