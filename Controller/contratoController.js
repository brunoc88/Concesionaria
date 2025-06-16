const Contrato = require('../Model/contrato')
const Vehiculo = require('../Model/vehiculo')
const Cliente = require('../Model/cliente')
const Empleado = require('../Model/empleado')

exports.altaContrato = async(req, res) =>{
    try {
        const data = req.body

        await Contrato.create(data)

        //busco el vehiculo y le descuento la cantida o si era 0 lo desactivo
        const id = data.id_vehiculo
        const vehiculo = await Vehiculo.findByPk(id)

        if (vehiculo && vehiculo.cantidad > 0){
            let cantidad = vehiculo.cantidad-1
            await Vehiculo.update({cantidad}, {where:{idVehiculo: id}})
        }
        if(vehiculo && vehiculo.cantidad === 1){
            await Vehiculo.update({estado: false}, {where:{idVehiculo: id}})
        }
        return res.status(201).json({mensaje: 'Contrato creado!'})
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

exports.contratoInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const contrato = await Contrato.findAll({
            where: { id_cliente: id },
            include: [
                { model: Cliente },
                { model: Empleado },
                { model: Vehiculo }
            ]
        });
        return res.status(200).json(contrato);
    } catch (error) {
        console.log(`Hubo un error: ${error}`);
    }
}
