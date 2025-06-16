const Cliente = require('../Model/cliente')

exports.allClients = async(req, res) =>{
    try {
        const clientes = await Cliente.findAll()
        return res.status(200).json(clientes)
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

exports.infoCliente = async(req, res) =>{
    try {
        const id = req.params.id
        const cliente = await Cliente.findByPk(id)
        //return res.status(200).json(cliente)
        return res.status(200).render('cliente/perfil',{cliente})
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

exports.altaCliente = async (req, res) => {
    try {
        const data = req.body

        const modeEdit = false
        const id = null
        const duplicado = await checkDuplicados(data, modeEdit, id)
        if (duplicado.length >= 1) {
            return res.status(409).json({
                error: "duplicado!",
                duplicados: duplicado
            })
        }
        await Cliente.create(data)
        return res.status(201).json('Cliente creado!')

    } catch (error) {
        console.log(`Ocurrio un error: ${error}`)
    }
}

exports.editarCliente = async (req, res) => {
    try {
        const id = req.params.id

        const modeEdit = true
        const duplicados = await checkDuplicados(req.body, modeEdit, id)

        if (duplicados.length >= 1) {
            return res.status(409).json({ mensaje: 'Valores duplicados!', duplicados:duplicados})
        }
        const cambios = await checkCambios(req.body, id)

        if (Object.keys(cambios).length === 0) {
            return res.status(200).json({ mensaje: 'No hay cambios para aplicar.' })
        }
        await Cliente.update(cambios, { where: { idCliente: id } })

        return res.status(200).json({ mensaje: 'Cliente actualizado', cambios })
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

exports.baja = async (req, res) => {
    try {
        const { id } = req.params

        const cliente = await Cliente.findByPk(id)
        if (!cliente) return res.status(404).json('Cliente no encontrado')

        await Cliente.update({ estado: false }, { where: { idCliente: id } })
        return res.status(200).json('Cliente desactivado!')
    } catch (error) {
        console.log(`Ocurrio un error: ${error}`)
    }
}

exports.activar = async (req, res) => {
    try {
        const { id } = req.params

        const cliente = await Cliente.findByPk(id)
        if (!cliente) return res.status(404).json('Cliente no encontrado')

        await Cliente.update({ estado: true }, { where: { idCliente: id } })
        return res.status(200).json('Cliente activado!')
    } catch (error) {
        console.log(`Ocurrio un error: ${error}`)
    }
}

const checkDuplicados = async (cliente, modeEdit, id) => {

    let duplicados = []

    if (!modeEdit) {
        let checkDni = await Cliente.findOne({ where: { dni: cliente.dni } })
        if (checkDni) duplicados.push('Dni ya registrado!')

        let checkEmail = await Cliente.findOne({ where: { email: cliente.email } })
        if (checkEmail) duplicados.push('Email ya registrado!')

        let checkPhone = await Cliente.findOne({ where: { telefono: cliente.telefono } })
        if (checkPhone) duplicados.push('Telefono ya registrado!')
    }

    if (modeEdit) { 
        const clienteDB = await Cliente.findByPk(id)

        let checkDni = await Cliente.findOne({ where: { dni: cliente.dni } })
        if (checkDni && checkDni.idCliente !== clienteDB.idCliente) {
            duplicados.push('Dni ya registrado!')
        }

        let checkEmail = await Cliente.findOne({ where: { email: cliente.email } })
        if (checkEmail && checkEmail.idCliente !== clienteDB.idCliente) {
            duplicados.push('Email ya registrado!')
        }

        let checkPhone = await Cliente.findOne({ where: { telefono: cliente.telefono } })
        if (checkPhone && checkPhone.idCliente !== clienteDB.idCliente) {
            duplicados.push('Telefono ya registrado!')
        }

    }
    return duplicados
}

const checkCambios = async (cliente, id) => {
    let clienteDB = await Cliente.findByPk(id)
    let cambios = {}

    if (cliente.nombre !== clienteDB.nombre) cambios.nombre = cliente.nombre
    if (cliente.apellido !== clienteDB.apellido) cambios.apellido = cliente.apellido
    if (cliente.email !== clienteDB.email) cambios.email = cliente.email
    if (cliente.telefono !== clienteDB.telefono) cambios.telefono = cliente.telefono
    if (cliente.dni !== clienteDB.dni) cambios.dni = cliente.dni


    return cambios
}  