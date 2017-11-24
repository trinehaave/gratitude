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
        if (user) {
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

router.route('/login')
  .post((req, res) => {
    userModel.findOne({
        username: req.body.username
      })
      .then((user) => {
        if (!user) {
          res.status(200).json('Username or password is wrong')
          return
        }

        let password = passwordHash.generate(req.body.password)
          .then(() => {
            if (password == res.body.password) {
              res.status(200).send('success')
            }
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




Steps
for login
1. - in the route check
for the user(findOne)
2. - If user does not exist send a message and
return
3. - If user exist check the password 'passwordHash.verify(req.body.password, user.password)'
4. - If the password its ok generate the token https: //github.com/auth0/node-jsonwebtoken

  https: //www.npmjs.com/package/password-hash


  module.exports = router
