const express = require('express');
const router = express.Router();
const Team = require('../models/team.js');
const isSignedIn = require('../middleware/is-signed-in.js');

router.get('/', async (req, res) => {
  try{
    const teams = await Team.find();
    const isSignedIn = req.session.user !== undefined;
    res.render('teams/index', { teams, isSignedIn });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', isSignedIn, async (req, res) => {
  res.render('teams/new', { team: {} });
});

router.post('/', isSignedIn, async (req, res) => {
  const { team_name, league } = req.body;
  
  try {
    const newTeam = new Team({ team_name, league });
    await newTeam.save();
    res.status(201).json({ message: 'Team created successfully', team: newTeam });
    res.redirect('/teams');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating team' });
  }
});

router.get('/:id/edit', isSignedIn, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).render('error', { message: 'Team not found' });
    }
    res.render('teams/new', { team });
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { message: 'Error loading team for edit' });
  }
});

router.post('/:id', isSignedIn, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    team.team_name = req.body.name;

    await team.save();
    res.redirect('/teams');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;