const express = require('express')
const entryModel = require('../models/entries-model')
const mongoose = require('mongoose')

const entryCollection = mongoose.connection.collection('entries')

const router = express.Router()

router.route('/')
    .get((req, res) => {
        entryModel.find({})
            .then((entries) => {
                res.status(200).json(entries)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).send("something has happened")
            })
    })

router.route('/')
    .post((req, res) => {
        var newEntry = new entryModel()
        newEntry.author = req.body.author
        newEntry.gratefuls = req.body.gratefuls
        newEntry.goalTomorrow = req.body.goalTomorrow

        newEntry.save()
            .then(() => {
                res.status(200).send('Entry has been saved')
            })
            .catch(() => {
                res.status(500).send('Something went wrong :(')
            })
    })

router.route('/')
    .put((req, res) => {
        console.log('put')
        res.send('changing/putting entries')
    })

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
        entryModel.findOneAndRemove({_id: req.params.entryId})
            .then(() => {
                res.status(200).send('Entry has been deleted')
            })
            .catch((error) => {
                console.log(error)
                res.status(500).send('Something went wrong :(')
            })
    })



module.exports = router
