const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./routes');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/assets', express.static(path.join(__dirname, 'frontend/assets')));
app.use('/api', api);

// app.get('/*', (request, response) => {
//     response.sendFile(__dirname + '/public/index.html');
// });

app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}!`);
});