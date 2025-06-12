const {Sequelize} = require('sequelize');
const logger = require('../utils/loggers')

const sequelize = new Sequelize('concesionario', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', 
    logging: console.log, 
});

// Probar la conexión
sequelize.authenticate()
    .then(() => {
        logger.info('Conexión exitosa a la base de datos');
    })
    .catch(err => {
        logger.error('No se pudo conectar a la base de datos:', err);
    });

module.exports = sequelize;