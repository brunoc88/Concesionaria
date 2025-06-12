const { PORT } = require('./utils/confing')
const logger = require('./utils/loggers')
const app = require('./app')

app.listen(PORT, () => {
    logger.error(`Escuchando puento ${PORT}`)
})

module.exports = app