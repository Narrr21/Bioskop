const express = require('express')
const router = express.Router()
const db = require('../models/database')
router
    .route('/')
    .get(async (req, res) => {
        res.render('daftar/index', {listFilm: await db.getAllFilm()})
    })

router
    .route('/add')
    .get(async (req, res) =>{
        res.render('daftar/add')
    })
    .post(async (req, res) => {
        const filmTitle = req.body.title
        res.render('daftar/add', {filmUpdate: filmTitle})
    })

module.exports = router