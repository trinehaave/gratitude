const express = require('express')
const entryModel = require('../models/entries-model')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config')

const entryCollection = mongoose.connection.collection('entries')

const router = express.Router()

//Middleware
router.use((req, res, next) => {
  console.log("route middleware");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//middleware for login
router.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }
  const token = req.headers.authorization || req.body.token
  if (!token) {
    res.status(401).json('Not authorized')
    return
  }
  jwt.verify(token, config.secret, (error, decode) => {
    if (error) {
      res.status(500).json({
        message: "Token is not valid"
      })
      return
    }
    req.user = decode
    next()
  })
})

router.route('/searchByUser/:userId')
  .get((req, res) => {
    entryModel
      .find({authorId: req.params.userId})
      .sort({
        date: 1
      })
      .then((entries) => {
        res.status(200).json(entries)
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send("something has happened")
      })
  })

router.route('/:entryId')
  .get((req, res) => {
    entryModel.find({
        _id: req.params.entryId
      })
      .then((entry) => {
        res.status(200).json(entry)
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send("something has happened")
      })
  })

router.route('/')
  .post((req, res) => {
    let newEntry = new entryModel()
    newEntry.author = req.body.author
    newEntry.authorId = req.body.authorId
    newEntry.gratefuls = req.body.gratefuls
    newEntry.goalTomorrow = req.body.goalTomorrow


    newEntry.save()
      .then((entry) => {
        res.status(200).json({
          message: 'entry has been saved',
          data: entry
        })
      })
      .catch(() => {
        res.status(500).send('Something went wrong :(')
      })
  })

// router.route('/')
//   .put((req, res) => {
//     console.log('put')
//     res.send('changing/putting entries')
//   })

router.route('/deleteAll')
  .delete((req, res) => {
    entryCollection.drop()
      .then((result) => {
        res.status(200).send('Entry database cleared')
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send('Something went wrong :(')
      })
  })

router.route('/delete/:entryId')
  .delete((req, res) => {
    console.log('delete')
    entryModel.findOneAndRemove({
        _id: req.params.entryId
      })
      .then(() => {
        res.status(200).send('Entry has been deleted')
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send('Something went wrong :(')
      })
  })

router.route('/:entryId')
  .put((req, res) => {
    entryModel.findOneAndUpdate({
      _id: req.params.entryId
    }, {
      $set: {
        author: req.body.author,
        gratefuls: req.body.gratefuls,
        goalTomorrow: req.body.goalTomorrow
      }
    }, {
      new: true
    }).exec(
      function(err, entry) {
        if (err || !entry) {
          console.log(err);
          return res.status(500).json({
            message: 'Internal Server Error'
          })
        }
        console.log(entry);
        res.status(200).json(entry);
      })
  })

//search for entries with specific phrases and list
//get all entries
//search field gratefuls(array) and goal for tomorrow for string

router.route('/query/:phrase')
  .get((req, res) => {
    let matches = entryCollection.find({
        gratefuls: req.params.phrase
      }).toArray()
      .then((matches) => {
        if (matches.length == 0) {
          res.status(404).json("Nothing found")
          return
        }
        res.status(200).json(matches)
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send("something has happened")
      })
  })


module.exports = router
