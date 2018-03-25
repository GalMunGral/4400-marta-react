const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/', require('./routes/auth'));
app.use('/cards', require('./routes/cards'));
app.use('/stations', require('./routes/stations'));

app.listen(3000, () => {
  console.log('Listening on port 3000!')
});