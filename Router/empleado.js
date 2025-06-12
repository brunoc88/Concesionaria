const router = require('express').Router()
const empleadoController = require('../Controller/empleadoController')

router.post('/alta', empleadoController.altaEmpleado)


module.exports = router