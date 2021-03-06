const express = require('express')
const userModel = require('../models/user-model')
const mongoose = require('mongoose')

const userCollection = mongoose.connection.collection('user')

const router = express.Router()

router.route('/')
  .get((req, res) => {
    userModel.find({})
      .then((users) => {
        res.status(200).json(users)
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send("something has happened")
      })
  })

  router.route('/:username')
    .get((req, res) => {
      userModel.find({
          username: req.params.username
        })
        .then((user) => {
          res.status(200).json(user)
        })
        .catch((error) => {
          console.log(error)
          res.status(500).send("something has happened")
        })
    })

router.route('/')
  .post((req, res) => {
    let newUser = new userModel()
    newUser.username = req.body.username
    newUser.password = req.body.password

    newUser.save()
      .then(() => {
        res.status(200).send('User has been saved')
      })
      .catch(() => {
        res.status(500).send('Something went wrong :(')
      })
  })

// router.route('/')
//   .put((req, res) => {
//     console.log('put')
//     res.send('changing/putting user')
//   })

router.route('/deleteAll')
  .delete((req, res) => {
  userCollection.drop()
      .then((result) => {
        res.status(200).send('User database cleared')
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send('Something went wrong :(')
      })
  })


router.route('/:username')
  .delete((req, res) => {
    userModel.findOneAndRemove({
        username: req.params.username
      })
      .then(() => {
        res.status(200).send('User has been deleted')
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send('Something went wrong :(')
      })
  })

  router.route('/:username')
    .put((req, res) => {
      userModel.findOneAndUpdate({
        username: req.params.username
      }, {
        $set: {
          username: req.body.username,
          password: req.body.password,
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

module.exports = router
