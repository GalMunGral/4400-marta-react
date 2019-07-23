const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3006;

app.use(bodyParser.json());
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    });
    res.end();
  } else {
    next();
  }
});

app.use('/auth', require('./routes/auth'));
app.use('/stations', require('./routes/stations'));
app.use('/passenger', require('./routes/passenger'));
app.use('/admin', require('./routes/admin'));


app.listen(PORT, error => {
  error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}!`);
});