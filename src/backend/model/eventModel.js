const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title:{type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
})

const eventModel = mongoose.model("Event",eventSchema);

module.exports = eventModel;