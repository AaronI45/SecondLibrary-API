const {request, response} = require ('express');
const UsuarioDao = require('../dao/usuario-dao');


const validarCamposUsuario = async (req = request, res = response, next) => {
    const{
        Estado_usuario_idEstado_usuario,
        Tipo_Usuario_idTipo_Usuario,
        nombreUsuario,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        matricula,
        correo
    } = req.body;
    if (Estado_usuario_idEstado_usuario == 1){
        return res.status(403).json({message: 'El usuario debe estar activo'});
    }
    const usuarioValido = await UsuarioDao.validarNombreUsuario(nombreUsuario);
    if (usuarioValido != null || nombreUsuario == ''){
        return res.status(403).json({message: 'El nombre de usuario ya existe o no es válido'});
    }
    if (matricula.length != 9){
        return res.status(403).json({message: 'La matricula debe tener 9 caracteres'});
    }
    if ((matricula[0] != 'S' || matricula[0] != 's') && isNaN(matricula.slice(1, 9))){
        return res.status(403).json({message: 'La matricula debe tener el formato S########'});
    }
    const matriculaValida = await UsuarioDao.validarMatricula(matricula);
    if (matriculaValida != null){
        return res.status(403).json({message: 'La matricula ya esta registrada dentro del sistema, por favor ingrese otra'});
    }
    const validarSintaxisCorreo = (email) =>{
        const expresion = /\S+@\S+\.+\S/;
        return expresion.test(email);
    }
    if (!validarSintaxisCorreo(correo)){
        return res.status(403).json({message: 'El correo no es válido, por favor ingrese otro'});
    }
    const correoValido = await UsuarioDao.validarCorreo(correo);
    if(correoValido != null){
        return res.status(403).json({message: 'El correo ya esta registrada en otra cuenta'});
    }
    next();
}

module.exports = {validarCamposUsuario};