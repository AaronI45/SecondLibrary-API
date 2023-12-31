const { Usuarios } = require('../models');

class UsuarioDao {
    static async listarUsuarios() {
        return await Usuarios.findAll({attributes: {exclude: ['contrasena']}});
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
        });
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
}

module.exports = UsuarioDao;