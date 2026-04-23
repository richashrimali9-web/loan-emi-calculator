const fs = require('fs');

let c = fs.readFileSync('public/contact/index.html', 'utf8');

c = c.replace(/placeholder="What is this about- \/>/, 'placeholder="What is this about?" />');

fs.writeFileSync('public/contact/index.html', c);
