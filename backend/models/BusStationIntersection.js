module.exports = (sequelize, DataTypes) => sequelize.define(
  'bus_station_intersection',
  {
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
  }
);
