const mysql = require ('mysql2')

const dotenv = require ('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// Film
async function getAllFilm() 
{
    const data = await pool.query(`
    SELECT * 
    FROM film
    `)
    return data[0]
}

async function getFilmById(id) 
{
    const data = await pool.query(`
    SELECT * 
    FROM film
    WHERE id = ?
    `, [id])
    return data[0][0]
}

async function getFilmByTitle(title) 
{
    const data = await pool.query(`
    SELECT * 
    FROM film
    WHERE title = ?
    `, [title])
    return data[0][0]
}

async function addFilm(title, release_year, rating){
    const result = await pool.query(`
    INSERT INTO film (title, release_year, rating)
    VALUES (?, ?, ?)
    `, [title, release_year, rating])
    return result
}

async function deleteFilm(id){
    const result = await pool.query(`
    SELECT * 
    FROM film
    WHERE id = ?
    `, [id])
    return result
}


module.exports = {
    getAllFilm,
    getFilmById,
    getFilmByTitle,
    addFilm,
    deleteFilm
}