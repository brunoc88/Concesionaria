const Empleado = require('../Model/empleado')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/confing')
const { Op } = require('sequelize')

exports.login = async (req, res) => {
    try {
        const { user, password } = req.body

        let userDB = await Empleado.findOne({
            where: {
                [Op.or]: [
                    { usuario: user },
                    { email: user }
                ]
            }
        })

        if (!userDB || !userDB.estado) {
            return res.status(404).json('Ingrese un email o usuario valido!')
        }

        let checkPassword = await bcrypt.compare(password, userDB.password)
        if (!checkPassword) {
            return res.status(404).json('Ingrese un email o usuario valido!')
        }

        //generar token

        const token = jwt.sign({
            id: userDB.idEmpleado,
            email: userDB.email,
            nombre: userDB.nombre,
            apellido: userDB.apellido,
            telefono: userDB.telefono,
            usuario: userDB.usuario
        },
            SECRET,
            { expiresIn: '1h' }
        )

        // Limpiar cookies existentes y establecer una nueva
        res.clearCookie('token');
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 // 1 hora
        })

        return res.status(200).json({
            mensaje: `Bienvenido ${userDB.usuario}`,
            token,
            usuario: userDB
        });


    } catch (error) {
        console.log(`Ocurrio un error: ${error}`)
    }
}