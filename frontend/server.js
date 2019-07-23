const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000

app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, '/assets')));
app.get('/*', (request, response) => {
    response.sendFile(__dirname + '/public/index.html');
});
app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}!`);
});