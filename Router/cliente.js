const router = require('express').Router()
const { checkToken } = require('../utils/middlewares')
const clienteController = require('../Controller/clienteController')

router.use(checkToken)

router.get('/index', clienteController.allClients)

router.get('/info/:id', clienteController.infoCliente)

router.get('/registrar', clienteController.registar)

router.post('/alta', clienteController.altaCliente)

router.put('/editar/:id', clienteController.editarCliente)

router.patch('/baja/:id', clienteController.baja)

router.patch('/activar/:id', clienteController.activar)


module.exports = router