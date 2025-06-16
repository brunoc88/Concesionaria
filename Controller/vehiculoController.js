const Vehiculo = require('../Model/vehiculo')

exports.todos = async(req, res) =>{
    try {
        const vehiculos = await Vehiculo.findAll()
        return res.status(200).json(vehiculos)
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

exports.info = async (req, res) =>{
    try {
        const { id } = req.params
        const vehiculo = await Vehiculo.findByPk(id)
        return res.status(200).json(vehiculo)
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

exports.altaVehiculo = async(req, res) =>{
    try {
        console.log("AUTO",req.body)
        const {modelo, marca, color, anio, precio, cantidad} = req.body 

        const checkVehiculo = await Vehiculo.findOne({where:{anio, color, marca, modelo}})
        if(checkVehiculo){
            return res.status(409).json('Ya exite un auto registrado con esas caracteristicas!')
        }
        await Vehiculo.create(req.body)
        return res.status(201).json('Vehiculo creado!')
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

exports.baja = async(req, res) =>{
    try {
        const { id } = req.params
        await Vehiculo.update({estado:false},{where:{idVehiculo: id}})
        return res.status(200).json('Vehiculo desactivado!')
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

exports.activar = async(req, res) =>{
    try {
        const { id } = req.params
        const findVehiculo = await Vehiculo.findByPk(id)
        if(findVehiculo && findVehiculo.cantidad === 0){
            return res.status(404).json('No puedo activar este modelo: La cantidad de unidades es 0')
        }
        await Vehiculo.update({estado:true},{where:{idVehiculo: id}})
        return res.status(200).json('Vehiculo activado!')
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}