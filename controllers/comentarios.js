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

const comentariosUsuarioGet = async(req, res = response) => {
    const idUsuario= req.usuario.idUsuario;
    try{
        const comentarios = await ComentarioDao.getComentariosUsuario(idUsuario);
        res.json(comentarios);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const comentariosPost = async (req, res = response) => {
    const idUsuario = req.usuario.idUsuario;
    const {idComerciante, titulo, calificacion,comentario} = req.body;
    try{
        const nuevoComentario = await ComentarioDao.crearComentario(idComerciante, idUsuario, titulo, calificacion, comentario);
        res.status(201).json(nuevoComentario);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const comentariosPatch = async (req, res = response) => {
    const {idComentario} = req.params;
    const {titulo, calificacion, descripcion} = req.body;
    try{
        const comentario = await ComentarioDao.modificarComentarioPorId(idComentario, titulo, calificacion, descripcion);
        res.status(200).json(comentario);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const comentariosDelete = async (req, res = response) => {
    const {idComentario} = req.params;
    try{
        const comentario = await ComentarioDao.eliminarComentarioPorId(idComentario);
        res.status(204);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

module.exports = {
    comentariosComercianteGet,
    comentariosUsuarioGet,
    comentariosPost,
    comentariosPatch,
    comentariosDelete
}