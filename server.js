const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const entriesRoutes = require('./routes/entries-routes')

const app = express()
const port = process.env.PORT || 8080


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(morgan('common'))

app.use('/entries', entriesRoutes)
//any call that starts with /entries, use entriesRoutes (entriesRoutes is the routes/entries-routes.js)

app.listen(port, () => {
  console.log(`Gratitude journal magic is happening on port ${port}`)
})
