const mongoose = require('mongoose')
const moment = require('moment')

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    date: {type: String, default: moment(Date.now()).format("ddd, MMM Do Y")}
})

module.exports = mongoose.model('user', userSchema)
