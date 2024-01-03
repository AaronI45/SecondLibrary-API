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
        //TODO: checar que los campos sean correctos
        //TODO: checar que el usuario no exista
        //TODO: checar que el correo no exista
        //TODO: checar que el nombre de usuario sea unico
        //TODO: checar que la matricula sea unica
        //TODO: checar que el correo sea unico
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
        res.status(401).json({message: 'Usuario o contraseña incorrectos'});
    }
}

const usuariosPutActualizar = async (req, res = response) => {
    const {idUsuario} = req.params;
    const { 
        Estado_usuario_idEstado_usuario, 
        Tipo_Usuario_idTipo_Usuario, 
        nombreUsuario, 
        contrasena, 
        nombre, 
        apellidoPaterno, 
        apellidoMaterno, 
        matricula, 
        correo} = req.body;
    const hashConstrasena= await hash(contrasena);
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