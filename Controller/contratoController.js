const Contrato = require('../Model/contrato')
const Vehiculo = require('../Model/vehiculo')
const Cliente = require('../Model/cliente')
const Empleado = require('../Model/empleado')

exports.registrarContrato = async (req, res) => {
    try {
        const { id } = req.params
        const cliente = await Cliente.findByPk(id)

        //busco los contratos en caso de error
        const contratos = await Contrato.findAll({
            where: { id_cliente: id },
            include: [
                { model: Cliente },
                { model: Empleado },
                { model: Vehiculo }
            ]
        })
        if (!cliente.estado) {
            return res.status(400).render(`cliente/contratos`, {
                errorMessage: 'El cliente debe estar activo!',
                cliente,
                contratos
            })
        }
        const empleado = req.user
        const vehiculos = await Vehiculo.findAll({ where: { estado: true } })
        return res.status(200).render('contrato/alta', {
            cliente,
            empleado,
            vehiculos
        })
    } catch (error) {
        console.log(`Hubo un error ${error}`)
    }
}

exports.altaContrato = async (req, res) => {
    try {

        const data = req.body

        data.fecha = new Date()

        await Contrato.create(data)


        //busco el vehiculo y le descuento la cantida o si era 0 lo desactivo
        const id = data.id_vehiculo
        const vehiculo = await Vehiculo.findByPk(id)

        if (vehiculo && vehiculo.cantidad > 0) {
            let cantidad = vehiculo.cantidad - 1
            await Vehiculo.update({ cantidad }, { where: { idVehiculo: id } })
        }
        if (vehiculo && vehiculo.cantidad === 1) {
            await Vehiculo.update({ estado: false }, { where: { idVehiculo: id } })
        }
        //return res.status(201).json({ mensaje: 'Contrato creado!' })
        req.session.message = 'Contrato creado!'
        return res.status(201).redirect('/cliente/index')
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}
//todos los contratos del cliente
exports.contratoInfo = async (req, res) => {
    try {
        //recibe id del cliente
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id)

        const contratos = await Contrato.findAll({
            where: { id_cliente: id },
            include: [
                { model: Cliente },
                { model: Empleado },
                { model: Vehiculo }
            ]
        })
        //return res.status(200).json(contratos)
        return res.status(200).render('cliente/contratos', {
            contratos,
            cliente
        })
    } catch (error) {
        console.log(`Hubo un error: ${error}`);
    }
}

//contrato en especifico
exports.verContrato = async (req, res) =>{
    try {
        const { id } = req.params

        const contrato = await Contrato.findByPk(id,{
            include: [
                { model: Cliente },
                { model: Empleado },
                { model: Vehiculo }
            ]
        })
        
        return res.status(200).render('contrato/ver',{
            contrato
        })
        //return res.status(200).json(contrato)
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}
