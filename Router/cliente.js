const router = require('express').Router()
const { checkToken } = require('../utils/middlewares')
const clienteController = require('../Controller/clienteController')

router.use(checkToken)

router.get('/info/:id', clienteController.infoCliente)

router.post('/alta', clienteController.altaCliente)

router.put('/editar/:id', clienteController.editarCliente)

router.patch('/baja/:id', clienteController.baja)

router.patch('/activar/:id', clienteController.activar)


module.exports = router