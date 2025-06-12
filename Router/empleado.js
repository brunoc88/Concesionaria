const router = require('express').Router()
const empleadoController = require('../Controller/empleadoController')

router.get('/crear', empleadoController.indexFormularioEmpleado)

router.post('/alta', empleadoController.altaEmpleado)


module.exports = router