const express = require('express')
const app = express()
const { db, PORT } = require('./utils/confing')
const logger = require('./utils/loggers')
const methodOverride = require('method-override')

//
const empleadoRouter = require('./Router/empleado')
//middleware
app.use(methodOverride('_method'));
app.use(express.json())

app.use('/empleado',empleadoRouter)

app.get('/', (req, res) => {
    res.send('Hola!')
})

db.sync({})
    .then(() => {
        logger.info('Base de datos sincronizada');
        logger.info(db.models);
    })
    .catch((err) => {
        logger.error('Error al sincronizar la base de datos', err);
    });

app.listen(PORT, () => {
    logger.error(`Escuchando puento:: 3000`)
})