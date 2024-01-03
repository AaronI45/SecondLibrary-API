const {request, response} = require('express');
const crypto = require('crypto');
const UsuarioDao = require('../dao/usuario-dao');
const { use } = require('../routes/usuarios');
const { generarJWT } = require('../helpers/generar-jwt.js');

const hash = async (text)=> {
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return hash.digest('hex');
}

const usuariosGet = async(req, res = response) => {
    try{
        const usuarios = await UsuarioDao.listarUsuarios();
        res.json(usuarios);
    }catch(error){
        res.status(500).json( {message: error});
    
    }
}

const usuariosGetPorId = async(req, res = response) => {
    const {idUsuario} = req.params;
    try{
        const usuario = await UsuarioDao.getUsuarioPorId(idUsuario);
        res.json(usuario);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const usuariosPost = async (req, res = response) => {
    const {
        nombreUsuario, 
        Tipo_Usuario_idTipo_Usuario, 
        contrasena, 
        nombre, 
        apellidoPaterno, 
        apellidoMaterno, 
        matricula, 
        correo} = req.body;
    const contrasenaHash = await hash(contrasena);
    const usuario = {
        idUsuario: 0,
        Estado_usuario_idEstado_usuario: 1,
        Tipo_Usuario_idTipo_Usuario,
        nombreUsuario,
        contrasena: contrasenaHash,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        matricula,
        correo
    }
    try{
        const usuarioCreado = await UsuarioDao.crearUsuario(usuario);
        res.status(201).json(usuarioCreado);
    }catch(error){
        res.status(500).json(error);
    }
}

const usuariosLogin = async (req, res = response) => {
    const {nombreUsuario, contrasena} = req.body;
    const contrasenaHash = await hash(contrasena);
    try{
        const usuario = await UsuarioDao.login(nombreUsuario, contrasenaHash);
        
        if (!usuario){
            return res.status(401).json({message: 'Usuario o contraseña incorrectos'});
        }
        const token = await generarJWT(usuario);
        res.json({
            usuario,
            token
        });
    }catch(error){
        console.error(error);
        res.status(401).json({message: error});
    }
}

const usuariosPutActualizar = async (req, res = response) => {
    const {idUsuario} = req.params;
    const contrasenaReq = req.headers['contrasena'];
    const usuarioEncontrado = await UsuarioDao.getUsuarioPorId(idUsuario);
    if(!usuarioEncontrado){
        return res.status(404).json({message: 'Usuario no encontrado'});
    }
    const contrasenaReqHash = await hash(contrasenaReq);
    const contrasenaCorrecta = await UsuarioDao.getPasswordUsuarioPorId(idUsuario, contrasenaReqHash);
    if(usuarioEncontrado.idUsuario !== req.usuario.idUsuario || contrasenaCorrecta === null){
        return res.status(403).json({message: 'No tienes permisos para actualizar este usuario'});
    }
    if(usuarioEncontrado.Estado_usuario_idEstado_usuario === 3){
        return res.status(403).json({message: 'No puedes actualizar un usuario baneado'});
    }
    const { 
        Estado_usuario_idEstado_usuario = usuarioEncontrado.Estado_usuario_idEstado_usuario, 
        Tipo_Usuario_idTipo_Usuario = usuarioEncontrado.Tipo_Usuario_idTipo_Usuario, 
        nombreUsuario = usuarioEncontrado.nombreUsuario,
        contrasena = contrasenaReq,
        nombre = usuarioEncontrado.nombre, 
        apellidoPaterno = usuarioEncontrado.apellidoPaterno, 
        apellidoMaterno = usuarioEncontrado.apellidoMaterno, 
        matricula = usuarioEncontrado.matricula, 
        correo = usuarioEncontrado.correo} = req.body;
    const hashConstrasena= await hash(contrasena);
    if (req.usuario.nombreUsuario != nombreUsuario){
        const usuarioValido = await UsuarioDao.validarNombreUsuario(nombreUsuario);
        if (usuarioValido != null || nombreUsuario == ''){
            return res.status(403).json({message: 'El nombre de usuario ya existe o no es válido'});
        }
    }
    if(req.usuario.matricula != matricula){
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
    }
    if(req.usuario.correo != correo){
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
    }
    const usuario = {
        Estado_usuario_idEstado_usuario, 
        Tipo_Usuario_idTipo_Usuario, 
        nombreUsuario, 
        contrasena: hashConstrasena, 
        nombre, 
        apellidoPaterno, 
        apellidoMaterno, 
        matricula, 
        correo
    }
    try{
        const usuarioActualizado = await UsuarioDao.actualizarUsuario(idUsuario, usuario);
        res.status(201).json(usuarioActualizado);
    }catch (error){
        console.error(error);
        res.status(500).json(error);
    }
}

const usuariosPatchEstadoUsuario = async (req, res) => {
    const {idUsuario} = req.params;
    const {Estado_usuario_idEstado_usuario} = req.body;
    try{
        const usuarioActualizado = await UsuarioDao.actualizarEstadoUsuario(idUsuario, Estado_usuario_idEstado_usuario);
        res.status(201).json(usuarioActualizado);
    }catch(error){
        console.error(error);
        res.status(500).json(error);
    }
}

const usuariosDelete = async (req = request, res = response) => {
    const uid = req.usuario.idUsuario;
    try{
        await UsuarioDao.eliminarUsuario(uid);
        res.json({uid});
    }catch(error){
        console.error(error);
        res.status(500).json(error);
    }
}

module.exports = {
    usuariosGet,
    usuariosGetPorId,
    usuariosPost,
    usuariosLogin,
    usuariosPutActualizar,
    usuariosPatchEstadoUsuario,
    usuariosDelete
}