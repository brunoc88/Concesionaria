const router = require('express').Router()
const empleadoController = require('../Controller/empleadoController')
const { tokenExtractor }= require('../utils/middlewares')

router.get('/crear', empleadoController.indexFormularioEmpleado)

router.post('/alta', empleadoController.altaEmpleado)

router.patch('/baja/:id', tokenExtractor,empleadoController.desactivarCuenta)

module.exports = router