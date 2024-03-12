const express = require('express')
const router = express.Router()

router
    .route('/')
    .get((req, res) => {
        res.render('daftar/index')
    })
    .post((req, res) => {
        res.send('Create')
    })

router.get('/update', (req, res) =>{
    res.render('daftar/update')
})

module.exports = router