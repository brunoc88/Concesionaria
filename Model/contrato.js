const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')
///modelos
const Empleado = require('./empleado')
const Cliente = require('./cliente')
const Vehiculo = require('./vehiculo')

const Contrato = sequelize.define('Contrato', {
    idContrato: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
})

//defino relaciones
//Cliente-Contrato

//Un Cliente puede tener muchos contratos
Cliente.hasMany(Contrato,{
    foreignKey:'id_cliente',
    sourceKey:'idCliente'
})
//un Contrato va a estar relacionado con un Cliente
Contrato.belongsTo(Cliente, {
    foreignKey: 'id_cliente',
    targetKey: 'idCliente'
})

//Empleado-Contrato
//exactamente igual que Cliente

Empleado.hasMany(Contrato, {
    sourceKey: 'idEmpleado',
    foreignKey: 'id_empleado'
})

Contrato.belongsTo(Empleado, {
    foreignKey: 'id_empleado',
    targetKey: 'idEmpleado'
})

//Vehiculo-Contrato

Vehiculo.hasMany(Contrato, {
    foreignKey: 'id_vehiculo',
    sourceKey: 'idVehiculo'
})

Contrato.belongsTo(Vehiculo, {
    foreignKey: 'id_vehiculo',
    targetKey: 'idVehiculo'
})

module.exports = Contrato