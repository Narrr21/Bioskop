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
    WHERE imdbID = ?
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

async function getFilmByYear(year) 
{
    const data = await pool.query(`
    SELECT * 
    FROM film
    WHERE release_year = ?
    `, [year])
    return data[0]
}

async function addFilm(imdbID, title, year, type, poster){
    const result = await pool.query(`
    INSERT INTO film (imdbID, title, release_year, workType, poster)
    VALUES (?, ?, ?, ?, ?)
    `, [imdbID, title, year, type, poster])
    return result
}

async function deleteFilmById(id){
    const result = await pool.query(`
    DELETE FROM film
    WHERE imdbID = ?
    `, [id])
    return result
}

module.exports = {
    getAllFilm,
    getFilmById,
    getFilmByTitle,
    getFilmByYear,
    addFilm,
    deleteFilmById
}