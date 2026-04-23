const fs = require('fs');
const s = fs.readFileSync('public/blog/post-2.html', 'utf8');
const classes = new Set();
const regex = /class="([^"]+)"/g;
let m;
while ((m = regex.exec(s)) !== null) {
    m[1].split(' ').forEach(c => classes.add(c));
}
console.log(Array.from(classes));
