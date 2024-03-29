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
        Oferta_Intercambio_idOferta_Intercambio: DataTypes.INTEGER,
        Usuario_idUsuario: DataTypes.INTEGER,
        isbnUsuario: DataTypes.STRING,
        fechaDeFinalizacion:{
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
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