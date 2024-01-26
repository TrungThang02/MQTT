// index.js
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views'); 

app.get('/', (req, res) => {
  res.render('index', { title: 'My Node.js App' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
