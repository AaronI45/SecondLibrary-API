const { Usuarios } = require('../models');

class UsuarioDao {
    static async listarUsuarios() {
        return await Usuarios.findAll({attributes: {exclude: ['contrasena']}});
    }

    static async getUsuarioPorId(idUsuario) {
        return await Usuarios.findByPk(idUsuario, {attributes: {exclude: ['contrasena']}});
    }

    static async crearUsuario(usuario) {
        return await Usuarios.create(usuario);
    }

    static async login(nombreUsuario, contrasena) {
        return await Usuarios.findOne({
            where: {
                nombreUsuario,
                contrasena
            }
        }, {attributes: {exclude: ['contrasena']}});
    }

    static async actualizarUsuario(idUsuario, usuario) {
        return await Usuarios.update(usuario, {
            where: {
                idUsuario
            }
        });
    }
    
    static async actualizarEstadoUsuario(idUsuario, nuevoEstado) {
        return await Usuarios.update({
            Estado_usuario_idEstado_usuario: nuevoEstado
        }, {
            where: {
                idUsuario
            }
        });
    }

    static async eliminarUsuario(idUsuario) {
        return await Usuarios.destroy({
            where: {
                idUsuario
            }
        });
    }
}

module.exports = UsuarioDao;