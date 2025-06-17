const express = require('express')
const app = express()
const sequelize = require('./db/db')
const logger = require('./utils/loggers')
const methodOverride = require('method-override')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const path = require('path')
const { unknowEnpoint } = require('./utils/middlewares')
//
const loginRouter = require('./Router/login')
const empleadoRouter = require('./Router/empleado')
const clienteRouter = require('./Router/cliente')
const vehiculoRouter = require('./Router/vehiculo')
const contratoRouter = require('./Router/contrato')

// Configurar la carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

//configuro pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Usamos cookie-parser para manejar las cookies
app.use(cookieParser())

app.use(session({
  secret: 'clave-secreta', // Cambia esta clave a algo único
  resave: false,           // Evita guardar la sesión si no hubo cambios
  saveUninitialized: true,  // Guarda sesiones nuevas aunque no tengan datos
  cookie: { secure: false } // Si usas HTTPS, ponlo en true
}));

//limpiar mensajes
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  res.locals.errorMessage = req.session.errorMessage;
  req.session.message = null;
  req.session.errorMessage = null;
  next();
});

app.use('/', loginRouter)
app.use('/empleado', empleadoRouter)
app.use('/cliente', clienteRouter)
app.use('/vehiculo', vehiculoRouter)
app.use('/contrato', contratoRouter)

app.use(unknowEnpoint)

sequelize.sync({})
    .then(() => {
        logger.info('Base de datos sincronizada')
        logger.info(sequelize.models)
    })
    .catch((err) => {
        logger.error('Error al sincronizar la base de datos', err)
    });

module.exports = app