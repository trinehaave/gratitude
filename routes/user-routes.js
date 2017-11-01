const express = require('express')

const router = express.Router()


router.route('/')
  .get((req, res) => {
    console.log('get')
    res.send('getting user')
  })

router.route('/')
  .post((req, res) => {
    console.log('post')
    res.send('posting user')
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
