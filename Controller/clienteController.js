const Cliente = require('../Model/cliente')

exports.altaCliente = async(req, res) =>{
    try {
        const data = req.body

        const duplicado = await checkDuplicados(data)
        if(duplicado.length >=1){
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

exports.baja = async(req, res) =>{
    try {
        const { id } = req.params

        const cliente = await Cliente.findByPk(id)
        if(!cliente) return res.status(404).json('Cliente no encontrado')

        await Cliente.update({estado:false}, {where:{idCliente:id}})
        return res.status(200).json('Cliente desactivado!')
    } catch (error) {
        console.log(`Ocurrio un error: ${error}`)
    }
}
const checkDuplicados = async (cliente) => {

    let duplicados = []

    let checkDni = await Cliente.findOne({ where: { dni: cliente.dni } })
    if (checkDni) duplicados.push('Dni ya registrado!')

    let checkEmail = await Cliente.findOne({ where: { email: cliente.email } })
    if (checkEmail) duplicados.push('Email ya registrado!')

    let checkPhone = await Cliente.findOne({ where: { telefono: cliente.telefono } })
    if (checkPhone) duplicados.push('Telefono ya registrado!')

    return duplicados
}