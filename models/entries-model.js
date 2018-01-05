const mongoose = require('mongoose')
const moment = require('moment')

let entrySchema = new mongoose.Schema({
    date: {type: String, default: new Date()},
    gratefuls: [String],
    goalTomorrow: String,
    author: String,
    authorId: mongoose.Schema.ObjectId
})

module.exports = mongoose.model('entries', entrySchema)
