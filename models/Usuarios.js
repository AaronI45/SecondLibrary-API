'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Usuarios extends Model {
        static associate(models) {
        }
    };
    Usuarios.init({
        idUsuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Estado_usuario_idEstado_usuario: DataTypes.INTEGER,
        Tipo_Usuario_idTipo_Usuario: DataTypes.INTEGER,
        nombreUsuario: DataTypes.STRING,
        contrasena: DataTypes.STRING,
        nombre: DataTypes.STRING,
        apellidoPaterno: DataTypes.STRING,
        apellidoMaterno: DataTypes.STRING,
        matricula: DataTypes.STRING,
        correo: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Usuarios',
        tableName: 'Usuario',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    return Usuarios;
};