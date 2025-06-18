const router = require('express').Router()
const contratoController = require('../Controller/contratoController')
const { checkToken } = require('../utils/middlewares')

router.use(checkToken)

router.get('/crear/:id', contratoController.registrarContrato)

router.post('/alta', contratoController.altaContrato)

router.get('/info/:id', contratoController.contratoInfo)

router.get('/ver/:id', contratoController.verContrato)

module.exports = router