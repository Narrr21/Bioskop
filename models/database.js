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
    if (data[0][0] !== undefined){
        return data[0][0]
    } else {
        return NaN
    }
}

async function getFilmByTitle(title) 
{
    const data = await pool.query(`
    SELECT * 
    FROM film
    WHERE title = ?
    `, [title])
    if (data[0][0] !== undefined){
        return data[0][0]
    } else {
        return NaN
    }
    
}

async function getFilmByYear(year) 
{
    const data = await pool.query(`
    SELECT * 
    FROM film
    WHERE release_year = ?
    `, [year])
    if (data[0][0] !== undefined){
        return data[0]
    } else {
        return NaN
    }
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

// getFilmById(124)
// getFilmByYear()

module.exports = {
    getAllFilm,
    getFilmById,
    getFilmByTitle,
    getFilmByYear,
    addFilm,
    deleteFilmById
}