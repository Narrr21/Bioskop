const express = require('express')
const router = express.Router()
const db = require('../models/database')

router
    .route('/')
    .get(async (req, res) => {
        res.render('search/index', {listFilm: null})
    })
    .post(async (req, res) => {
        const searchBy = req.body.searchBy
        const search = req.body.search
        if (searchBy == "id"){
            film = [await db.getFilmById(search)]
        } else if (searchBy == "title"){
            film = [await db.getFilmByTitle(search)]
        } else if (searchBy == "year"){
            film = await db.getFilmByYear(search)
        } else {
            res.redirect('/')
        }
        console.log(film)
        res.render('search/index', {listFilm: film})
    })

module.exports = router