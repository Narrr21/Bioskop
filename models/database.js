const mysql = require ('mysql2')

const dotenv = require ('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getFilm(id) 
{
    const data = await pool.query(`
    SELECT * 
    FROM film
    WHERE id = ?
    `, [id])
    return data[0][0]
}

async function addFilm(title, release_year, rating){
    const result = await pool.query(`
    INSERT INTO film (title, release_year, rating)
    VALUES (?, ?, ?)
    `, [title, release_year, rating])
    return result
}

// addFilm('test 2', 2001, 8.1)
module.exports = {
    getFilm,
    addFilm
}