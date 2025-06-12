const Empleado = require('../Model/empleado')
const bcrypt = require('bcrypt')

exports.altaEmpleado = async(req, res)=>{
    try {
        const data = req.body
        const duplicado = checkDuplicados()

        if(duplicado.length > 0){
            return res.status(409)
        }

        if(data.usuario.length < 5){
            return res.status(400)
        }

        if(data.password.length < 5){
            return res.status(400)
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
        return res.status(201)
        
    } catch (error) {
        return res.status(500).json(`Ocurrio un error: ${error}`)
    }
}

const checkDuplicados = async (empleado) =>{
    let duplicados = []

    let checkDni = await Empleado.findOne({where:{dni: empleado.dni}})
    if(checkDni) duplicados.push('Dni ya registrado!')

    let checkEmail = await Empleado.findOne({where: {email: empleado.email}})
    if(checkEmail) duplicados.push('Email ya registrado!')

    let checkPhone = await Empleado.findOne({where:{telefono: empleado.telefono}})
    if(checkPhone) duplicados.push('Telefono ya registrado!')

    let checkUsuario = await Empleado.findOne({where:{usuario: empleado.usuario}})
    if(checkUsuario) duplicados.push('Usuario ya registrado!')
    
    return duplicados
}