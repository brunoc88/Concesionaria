require('dotenv').config()

//solicito ambas bases de datos tanto la oficial como la de test
const dbOrignal = require('../db/db')
const dbDevTest = require('../db/devDb')

const PORT  = process.env.PORT

const SECRET = process.env.SECRET

const db = process.env.NODE_ENV === "dev"? dbOrignal : dbDevTest

module.exports = {
    PORT,
    SECRET,
    db
}