const express = require('express')

const router = express.Router()

router.route('/')
  .get((req, res) => {
    console.log('get')
    res.send('hello entries')
  })

module.exports = router
