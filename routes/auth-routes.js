const express = require('express')
const userModel = require('../models/user-model')
const mongoose = require('mongoose')
const passwordHash = require('password-hash')

const userCollection = mongoose.connection.collection('user')

const router = express.Router()


router.route('/register')
  .post((req, res) => {
    userModel.findOne({
      username: req.body.username
    })
    .then((user) => {
      if(user){
        res.status(200).json('user already exists')
        return
      }
      let newUser = new userModel()
      newUser.username = req.body.username
      newUser.password = passwordHash.generate(req.body.password)
      newUser.save()
        .then(() => {
          res.status(200).send('User has been saved')
        })
        .catch(() => {
          res.status(500).send('Something went wrong :(')
        })
    })
    .catch((error) => {
      console.log('inside catch')
      res.json('something has happened')
      return
    })
  })

module.exports = router
