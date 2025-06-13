const Empleado = require('../Model/empleado')
const bcrypt = require('bcrypt')

exports.indexFormularioEmpleado = async (req, res) => {
    try {
        return res.status(200).json('INDEX')
    } catch (error) {
        return res.status(500).json(`Hubo un error ${error}`)
    }
}

exports.myProfile = async (req, res) => {
    try {
        const { id } = req.params

        const empleado = await Empleado.findByPk(id)

        if (empleado.idEmpleado !== req.user.id) return res.status(401).json({ alerta: 'Sin authorizacion!' })


        return res.status(200).json(req.user)

    } catch (error) {
        return res.status(500).json(`Hubo un error: ${error}`)
    }
}

exports.altaEmpleado = async (req, res) => {
    try {
        const data = req.body
        const modeEdit = false //esto va determinar como se validan dupliocos tanto para post o put
        const duplicado = await checkDuplicados(data, modeEdit, req)

        if (duplicado.length >= 1) {
            return res.status(409).json({
                mensaje: "Error de duplicado",
                duplicados: duplicado
            })
        }

        if (data.usuario.length < 5) {
            return res.status(400).json("nombre de usuario muy corto")
        }

        if (data.password.length < 5) {
            return res.status(400).json("password muy corto")
        }

        const hashpassword = await bcrypt.hash(data.password, 10)

        const nuevoEmpleado = {
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            telefono: data.telefono,
            usuario: data.usuario,
            dni: data.dni,
            password: hashpassword
        }

        await Empleado.create(nuevoEmpleado)
        return res.status(201).json("empleado creado!")

    } catch (error) {
        return res.status(500).json(`Ocurrio un error: ${error}`)
    }
}

exports.desactivarCuenta = async (req, res) => {
    try {
        const { id } = req.params

        const empleado = await Empleado.findByPk(id)
        if (!empleado) return res.status(404).json('Empleado no encontrado')

        if (empleado.usuario !== req.user.usuario) return res.status(401).json({ alerta: 'Sin authorizacion!' })

        await Empleado.update({ estado: false }, { where: { idEmpleado: id } })
        return res.status(200).json('Cuenta desactivada!')
    } catch (error) {
        return res.status(500).json(`Hubo un error: ${error}`)
    }
}

exports.editarEmpleado = async (req, res) => {
    try {
        const id = req.params.id
        const modeEdit = true

        const duplicados = await checkDuplicados(req.body, modeEdit, req)
        if (duplicados.length >= 1) {
            return res.status(409).json({ mensaje: 'Valores duplicados!', duplicados: duplicados })
        }
        const cambios = await checkCambios(req.body, id)

        if (Object.keys(cambios).length === 0) {
            return res.status(200).json({ mensaje: 'No hay cambios para aplicar.' })
        }

        await Empleado.update(cambios, { where: { idEmpleado: id } })

        return res.status(200).json({ mensaje: 'Empleado actualizado', cambios })
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
        return res.status(500).json({ error: 'Error al editar el empleado' })
    }
}

const checkDuplicados = async (empleado, modeEdit, req) => {

    let duplicados = []

    if (!modeEdit) {
        let checkDni = await Empleado.findOne({ where: { dni: empleado.dni } })
        if (checkDni) duplicados.push('Dni ya registrado!')

        let checkEmail = await Empleado.findOne({ where: { email: empleado.email } })
        if (checkEmail) duplicados.push('Email ya registrado!')

        let checkPhone = await Empleado.findOne({ where: { telefono: empleado.telefono } })
        if (checkPhone) duplicados.push('Telefono ya registrado!')

        let checkUsuario = await Empleado.findOne({ where: { usuario: empleado.usuario } })
        if (checkUsuario) duplicados.push('Usuario ya registrado!')
    }

    if (modeEdit) {
        const id = req.user.id // o req.params.id si lo pasás por URL
        const empleadoDB = await Empleado.findByPk(id)

        let checkDni = await Empleado.findOne({ where: { dni: empleado.dni } })
        if (checkDni && checkDni.idEmpleado !== empleadoDB.idEmpleado) {
            duplicados.push('Dni ya registrado!')
        }

        let checkEmail = await Empleado.findOne({ where: { email: empleado.email } })
        if (checkEmail && checkEmail.idEmpleado !== empleadoDB.idEmpleado) {
            duplicados.push('Email ya registrado!')
        }

        let checkPhone = await Empleado.findOne({ where: { telefono: empleado.telefono } })
        if (checkPhone && checkPhone.idEmpleado !== empleadoDB.idEmpleado) {
            duplicados.push('Telefono ya registrado!')
        }

        let checkUsuario = await Empleado.findOne({ where: { usuario: empleado.usuario } })
        if (checkUsuario && checkUsuario.idEmpleado !== empleadoDB.idEmpleado) {
            duplicados.push('Usuario ya registrado!')
        }
    }



    return duplicados
}

const checkCambios = async (empleado, id) => {
    let empleadoDB = await Empleado.findByPk(id)
    let cambios = {}

    if (empleado.usuario !== empleadoDB.usuario) cambios.usuario = empleado.usuario
    if (empleado.nombre !== empleadoDB.nombre) cambios.nombre = empleado.nombre
    if (empleado.apellido !== empleadoDB.apellido) cambios.apellido = empleado.apellido
    if (empleado.email !== empleadoDB.email) cambios.email = empleado.email
    if (empleado.telefono !== empleadoDB.telefono) cambios.telefono = empleado.telefono
    if (empleado.dni !== empleadoDB.dni) cambios.dni = empleado.dni
    let newPassword = await bcrypt.compare(empleado.password, empleadoDB.password)
    if (!newPassword) {
        const hashedPassword = await bcrypt.hash(empleado.password, 10)
        cambios.password = hashedPassword
    }

    return cambios
}   