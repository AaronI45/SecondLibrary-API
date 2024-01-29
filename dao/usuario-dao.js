const { Usuarios } = require('../models');

class UsuarioDao {
    static async listarUsuarios() {
        return await Usuarios.findAll({attributes: {exclude: ['contrasena']}});
    }

    static async getUsuarioPorId(idUsuario) {
        return await Usuarios.findByPk(idUsuario, {attributes: {exclude: ['contrasena']}});
    }

    static async getPasswordUsuarioPorId(idUsuario, contrasena) {
        return await Usuarios.findOne({
            where: {
                idUsuario,
                contrasena
            }
        });
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

    static async actualizarUsuarioPorId(idUsuario, usuario) {
        return await Usuarios.update(usuario, {
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

    static async validarNombreUsuario(nombreUsuario) {
        return await Usuarios.findOne({
            where: {
                nombreUsuario
            }
        });
    }

    static async validarMatricula(matricula) {
        return await Usuarios.findOne({
            where: {
                matricula
            }
        });
    }

    static async validarCorreo(correo) {
        return await Usuarios.findOne({
            where: {
                correo
            }
        });
    }
}

module.exports = UsuarioDao;