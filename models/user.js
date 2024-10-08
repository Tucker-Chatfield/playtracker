const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  yourTeams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
