const router = require('express').Router()
const vehiculoController = require('../Controller/vehiculoController')
const { checkToken } = require('../utils/middlewares')

router.use(checkToken)

router.get('/index', vehiculoController.todos)

router.get('/info/:id', vehiculoController.info)

router.get('/registrar', vehiculoController.registrar)

router.post('/alta', vehiculoController.altaVehiculo)

router.get('/actualizar/:id', vehiculoController.editarVehiculoForm)

router.put('/editar/:id', vehiculoController.editarVehiculo)

router.patch('/baja/:id', vehiculoController.baja)

router.patch('/activar/:id', vehiculoController.activar)


module.exports = router