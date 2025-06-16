const router = require('express').Router()
const contratoController = require('../Controller/contratoController')
const { checkToken } = require('../utils/middlewares')

router.use(checkToken)

router.post('/alta', contratoController.altaContrato)

router.get('/info/:id', contratoController.contratoInfo)

module.exports = router