const express = require('express')
const router = express.Router()
const db = require('../models/database')

router
    .route('/')
    .get(async (req, res) => {
        res.render('search/index', {listFilm: null, search: "a"})
    })
    .post(async (req, res) => {
        const searchBy = req.body.searchBy
        const search = req.body.search
        if (searchBy == "id"){
            var film = [await db.getFilmById(search)]
        } else if (searchBy == "title"){
            var film = [await db.getFilmByTitle(search)]
        } else if (searchBy == "year"){
            var film = await db.getFilmByYear(search)
        } else {
            res.redirect('/')
        }
        res.render('search/index', {listFilm: film, search: searchBy})
    })

module.exports = router