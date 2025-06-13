const router = require('express').Router()
const empleadoController = require('../Controller/empleadoController')
const { checkToken }= require('../utils/middlewares')

router.get('/crear', empleadoController.indexFormularioEmpleado)

router.post('/alta', empleadoController.altaEmpleado)

router.patch('/baja/:id', checkToken,empleadoController.desactivarCuenta)


module.exports = router