'use-strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Intercambios extends Model {
        static associate(models) {
        }
    };
    Intercambios.init({
        idIntercambio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Comerciante_idComerciante: DataTypes.INTEGER,
        Usuario_idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        isbnComerciante: DataTypes.STRING,
        isbnUsuario: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        estadoIntercambio: DataTypes.STRING,
        estadoLibro: DataTypes.STRING,
        fechaDeCreacion: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
        fechaDeFinalizacion:{
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: null
        },
    },{
        sequelize,
        modelName: 'Intercambios',
        tableName: 'Intercambio',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    return Intercambios;
}