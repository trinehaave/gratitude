const express = require('express')
const userModel = require('../models/user-model')
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

router.route('/')
  .put((req, res) => {
    console.log('put')
    res.send('changing/putting user')
  })

router.route('/')
  .delete((req, res) => {
    console.log('delete')
    res.send('deleting user')
  })

module.exports = router
