const express = require('express');
const Op = require('sequelize').Sequelize.Op;
const { Breezecard, Conflict } = require('../models');
const { parseRawData } = require('../utilities');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    const {
      belongsTo,
      breezecardNum,
      minValue,
      maxValue,
      dateTime,
      attr,
      dir
    } = req.query;

    Breezecard.findAll({
      attributes: [ 'breezecardNum', 'value', 'belongsTo'],
      include: [{
        model: Conflict,
        attributes: ['dateTime'],
        where: { dateTime: dateTime || { [Op.not]: null } }
      }],
      where: {
        belongsTo: belongsTo || { [Op.not]: null },
        breezecardNum: breezecardNum || { [Op.not]: null },
        value: maxValue ? {
          [Op.gte]: minValue || 0,
          [Op.lte]: maxValue, 
        } : { [Op.gte]: minValue || 0 }
      },
      raw: true
    })
    .then(vals => parseRawData(vals, attr, dir))
    .then(result => res.send(result))
  })


router.route('/add-value')
.post((req, res) => {
  connection.query(
      `UPDATE Breezecard
      SET Value = Value + ${req.body.valueToAdd}
      WHERE BreezecardNum = "${req.body.Number}"`,
      () => {
          res.send({});
      });
});


router.delete('/remove-card')
.post((req, res) => {
  connection.query(
      `UPDATE Breezecard
      SET BelongsTo = NULL
      WHERE "${req.body.Username}" IN (SELECT *
                                      FROM (
                                          (SELECT BelongsTo
                                          FROM Breezecard
                                          GROUP BY BelongsTo
                                          HAVING COUNT(*) > 1) AS TGT)
                                      ) AND
      BreezecardNum = "${req.body.Number}"`,
      () => {
          res.send();
      });
});

module.exports = router;