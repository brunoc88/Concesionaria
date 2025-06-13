const router = require('express').Router()
const { checkToken } = require('../utils/middlewares')
const clienteController = require('../Controller/clienteController')

router.use(checkToken)

router.post('/alta', clienteController.altaCliente)

router.patch('/baja/:id', clienteController.baja)

module.exports = router