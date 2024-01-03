const { Intercambios } = require('../models');

class IntercambioDao{
    static async getIntercambios(){
        return await Intercambios.findAll();
    }
    static async getIntercambiosBusqueda(estado, isbn){
        if (isbn == ''){
            return await Intercambios.findAll({
                where: {
                    estadoIntercambio: estado
                }
            });
        }
        return await Intercambios.findAll({
            where: {
                estadoIntercambio: estado,
                isbnComerciante: isbn
            }
        });
    }

    static async getIntercambiosPorIdComerciante(idUsuario){
        return await Intercambios.findAll({
            where: {
                Comerciante_idComerciante: idUsuario
            }
        });
    }

    static async getIntercambioPorId(idIntercambio){
        return await Intercambios.findByPk(idIntercambio);
    }

    static async crearIntercambio(isbn, estadoLibro, idUsuario){
        return await Intercambios.create({
            idIntercambio: 0,
            Comerciante_idComerciante: idUsuario,
            isbnComerciante: isbn,
            estadoIntercambio: 'activo',
            estadoLibro: estadoLibro
        });
    }

    static async modificarIntercambioPorId(idIntercambio, intercambio){
        return await Intercambios.update(intercambio,{
            where: {
                idIntercambio
            }
        });
    }

    static async eliminarIntercambioPorId(idIntercambio){
        return await Intercambios.destroy({
            where: {
                idIntercambio
            }
        });
    }
}

module.exports = IntercambioDao;