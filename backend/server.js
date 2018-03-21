const express = require('express');
const Sequelize = require('sequelize');

// const path = require('path');
const bodyParser = require('body-parser');
const api = require('./routes');

const app = express();

const sequelize = new Sequelize('marta', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const router = express.Router();
// const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/assets', express.static(path.join(__dirname, 'frontend/assets')));
app.use('/api', api);

// app.get('/*', (request, response) => {
//     response.sendFile(__dirname + '/public/index.html');
// });

// app.listen(PORT, error => {
//     error
//     ? console.error(error)
//     : console.info(`Listening on port ${PORT}!`);
// });

const { User } = require('./models/User');

User.findAll().then((users) => {
  console.log(users.map(d => d.dataValues));
});

console.log(User)

app.get('/', function(req, res){
  // res.send('lalala');
});

app.listen(3000, () => {
  console.log('Listening on port 3000!')
});