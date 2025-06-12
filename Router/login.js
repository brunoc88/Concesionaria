const router = require('express').Router()
const logingController = require('../Controller/loginContoller')

router.post('/login', logingController.login)


module.exports = router