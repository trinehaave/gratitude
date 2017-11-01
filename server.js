const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const entriesRoutes = require('./routes/entries-routes')
const userRoutes = require('./routes/user-routes')
const config = require('./config')

const app = express()
const port = process.env.PORT || config.port

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(morgan('common'))
mongoose.connect(config.databaseUrl)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () { console.log('Connected to a database') });

app.use('/entries', entriesRoutes)
//any call that starts with /entries, use entriesRoutes (entriesRoutes is the routes/entries-routes.js)

app.use('/user', userRoutes)

app.listen(port, () => {
  console.log(`Gratitude journal magic is happening on port ${port}`)
})
