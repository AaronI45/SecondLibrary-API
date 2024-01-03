'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comentarios extends Model {
        static associate(models) {
        }
    };
    Comentarios.init({
        idComentario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Comerciante_idComerciante: DataTypes.INTEGER,
        Usuario_idUsuario: DataTypes.INTEGER,
        titulo: DataTypes.STRING,
        calificacion: DataTypes.FLOAT,
        descripcion: DataTypes.STRING,

    },{
        sequelize,
        modelName: 'Comentarios',
        tableName: 'Comentario',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    
    return Comentarios;
}