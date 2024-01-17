const { raw } = require('mysql2');
const { Comentarios, sequelize } = require('../models');

class ComentarioDao{
    static async getComentariosComerciante(idComerciante){
        return await Comentarios.findAll({
            where: {
                Comerciante_idComerciante: idComerciante
            }
        });
    }
    
    static async listarComentarios(){
        return await Comentarios.findAll();
    }

    static async getComentarioPorId(idComentario){
        return await Comentarios.findByPk(idComentario);
    }

    static async getComentariosUsuario(idUsuario){
        return await Comentarios.findAll({
            where: {
                Usuario_idUsuario: idUsuario
            }
        });
    }

    static async getPromedioCalificacion(idComerciante){
        return await sequelize.query('SELECT AVG(calificacion) as promedio FROM Comentario WHERE Comerciante_idComerciante = :idComerciante', {
            replacements: {idComerciante},
            type: sequelize.QueryTypes.SELECT
        });
    }

    static async getCountComentarios(idComerciante){
        return await sequelize.query('SELECT COUNT(*) as count FROM Comentario WHERE Comerciante_idComerciante = :idComerciante', {
            replacements: {idComerciante},
            type: sequelize.QueryTypes.SELECT
        });
    }

    static async crearComentario(comentario){
        return await Comentarios.create(comentario);
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