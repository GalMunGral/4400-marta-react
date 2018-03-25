const { Breezecard, Conflict } = require('../../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const { attr, dir } = req.query;
  try{
    const conflicts = await Conflict.findAll({
      attributes: [ 'username', 'dateTime'],
      include: [{
        model: Breezecard,
        attributes: ['breezecardNum', 'belongsTo']
      }],
      raw: true
    });
    // TODO: order
    return res.send(conflicts);
  } catch(error) {
    return res.send(error);
  }
});

module.exports = router;

// router.route('/resolve-conflict')
// .post((req, res) => {
//     if (req.body.willAssignToNewOwner) {
//         connection.query(
//             `UPDATE Breezecard
//             SET BelongsTo = "${req.body.newOwnerName}"
//             WHERE BreezecardNum = "${req.body.BNumber}"`,
//         () => {
//             res.send({});
//         });
//     }
//     connection.query(
//         `DELETE FROM Conflict WHERE BreezecardNum = "${req.body.BNumber}"`
//     );
// });