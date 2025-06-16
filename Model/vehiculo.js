const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const Vehiculo = sequelize.define('Vehiculo', {
    idVehiculo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantida: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
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

module.exports = Vehiculo