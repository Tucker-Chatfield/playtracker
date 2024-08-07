const express = require('express');
const router = express.Router();
const Team = require('../models/team.js');
const Player = require('../models/player.js');

router.get('/', async (req, res) => {
    try {
        const teamCount = await Team.countDocuments();
        const playerCount = await Player.countDocuments();
        
        // This is a placeholder for recent activity
        const recentActivity = [
        ];

        res.render('dashboard', { 
            teamCount, 
            playerCount, 
            recentActivity,
            user: req.session.user  
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).render('error', { message: 'Error loading dashboard' });
    }
});

module.exports = router;