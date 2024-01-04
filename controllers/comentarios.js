const {response} = require('express');
const ComentarioDao = require('../dao/comentario-dao');
const { use } = require('../routes/comentarios');

const comentariosComercianteGet = async(req, res = response) => {
    const {idComerciante} = req.params;
    try{
        const comentarios = await ComentarioDao.getComentariosComerciante(idComerciante);
        res.json(comentarios);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const comentarioGet = async(req, res = response) => {
    const {idComentario} = req.params;
    try{
        const comentario = await ComentarioDao.getComentarioPorId(idComentario);
        res.json(comentario);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const comentariosGet = async(req, res = response) => {
    try{
        const comentarios = await ComentarioDao.listarComentarios();
        res.json(comentarios);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const comentariosUsuarioGet = async(req, res = response) => {
    const {idUsuario} = req.params;
    try{
        const comentarios = await ComentarioDao.getComentariosUsuario(idUsuario);
        res.json(comentarios);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const comentariosComercianteGetCalificacion = async(req, res = response) => {
    const {idComerciante} = req.params;
    try{
        const comentarios = await ComentarioDao.getPromedioCalificacion(idComerciante);
        res.json(comentarios);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const comentariosPost = async (req, res = response) => {
    const idUsuario = req.usuario.idUsuario;
    const {idComerciante, 
        titulo, 
        calificacion,
        descripcion} = req.body;
    if (idUsuario == idComerciante){
        return res.status(400).json({message: 'No puedes comentar tu propio perfil'});
    }
    const comentario = {
        Comerciante_idComerciante: idComerciante,
        Usuario_idUsuario: idUsuario,
        titulo,
        calificacion,
        descripcion
    }
    try{
        const nuevoComentario = await ComentarioDao.crearComentario(comentario);
        res.status(201).json(nuevoComentario);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const comentariosPatch = async (req, res = response) => {
    const {idComentario} = req.params;
    const comentarioSeleccionado = await ComentarioDao.getComentarioPorId(idComentario);
    if (comentarioSeleccionado.idUsuario != req.usuario.Usuario_idUsuario){
        return res.status(403).json({message: 'No puedes modificar un comentario que no es tuyo'});
    }
    const {titulo = comentarioSeleccionado.titulo, 
        calificacion = comentarioSeleccionado.calificacion, 
        descripcion = comentarioSeleccionado.descripcion} = req.body;
    try{
        const comentario = await ComentarioDao.modificarComentarioPorId(idComentario, titulo, calificacion, descripcion);
        res.status(200).json(comentario);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const comentariosDelete = async (req, res = response) => {
    const {idComentario} = req.params;
    const comentarioSeleccionado = await ComentarioDao.getComentarioPorId(idComentario);
    if (comentarioSeleccionado.idUsuario != req.usuario.Usuario_idUsuario){
        return res.status(403).json({message: 'No puedes eliminar un comentario que no es tuyo'});
    }
    try{
        const comentario = await ComentarioDao.eliminarComentarioPorId(idComentario);
        res.status(204);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

module.exports = {
    comentariosComercianteGet,
    comentarioGet,
    comentariosGet,
    comentariosUsuarioGet,
    comentariosComercianteGetCalificacion,
    comentariosPost,
    comentariosPatch,
    comentariosDelete
}