const router = require('express').Router()
const { tokenExtractor } = require('../utils/middlewares')
const clienteController = require('../Controller/clienteController')

router.use(tokenExtractor)

router.post('/alta', clienteController.altaCliente)

router.patch('/baja/:id', clienteController.baja)

module.exports = router