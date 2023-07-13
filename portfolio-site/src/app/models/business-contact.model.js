const mongoose = require('mongoose');

const businessContactSchema = mongoose.Schema({
    contactName: String,
    contactNumber: String,
    emailAddress: String
}, {
    timestamps: true
});

module.exports = mongoose.model('BusinessContact', businessContactSchema)
