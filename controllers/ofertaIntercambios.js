const {response} = require('express');
const OfertaIntercambioDao = require('../dao/ofertaIntercambio-dao');
const { use } = require('../routes/ofertaIntercambios');

const ofertasIntercambiosGet = async(req, res = response) => {
    try{
        const ofertaIntercambios = await OfertaIntercambioDao.listarOfertasIntercambios();
        res.json(ofertaIntercambios);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const ofertasIntercambiosBusqueda = async(req, res = response) => {
    const {
        estado = 'activo',
        isbn = ''
    } = req.query;
    try{
        const ofertasIntercambios = await OfertaIntercambioDao.getOfertaIntercambiosBusqueda(estado, isbn);
        res.json(ofertasIntercambios);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const ofertasIntercambiosGetPorId = async(req, res = response) => {
    try{
        const ofertaIntercambio = await OfertaIntercambioDao.getOfertaIntercambioPorId(req.params.idOfertaIntercambio);
        res.json(ofertaIntercambio);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const ofertasIntercambioGetPorComerciante = async(req, res = response) => {
    const {idComerciante} = req.params;
    try{
        const ofertaIntercambio = await OfertaIntercambioDao.getOfertaIntercambioPorComerciante(idComerciante);
        res.json(ofertaIntercambio);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const ofertasIntercambiosPost = async(req, res = response) => {
    try{
        const nuevaOferta = await OfertaIntercambioDao.crearOfertaIntercambio(req.usuario.idUsuario, req.body);
        res.status(201).json(nuevaOferta);
    }catch(error){
        res.status(500).json( {message: error.toString()});
    }
}

const ofertasIntercambiosPatch = async(req, res = response) => {
    const {idOfertaIntercambio} = req.params;
    const ofertaIntercambioEncontrada = await OfertaIntercambioDao.getOfertaIntercambioPorId(idOfertaIntercambio);
    if(!ofertaIntercambioEncontrada){
        return res.status(404).json({message: 'Oferta de intercambio no encontrada'});
    }
    try{
        const ofertaIntercambio = await OfertaIntercambioDao.actualizarOfertaIntercambio(idOfertaIntercambio, req.body);
        res.json(ofertaIntercambio);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const ofertasIntercambiosDelete = async(req, res = response) => {
    const {idOferta_Intercambio} = req.params;
    const intercambioEncontrado = await OfertaIntercambioDao.getOfertaIntercambioPorId(idOferta_Intercambio);
    if(!intercambioEncontrado){
        return res.status(404).json({message: 'Oferta de intercambio no encontrada'});
    }
    if (intercambioEncontrado.Usuario_idUsuario != req.usuario.idUsuario){
        return res.status(401).json({message: 'No tienes permiso para eliminar esta oferta'});
    }
    try{
        const ofertaIntercambio = await OfertaIntercambioDao.eliminarOfertaIntercambio(idOferta_Intercambio);
        res.status(204);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

module.exports = {
    ofertasIntercambiosGet,
    ofertasIntercambiosBusqueda,
    ofertasIntercambiosGetPorId,
    ofertasIntercambioGetPorComerciante,
    ofertasIntercambiosPost,
    ofertasIntercambiosPatch,
    ofertasIntercambiosDelete
}