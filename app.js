const express = require('express')
const app = express()
const sequelize = require('./db/db')
const logger = require('./utils/loggers')
const methodOverride = require('method-override')
const session = require('express-session')
const cookieParser = require('cookie-parser')
//
const loginRouter = require('./Router/login')
const empleadoRouter = require('./Router/empleado')
const clienteRouter = require('./Router/cliente')
//middleware
app.use(methodOverride('_method'));
app.use(express.json())

// Usamos cookie-parser para manejar las cookies
app.use(cookieParser());


app.use('/', loginRouter)
app.use('/empleado', empleadoRouter)
app.use('/cliente', clienteRouter)


sequelize.sync({})
    .then(() => {
        logger.info('Base de datos sincronizada');
        logger.info(sequelize.models);
    })
    .catch((err) => {
        logger.error('Error al sincronizar la base de datos', err);
    });

module.exports = app