const router = require('express').Router()
const logingController = require('../Controller/loginContoller')

router.post('/login', logingController.login)

router.get('/logout', logingController.logout)

module.exports = router