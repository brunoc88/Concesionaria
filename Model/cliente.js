const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const Cliente = sequelize.define('Cliente',{
    idCliente:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dni:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    freezeTableName: true,
    timestamps: false
})

module.exports = Cliente