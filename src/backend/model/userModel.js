const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, dropDups: true},
    password: {type: String, required: true},
    events : {type: Array}
})

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;