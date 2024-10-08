const express = require('express');
const router = express.Router();
const Team = require('../models/team.js');
const isSignedIn = require('../middleware/is-signed-in.js');
const User = require('../models/user.js')

// Index - Show all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find();
        const isSignedIn = req.session.user !== undefined;
        res.render('teams/index', { teams, isSignedIn });
    } catch (error) {
        res.status(500).render('error', { message: 'Error fetching teams' });
    }
});

// New - Show form to add a new team
router.get('/new', isSignedIn, (req, res) => {
    res.render('teams/new');
});

// Edit - Show form to edit a team
router.get('/:id/edit', isSignedIn, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).render('error', { message: 'Team not found' });
    }
    res.render('teams/edit', { team });
  } catch (error) {
    res.status(500).render('error', { message: 'Error fetching team' });
  }
});

// Create - Add a new team
router.post('/', isSignedIn, async (req, res) => {
    try {
        const newTeam = new Team(req.body);
        await newTeam.save();
        res.redirect('/teams');
    } catch (error) {
        res.status(400).render('error', { message: 'Error creating team' });
    }
});

// Update - Update a team
router.put('/:id', isSignedIn, async (req, res) => {
    try {
        // Update the team details based on the form submission
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id, {
            team_name: req.body.team_name,
            league: req.body.league,
        }, { new: true, runValidators: true });

        if (!updatedTeam) {
            return res.status(404).render('error', { message: 'Team not found' });
        }

        // If "Your Team" checkbox is checked, add this team to the user's yourTeams array
        if (req.body.yourTeam) {
            await User.findByIdAndUpdate(req.session.user._id, { $addToSet: { yourTeams: updatedTeam._id } });
        } else {
            // If "Your Team" checkbox is unchecked, remove the team from the user's yourTeams array
            await User.findByIdAndUpdate(req.session.user._id, { $pull: { yourTeams: updatedTeam._id } });
        }

        // Redirect to the teams page after the update
        res.redirect('/teams');
    } catch (error) {
        console.error('Error updating team:', error);
    }
});

// Delete - Delete a team
router.delete('/:id', isSignedIn, async (req, res) => {
    try {
        const deletedTeam = await Team.findByIdAndDelete(req.params.id);
        if (!deletedTeam) {
            return res.status(404).render('error', { message: 'Team not found' });
        }
        res.redirect('/teams');
    } catch (error) {
        res.status(500).render('error', { message: 'Error deleting team' });
    }
});

module.exports = router;