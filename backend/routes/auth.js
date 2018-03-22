const express = require('express');
const Op = require('sequelize').Sequelize.Op;
const md5 = require('md5');
const { User, Passenger, Breezecard, Conflict } = require('../models');
const { generateCardNumber } = require('../utilities');Z

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  password = md5(password);
  const user = await User.findOne({
    username: username,
    password: password
  });
  
  if (!user) {
    res.send({ success: false })
  };

  userType: user.isAdmin ? "ADMIN" : "PASSENGER";
  res.send({ success: true, userType });
});

router.post('/register', async (req, res) => {
  const {
    username,
    password,
    email,
    breezecardNum
  } = req.body;

  // Create user
  const user = await User.create({
    username,
    password,
    isAdmin: 0
  });

  // Create passenger
  await Passenger.create({ username, email });

  // If no card# is provided
  if (!breezecardNum) {
    breezecardNum = generateCardNumber();
    await Breezecard.create({ breezecardNum, value: 0, username});
  } else {

    // Check if the card is already created
    const card = await Breezecard.findOne({
      where: { breezecardNum: breezecardNum }
    });
    if (!card) {
      // It's a new card
      await Breezecard.create({
        breezecardNum,
        value: 0,
        username
      });
    } else if (!card.belongsTo) {
      // The cad exists but is not owned by anyone
      await Breezecard.update({ 
        belongsTo: username
      }, { 
        breezecardNum 
      });
    } else if (card.belongsTo !== username) {
      // The card is currently used by someone else
      await Conflict.create({
        username,
        breezecardNum,
        dateTime: sequelize.fn('NOW')
      });
      // Get a random card
      const breezecardNum = generateCardNumber();
      Breezecard.create({
        breezecardNum,
        value: 0,
        username
      });
    }
  }
  res.send({ success: true });    
});

module.exports = router;