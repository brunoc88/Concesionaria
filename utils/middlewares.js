const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/confing')

const tokenExtractor = (req, res, next) =>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).redirect('/login')
        }

        const decoded = jwt.verify(token, SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.error('Token inválido o expirado', error)
    }
}

module.exports = {
    tokenExtractor
}