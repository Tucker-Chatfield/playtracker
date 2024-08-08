const express = require('express');
const router = express.Router();
const Team = require('../models/team.js');
const Player = require('../models/player.js');
const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id).populate('yourTeams');
        const yourTeams = user.yourTeams.filter(team => team.your_team);

        const playerCount = await Player.countDocuments();
        
        // This is a placeholder for recent activity
        const recentActivity = [
        ];

        res.render('dashboard', { 
            yourTeams, 
            playerCount, 
            recentActivity,
            user: req.session.user  
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    }
});

module.exports = router;