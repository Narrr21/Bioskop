if (process.env.NODE_ENV !== 'production'){
    require('dotenv')
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const homeRouter = require('./routes/home')
const db = require('./models/database')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use('/home', homeRouter)
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("There's an error!")
})

app.get('/', async (req, res) => {
    const film = await db.getFilm(1)
    res.send(film)
})

app.listen(process.env.PORT || 3000)