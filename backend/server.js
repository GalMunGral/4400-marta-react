const express = require('express');
const Sequelize = require('sequelize');

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



const sequelize = new Sequelize('marta', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});



const Passenger = sequelize.define('passenger', {
  username: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
  }
}, {
  timestamps: false,
  freezeTableName: true,
});

const Breezecard = sequelize.define('breezecard', {
  breezecardNum: {
    type: Sequelize.CHAR,
    primaryKey: true,
  },
  value: {
    type: Sequelize.DECIMAL,
  },
  belongsTo: {
    type: Sequelize.STRING,
  }
}, {
  timestamps: false,
  freezeTableName: true
});

const Conflict = sequelize.define('conflict', {
  username: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  breezecardNum: {
    type: Sequelize.CHAR,
    primaryKey: true,
  },
  dateTime: {
    type: Sequelize.TIME
  }
}, {
  timestamps: false,
  freezeTableName: true
});

const Station = sequelize.define('station', {
  stopId: {
    type: Sequelize.CHAR,
    primaryKey: true
  },
  name: {
    type: Sequelize.CHAR,
  },
  enterFare: {
    type: Sequelize.DECIMAL,
  },
  closedStatus: {
    type: Sequelize.BOOLEAN,
  },
  isTrain: {
    type: Sequelize.BOOLEAN
  }
}, {
  timestamps: false,
  freezeTableName: true
});

const BusStationIntersection = (
  sequelize.define('bus_station_intersection', {
    stopId: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    intersection: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false,
    freezeTableName: true
  })
);

const Trip = sequelize.define('trip', {
  tripFare: {
    type: Sequelize.DECIMAL,
  },
  startTime: {
    type: Sequelize.TIME,
    primaryKey: true
  },
  breezecardNum: {
    type: Sequelize.CHAR,
    primaryKey: true
  },
  startsAt: {
    type: Sequelize.STRING,
  },
  endsAt: {
    type: Sequelize.STRING,
  }
}, {
  timestamps: false,
  freezeTableName: true
})

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