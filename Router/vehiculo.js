const router = require('express').Router()
const vehiculoController = require('../Controller/vehiculoController')

router.post('/alta', vehiculoController.altaVehiculo)

module.exports = router