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

    static async getIntercambiosPorIdUsuario(idUsuario){
        return await Intercambios.findAll({
            where: {
                Usuario_idUsuario: idUsuario
            }
        });
    }

    static async getIntercambioPorId(idIntercambio){
        return await Intercambios.findByPk(idIntercambio);
    }

    static async crearIntercambio(nuevoIntercambio, idUsuario){
        return await Intercambios.create({
            idIntercambio: 0,
            Oferta_Intercambio_idOferta_Intercambio: nuevoIntercambio.Oferta_Intercambio_idOferta_Intercambio,
            Usuario_idUsuario: idUsuario,
            isbnUsuario: nuevoIntercambio.isbnUsuario,
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