const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: String,
    link: String,
    description: String,
    projectType: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema)