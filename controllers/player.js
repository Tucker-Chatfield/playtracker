const express = require('express');
const router = express.Router();
const Player = require('../models/player.js');
const isSignedIn = require('../middleware/is-signed-in.js');

// Index - Show all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find();
        const isSignedIn = req.session.user !== undefined;
        res.render('players/index', { players, isSignedIn });
    } catch (error) {
        res.status(500).render('error', { message: 'Error fetching players' });
    }
});

// New - Show form to add a new player
router.get('/new', isSignedIn, (req, res) => {
    res.render('players/new');
});

// Create - Add a new player
router.post('/', isSignedIn, async (req, res) => {
    try {
        const newPlayer = new Player(req.body);
        await newPlayer.save();
        res.redirect('/players');
    } catch (error) {
        res.status(400).render('error', { message: 'Error creating player' });
    }
});

// Update - Update a player
router.put('/:id', isSignedIn, async (req, res) => {
    try {
        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedPlayer) {
            return res.status(404).render('error', { message: 'Player not found' });
        }
        res.redirect('/players');
    } catch (error) {
        res.status(400).render('error', { message: 'Error updating player' });
    }
});

// Delete - Delete a player
router.delete('/:id', isSignedIn, async (req, res) => {
    try {
        const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
        if (!deletedPlayer) {
            return res.status(404).render('error', { message: 'Player not found' });
        }
        res.redirect('/players');
    } catch (error) {
        res.status(500).render('error', { message: 'Error deleting player' });
    }
});

module.exports = router;