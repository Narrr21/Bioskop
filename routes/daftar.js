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

router
    .route('/delete')
    .get(async (req, res) =>{
        res.render('daftar/delete', {listFilm: await db.getAllFilm()})
    })
    .post(async (req, res) => {
        var id = req.body.isDelete
        var filmTitle = (await db.getFilmById(id))["title"]
        res.render('daftar/delete', {filmUpdate: filmTitle, listFilm: await db.getAllFilm()})
    })
module.exports = router