const { Comentarios } = require('../models');

class ComentarioDao{
    static async getComentariosComerciante(idComerciante){
        return await Comentarios.findAll({
            where: {
                Comerciante_idComerciante: idComerciante
            }
        });
    }

    static async getComentariosUsuario(idUsuario){
        return await Comentarios.findAll({
            where: {
                Usuario_idUsuario: idUsuario
            }
        });
    }

    static async crearComentario(idComerciante, idUsuario, titulo, comentario){
        return await Comentarios.create({
            Comerciante_idComerciante: idComerciante,
            Usuario_idUsuario: idUsuario,
            titulo,
            descripcion: comentario
        });
    }

    static async modificarComentarioPorId(idComentario, titulo, calificacion, descripcion){
        return await Comentarios.update({
            titulo,
            calificacion,
            descripcion
        },{
            where: {
                idComentario
            }
        });
    }

    static async eliminarComentarioPorId(idComentario){
        return await Comentarios.destroy({
            where: {
                idComentario
            }
        });
    }
}
module.exports = ComentarioDao;