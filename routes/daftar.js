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
        const title = req.body.title
        const imdbID = req.body.id
        const year = req.body.year
        const type = req.body.type
        const poster = req.body.poster
        await db.addFilm(imdbID, title, year, type, poster)
        res.render('daftar/add', {filmUpdate: title})
    })

router
    .route('/delete')
    .get(async (req, res) =>{
        res.render('daftar/delete', {listFilm: await db.getAllFilm()})
    })
    .post(async (req, res) => {
        var id = req.body.isDelete
        var filmTitle = (await db.getFilmById(id))["title"]
        await db.deleteFilmById(id)
        res.render('daftar/delete', {filmUpdate: filmTitle, listFilm: await db.getAllFilm()})
    })
module.exports = router