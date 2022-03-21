const mongoose = require('mongoose');

var ObjectId = require('mongodb').ObjectID;
const machineSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    machineip: { type: String, }
});

module.exports = mongoose.model('machine', machineSchema);