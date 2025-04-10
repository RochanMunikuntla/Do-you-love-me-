const path = require('path');
const express = require('express');
const app = express();

const isPkg = typeof process.pkg !== 'undefined';
const basePath = isPkg ? path.dirname(process.execPath) : __dirname;

app.set('view engine', 'ejs');
app.set('views', path.join(basePath, 'views'));

app.use(express.urlencoded({ extended: true }));

let noCount = 0;

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/answer', (req, res) => {
  const { love } = req.query;
  if (love === 'yes') {
    noCount = 0;
    res.render('yes');
  } else {
    noCount++;
    res.render('no', { noCount });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
