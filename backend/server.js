const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use((_, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  next();
});

const router = express.Router();
router.use('/auth', require('./routes/auth'));
router.use('/stations', require('./routes/stations'));
router.use('/passenger', require('./routes/passenger'));
router.use('/admin', require('./routes/admin'));
app.use('/api', router);

app.listen(PORT, error => {
  error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}!`);
});