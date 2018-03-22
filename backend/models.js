const Sequelize = require('sequelize');
const sequelize = new Sequelize('marta', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Breezecard = sequelize.import('./models/Breezecard');
const BusStationIntersection = sequelize.import('./models/BusStationIntersection');
const Conflict = sequelize.import('./models/Conflict');
const Passenger = sequelize.import('./models/Passenger');
const Station = sequelize.import('./models/Station');
const Trip = sequelize.import('./models/Trip');
const User = sequelize.import('./models/User');

BusStationIntersection.belongsTo(Station, {
  foreignKey: 'stopId',
  targetKey: 'stopId'
});
Passenger.belongsTo(User, {
  foreignKey: 'username',
  targetKey: 'username'
});
User.hasOne(Passenger, {
  foreignKey: 'username',
  targetKey: 'username'
})


module.exports = {
  Breezecard,
  BusStationIntersection,
  Conflict,
  Passenger,
  Station,
  Trip,
  User
}