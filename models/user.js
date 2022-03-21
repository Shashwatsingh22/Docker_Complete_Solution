const mongoose = require('mongoose');

var ObjectId = require('mongodb').ObjectID;
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    machineip: [{ type: String, unique: true}],
    email: { type: String, },
    username: {type: String},
    password: { type: String, }
});

module.exports = mongoose.model('User', userSchema);