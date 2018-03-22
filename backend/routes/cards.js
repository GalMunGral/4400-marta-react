const express = require('express');
const Op = require('sequelize').Sequelize.Op;
const { Breezecard, Conflict } = require('../models');
const { parseRawData } = require('../utilities');

const router = express.Router();

router.route('/')

  .get(async (req, res) => {
    const {
      belongsTo,
      breezecardNum,
      minValue,
      maxValue,
      dateTime,
      attr,
      dir
    } = req.query;

    const card = await Breezecard.findAll({
      attributes: [ 'breezecardNum', 'value', 'belongsTo'],
      include: [{
        model: Conflict,
        attributes: ['dateTime'],
        where: { 
          dateTime: dateTime || { [Op.not]: null } 
        }
      }],
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
    res.send(parseRawData(cards, attr, dir));
  })

  .put(async (req, res) => {
    const { value, breezecardNum } = req.body;
    const card = await Breezecard.findById(breezecardNum)
    await card.increment('value', { by: value })
    res.send({ success: true });
  })

  .delete((req, res) => {
    const { username, number } = req.body;
    const users = await Breezecard.findAll({ attributes: ['belongsTo'] });
    Breezecard.update({
      belongsTo: null
    }, {
      where: {
        breezecardNum: breezecardNum,
        username: {
          [Op.in]: users
        }
      }
    });
    res.send({ success: true });
  });


module.exports = router;