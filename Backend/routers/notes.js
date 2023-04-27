const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchUser = require('../midlewere/fetchuser');
const { body, validationResult } = require('express-validator');

router.get('/fetchallnots', fetchUser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });

        let name = req.user.name;
        res.json({ name, notes });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Intranal server Errored");
    }
})

router.post('/addnots', fetchUser, [
    body('title', 'Enter a Valid Title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const notes = new Note({
                title, description, tag, user: req.user.id,
            })
            const savenotes = await notes.save();
            res.json(savenotes);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Intranal server Errored");
        }
    })

router.put('/updatenots/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Intranal server Errored");
    }
})

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;
