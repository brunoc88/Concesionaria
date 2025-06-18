const router = require('express').Router()
const empleadoController = require('../Controller/empleadoController')
const { checkToken }= require('../utils/middlewares')


router.get('/miPerfil/:id', checkToken, empleadoController.myProfile)

router.get('/crear', empleadoController.formularioEmpleado)

router.post('/alta', empleadoController.altaEmpleado)

router.get('/actualizar/:id', checkToken, empleadoController.actualizar)

router.put('/editar/:id', checkToken, empleadoController.editarEmpleado)

router.patch('/baja/:id', checkToken,empleadoController.desactivarCuenta)


module.exports = router