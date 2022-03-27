const mongoose = require('mongoose');

var ObjectId = require('mongodb').ObjectID;
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, },
    username: {type: String},
    password: { type: String,}
});

module.exports = mongoose.model('User', userSchema);