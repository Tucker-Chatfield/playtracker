const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batting_avg: {
    type: String,
    required: true,
  },
  home_runs: {
    type: Number,
    required: true,
  },
  rbi: {
    type: Number,
    required: true,
  },
  runs: {
    type: Number,
    required: true,
  },
  stolen_bases: {
    type: Number,
    required: true,
  },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
