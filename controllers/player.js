const express = require('express');
const router = express.Router();

const Player = require('../models/player.js');

router.get('/', async (req, res) => {
  try {
    res.send('This is the player route');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;