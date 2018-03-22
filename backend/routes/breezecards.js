const { Breezecard, Conflict } = require('../models');
const Op = require('sequelize').Sequelize.Op;

const get = (req, res) => {
  const {
    belongsTo,
    breezecardNum,
    minValue,
    maxValue,
    dateTime,
    attr,
    dir
  } = req.query;

  // "conflicts.dateTime": 0

  Breezecard.findAll({
    attributes: [
      'breezecardNum',
      'value',
      'belongsTo'
    ],
    include: [{
      model: Conflict,
      // attributes: []
    }],
    where: {
      belongsTo: belongsTo || {
        [Op.not]: null
      },
      breezecardNum: breezecardNum || {
        [Op.not]: null
      },
      value: maxValue ? {
        [Op.gte]: minValue || 0,
        [Op.lte]: maxValue, 
      } : {
        [Op.gte]: minValue || 0
      },
      // [conflict.dateTime]: ''
    },
    raw: true
  })
  .then(vals => parseRawData(vals, attr, dir))
  .then(result => res.send(result))
};



//   if (req.query.showSuspended === "false") {
//       array.push("DateTime IS NULL");


module.exports.get = get;