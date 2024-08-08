const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  team_name: {
    type: String,
    required: true,
  },
  league: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
