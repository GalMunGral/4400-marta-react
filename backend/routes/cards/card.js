const { Breezecard } = require('../../models');
const router = require('express').Router();  

router.post('/', async (req, res) => {
    const { breezecardNum } = req.params;
    const { value } = req.body;
    const card = await Breezecard.findById(breezecardNum)
    await card.increment('value', { by: value })
    res.send({ success: true, data: card });
  })

router.delete('/', async (req, res) => {
    const { breezecardNum } = req.params;
    const { username } = req.body;
    if (!username) {
      return res.send({success: false, error: 'Permission denied' });
    }
    let card;
    try {
      card = await Breezecard.findOne({
        where: { breezecardNum }
      });
      if (card.belongsTo !== username) {
        throw 'You don\'t own this card';
      }
      await Breezecard.update({
        belongsTo: null
      }, {
        where: { breezecardNum, belongsTo: username }
      });
      return res.send({ success: true, card });
    } catch(error) {
      console.log(error)
      return res.send({ success: false, card, error });
    }  
  });

module.exports = router;

// router.route('/update-card-value')
// .post((req, res) => {
//     connection.query(
//         `UPDATE Breezecard
//         SET Value = ${req.body.newValue}
//         WHERE BreezecardNum = "${req.body.Number}"`,
//         () => {
//             res.send({});
//         });
// });
// router.route('/update-card-owner')
// .post((req, res) => {
//     connection.query(
//         `UPDATE Breezecard
//         SET BelongsTo = "${req.body.newOwner}"
//         WHERE BreezecardNum = "${req.body.Number}"`,
//         (err) => {
//             if (err) {
//                 res.send({err: "User does not exist! Time: " + new Date()});
//             } else {
//                 res.send({});
//             }
//         });
// });