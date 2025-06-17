const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/confing')

const checkToken = (req, res, next) =>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).redirect('/')
        }

        const decoded = jwt.verify(token, SECRET)
        req.user = decoded
        res.locals.user = decoded; // ahora disponible en todas las vistas Pug
        next()
    } catch (error) {
        console.error('Token inválido o expirado', error)
    }
}

const unknowEnpoint = (req, res, next) =>{
    return res.status(404).render('404/notFound')
}

module.exports = {
    checkToken,
    unknowEnpoint
}