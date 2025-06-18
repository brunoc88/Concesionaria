const Vehiculo = require('../Model/vehiculo')

exports.todos = async(req, res) =>{
    try {
        const vehiculos = await Vehiculo.findAll()
        //return res.status(200).json(vehiculos)
        return res.status(200).render('vehiculo/index',{vehiculos})
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

exports.registrar = async(req, res) =>{
    try {
        return res.status(200).render('vehiculo/alta')
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

exports.altaVehiculo = async(req, res) =>{
    try {
        const {modelo, marca, color, anio, precio, cantidad} = req.body 

        const checkVehiculo = await Vehiculo.findOne({where:{anio, color, marca, modelo}})
        if(checkVehiculo){
            //return res.status(409).json('Ya exite un auto registrado con esas caracteristicas!')
            return res.status(409).render('vehiculo/alta',{
                vehiculo: req.body,
                errorMessage: 'Ya exite un auto registrado con esas caracteristicas!'
            })
        }
        await Vehiculo.create(req.body)
        //return res.status(201).json('Vehiculo creado!')
        req.session.message = 'Vehiculo creado!'
        return res.status(201).redirect('/vehiculo/index')
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

exports.editarVehiculo = async(req, res) =>{
    try {
        const id = req.params.id
        const vehiculo = req.body

        const duplicado = await checkDuplicado(vehiculo, id)
        if(duplicado){
            return res.status(409).json(duplicado)
        }

        const cambios = await chekCambios(vehiculo, id)
        if(Object.keys(cambios).length === 0){
            return res.status(200).json({ mensaje: 'No hay cambios para aplicar.' })
        }

        await Vehiculo.update(cambios,{where:{idVehiculo:id}})

        return res.status(200).json({ mensaje: 'Vehículo actualizado!', cambios })

        
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

exports.baja = async(req, res) =>{
    try {
        const { id } = req.params
        const vehiculo = await Vehiculo.findByPk(id)
        await Vehiculo.update({estado:false},{where:{idVehiculo: id}})
        //return res.status(200).json('Vehiculo desactivado!')
        req.session.message = `Vehiculo: ${vehiculo.marca} ${vehiculo.modelo} desactivado!`
        return res.status(200).redirect('/vehiculo/index')
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

exports.activar = async(req, res) =>{
    try {
        const { id } = req.params
        const findVehiculo = await Vehiculo.findByPk(id)
        //obtengo todos los vehiculos por si hay un error
        const vehiculos = await Vehiculo.findAll()
        if(findVehiculo && findVehiculo.cantidad === 0){
            //return res.status(400).json('No puedo activar este modelo: La cantidad de unidades es 0')
            return res.status(400).render('vehiculo/index',{
                vehiculos,
                errorMessage:`No puedo activar este modelo: ${findVehiculo.marca} ${findVehiculo.modelo} La cantidad de unidades es 0. Edite el vehiculo!`
            })
        }
        await Vehiculo.update({estado:true},{where:{idVehiculo: id}})
        //return res.status(200).json('Vehiculo activado!')
        req.session.message = `Vehiculo: ${findVehiculo.marca} ${findVehiculo.modelo} Activado!`
        return res.status(200).redirect('/vehiculo/index')
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

const checkDuplicado = async(vehiculo, id) =>{

    let duplicado = null

    const {modelo, marca, anio, color} = vehiculo
    //busco vehiculo en la DB
    const vehiculoDB = await Vehiculo.findByPk(id)

    //busco si existe coincidencia con lo que mando el usuario
    const vehiculoEdit = await Vehiculo.findOne({where:{modelo, marca, color, anio}})

    if(vehiculoEdit && vehiculoEdit.idVehiculo !== vehiculoDB.idVehiculo){
        duplicado = 'Ya existe ese vehiculo!'    
    }
    return duplicado
}

const chekCambios = async (vehiculo, id) =>{
    let cambios = {}
    //busco el vehiculo en la DB
    const vehiculoDB = await Vehiculo.findByPk(id)

    if(vehiculo.marca && vehiculo.marca !== vehiculoDB.marca) cambios.marca = vehiculo.marca
    if(vehiculo.modelo && vehiculo.modelo !== vehiculoDB.modelo) cambios.modelo = vehiculo.modelo
    if(vehiculo.anio && vehiculo.anio !== vehiculoDB.anio) cambios.anio = vehiculo.anio
    if(vehiculo.color && vehiculo.color !== vehiculoDB.color) cambios.color = vehiculo.color
    if(vehiculo.precio && vehiculo.precio !== vehiculoDB.precio) cambios.precio = vehiculo.precio
    if(vehiculo.cantidad && vehiculo.cantidad !== vehiculoDB.cantidad) cambios.cantidad = vehiculo.cantidad

    return cambios
}