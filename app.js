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
const { SECRET } = require('./utils/confing')
//middleware
app.use(methodOverride('_method'));
app.use(express.json())

// Usamos cookie-parser para manejar las cookies
app.use(cookieParser());

app.use(session({
  secret: SECRET,            // Reemplazar por un valor fuerte en producción
  resave: false,
  saveUninitialized: false,  // Mejor poner false si solo guardás sesión cuando se loguean
  cookie: {
    secure: false,           // true si usás HTTPS
    httpOnly: true,          // evita acceso JS en cliente
    maxAge: 1000 * 60 * 60   // 1 hora (opcional)
  }
}));

app.use('/', loginRouter)
app.use('/empleado', empleadoRouter)


sequelize.sync({})
    .then(() => {
        logger.info('Base de datos sincronizada');
        logger.info(sequelize.models);
    })
    .catch((err) => {
        logger.error('Error al sincronizar la base de datos', err);
    });

module.exports = app