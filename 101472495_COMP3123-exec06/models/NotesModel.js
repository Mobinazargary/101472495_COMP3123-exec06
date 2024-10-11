const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    noteDescription: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['HIGH', 'LOW', 'MEDIUM'],  // Restricts values to these options
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now  // Automatically sets the date when the note is created
    },
    dateUpdated: {
        type: Date,
        default: Date.now  // Automatically sets the date when the note is updated
    }
});

// This will automatically update 'dateUpdated' whenever the document is modified
noteSchema.pre('save', function (next) {
    this.dateUpdated = Date.now();
    next();
});

module.exports = mongoose.model('Note', noteSchema);