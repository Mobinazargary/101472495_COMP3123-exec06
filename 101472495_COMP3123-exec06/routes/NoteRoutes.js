const express = require('express');
const router = express.Router();
const noteModel = require('../models/NotesModel');  // Adjust path as necessary

// Create a new Note
router.post('/', (req, res) => {
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note title and description cannot be empty"
        });
    }

    const note = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateAdded: Date.now()
    });

    note.save()
        .then(data => res.status(201).send(data))
        .catch(err => res.status(500).send({
            message: err.message || "An error occurred while saving the note."
        }));
});

// Retrieve all Notes
router.get('/', (req, res) => {
    noteModel.find()
        .then(notes => res.send(notes))
        .catch(err => res.status(500).send({
            message: err.message || "An error occurred while retrieving notes."
        }));
});

// Retrieve a single Note by noteId
router.get('/:noteId', (req, res) => {
    noteModel.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        })
        .catch(err => res.status(500).send({
            message: err.message || "An error occurred while retrieving the note."
        }));
});

// Update a Note by noteId
router.put('/:noteId', (req, res) => {
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note title and description cannot be empty"
        });
    }

    noteModel.findByIdAndUpdate(req.params.noteId, {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateUpdated: Date.now()
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        })
        .catch(err => res.status(500).send({
            message: err.message || "An error occurred while updating the note."
        }));
});

// Delete a Note by noteId
router.delete('/:noteId', (req, res) => {
    noteModel.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        })
        .catch(err => res.status(500).send({
            message: err.message || "An error occurred while deleting the note."
        }));
});

module.exports = router;
