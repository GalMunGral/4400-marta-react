const Op = require('sequelize').Sequelize.Op;
const { Breezecard, Conflict } = require('../models');
const { parseRawData } = require('../utilities');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const {
    belongsTo,
    breezecardNum,
    minValue,
    maxValue,
    attr,
    dir
  } = req.query;
  try {
    const cards = await Breezecard.findAll({
      attributes: [ 'breezecardNum', 'value', 'belongsTo'],
      where: {
        belongsTo: belongsTo || { [Op.not]: null },
        breezecardNum: breezecardNum || { [Op.not]: null },
        value: maxValue ? {
          [Op.gte]: minValue || 0,
          [Op.lte]: maxValue, 
        } : { 
          [Op.gte]: minValue || 0 
        }
      },
      raw: true
    })
    return res.send(JSON.stringify(cards));
  } catch(error) {
    return res.send({ success: false, error });
  }
});

router.use('/:breezecardNum', require('./cards/card'));
router.use('/conflicts', require('./cards/conflicts'));
  

module.exports = router;