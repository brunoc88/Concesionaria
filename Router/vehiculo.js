const router = require('express').Router()
const vehiculoController = require('../Controller/vehiculoController')
const { checkToken } = require('../utils/middlewares')

router.use(checkToken)

router.get('/todos', vehiculoController.todos)

router.get('/info/:id', vehiculoController.info)

router.post('/alta', vehiculoController.altaVehiculo)

router.patch('/baja/:id', vehiculoController.baja)

router.patch('/activar/:id', vehiculoController.activar)


module.exports = router