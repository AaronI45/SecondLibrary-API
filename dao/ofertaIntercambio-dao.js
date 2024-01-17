const {OfertasIntercambios} = require('../models');

class OfertaIntercambioDao {
    static async listarOfertasIntercambios() {
        return await OfertasIntercambios.findAll();
    }

    static async getOfertaIntercambiosBusqueda(estado, isbn) {
        if (isbn == ''){
            return await OfertasIntercambios.findAll({
                where: {
                    estadoIntercambio: estado
                }
            });
        }
        return await OfertasIntercambios.findAll({
            where: {
                estadoIntercambio: estado,
                isbnComerciante: isbn
            }
        });
    }

    static async getOfertaIntercambioPorId(idOferta_Intercambio) {
        return await OfertasIntercambios.findByPk(idOferta_Intercambio);
    }

    static async getOfertaIntercambioPorComerciante(idComerciante) {
        return await OfertasIntercambios.findAll({
            where: {
                Comerciante_idComerciante: idComerciante
            }
        });
    }

    static async crearOfertaIntercambio(ofertaIntercambio) {
        return await OfertasIntercambios.create({
            idOferta_Intercambio: 0,
            Comerciante_idComerciante: ofertaIntercambio.Comerciante_idComerciante,
            isbnComerciante: ofertaIntercambio.isbnComerciante,
            estadoIntercambio: ofertaIntercambio.estadoIntercambio,
            estadoLibro: ofertaIntercambio.estadoLibro
        
        });
    }

    static async actualizarOfertaIntercambio(idOferta_Intercambio, ofertaIntercambio) {
        return await OfertasIntercambios.update(ofertaIntercambio, {
            where: {
                idOferta_Intercambio
            }
        });
    }

    static async eliminarOfertaIntercambio(idOferta_Intercambio) {
        return await OfertasIntercambios.destroy({
            where: {
                idOferta_Intercambio
            }
        });
    
    }
}

module.exports = OfertaIntercambioDao;