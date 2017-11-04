const mongoose = require('mongoose')
const moment = require('moment')

let entrySchema = new mongoose.Schema({
    date: {type: String, default: moment(Date.now()).format("ddd, MMM Do Y")},
    // grateful: {one: String, two: String, three: String},
    gratefuls: [String],
    goalTomorrow: String,
    author: String
})

module.exports = mongoose.model('entries', entrySchema)