'use-strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OfertasIntercambios extends Model {
        static associate(models) {
        }
    };
    OfertasIntercambios.init({
        idOferta_Intercambio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Comerciante_idComerciante: DataTypes.INTEGER,
        isbnComerciante: DataTypes.STRING,
        estadoIntercambio: DataTypes.STRING,
        estadoLibro: DataTypes.STRING,
        fechaDeCreacion: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
    },{
        sequelize,
        modelName: 'OfertasIntercambios',
        tableName: 'Oferta_Intercambio',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    return OfertasIntercambios;
}