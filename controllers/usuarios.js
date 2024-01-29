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
        Estado_usuario_idEstado_usuario: 2,
        Tipo_Usuario_idTipo_Usuario: 2,
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
        res.setHeader('token', token);
        res.json(usuario);
    }catch(error){
        console.error(error);
        res.status(401).json({message: error});
    }
}

const usuariosPutActualizar = async (req, res = response) => {
    const {idUsuario} = req.params;
    const usuario = req.body;
    console.log(usuario);
    try{
        const usuarioActualizado = await UsuarioDao.actualizarUsuarioPorId(idUsuario, usuario);
        res.status(201).json(usuarioActualizado);
    }catch (error){
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
    usuariosDelete
}