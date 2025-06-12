require('dotenv').config()

//solicito ambas bases de datos tanto la oficial como la de test
const dbOrignal = require('../db/db')
const dbDev = require('../db/devDb')

const { PORT } = process.env.PORT

const SECRET = process.env.SECRET

const db = process.env.NODE_ENV === "dev"? dbDev : dbOrignal

module.exports = {
    PORT,
    SECRET,
    db
}