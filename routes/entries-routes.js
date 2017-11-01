const express = require('express')

const router = express.Router()

router.route('/')
  .get((req, res) => {
    console.log('get')
    res.send('getting entries')
  })

router.route('/')
  .post((req, res) => {
    console.log('post')
    res.send('posting entries')
  })

router.route('/')
  .put((req, res) => {
    console.log('put')
    res.send('changing/putting entries')
  })

router.route('/')
  .delete((req, res) => {
    console.log('delete')
    res.send('deleting entries')
  })

module.exports = router
