const {response} = require('express');
const IntercambioDao = require('../dao/intercambio-dao');
const {use} = require('../routes/intercambios');

const intercambiosGet = async(req, res = response) => {
    try{
        const intercambios = await IntercambioDao.getIntercambios();
        res.json(intercambios);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const intercambiosBusqueda = async(req, res = response) => {
    const {
        estado = 'activo',
        isbn = ''
    } = req.query;
    try{
        const intercambios = await IntercambioDao.getIntercambiosBusqueda(estado, isbn);
        res.json(intercambios);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const intercambiosGetPorComerciante = async(req, res = response) => {
    const {idUsuario} = req.params;
    try{
        const intercambios = await IntercambioDao.getIntercambiosPorIdComerciante(idUsuario);
        res.status(200).json(intercambios);
    }catch(error){
        res.status(500).json({message: error});
    }
}

const intercambiosGetPorId = async(req, res = response) => {
    const {idIntercambio} = req.params;
    try{
        const intercambio = await IntercambioDao.getIntercambioPorId(idIntercambio);
        res.status(200).json(intercambio);
    }catch(error){
        res.status(500).json( {message: error});
    
    }
}

const intercambiosPost = async(req, res = response) => {
    const {isbn, estadoLibro} = req.body;
    try{
        const nuevoIntercambio = await IntercambioDao.crearIntercambio(isbn, estadoLibro, req.usuario.idUsuario);
        res.status(201).json(nuevoIntercambio);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const intercambiosPatch = async(req, res = response) => {
    const {idIntercambio} = req.params;
    const intercambioEncontrado = await IntercambioDao.getIntercambioPorId(idIntercambio);
    if(!intercambioEncontrado){
        return res.status(404).json({message: 'Intercambio no encontrado'});
    }
    if (intercambioEncontrado.Comerciante_idComerciante != req.usuario.idUsuario){
        return res.status(401).json({message: 'No tienes permiso para modificar este intercambio'});
    }
    if (intercambioEncontrado.estadoIntercambio == 'finalizado'){
        return res.status(401).json({message: 'No puedes editar un intercambio finalizado'});
    }
    const {
        isbnComerciante = intercambioEncontrado.isbnComerciante,
        isbnUsuario = null,
        Usuario_idUsuario = null,
        estadoLibro = intercambioEncontrado.estadoLibro,
        estadoIntercambio = intercambioEncontrado.estadoIntercambio
    } = req.body;
    if (Usuario_idUsuario == intercambioEncontrado.Comerciante_idComerciante){
        return res.status(401).json({message: 'No puedes intercambiar un libro contigo mismo'});
    }
    const intercambio = {
        isbnComerciante,
        isbnUsuario,
        Usuario_idUsuario,
        estadoLibro,
        estadoIntercambio
    }
    if(estadoIntercambio == 'activo' && (isbnUsuario == null || Usuario_idUsuario == null)){
        return res.status(401).json({message: 'No puedes activar un intercambio sin un usuario y un isbn'});
    }
    if(estadoIntercambio == 'finalizado' && isbnUsuario != null && Usuario_idUsuario != null){
        intercambio.fechaDeFinalizacion = new Date();
    }
    try{
        const intercambioEditado = await IntercambioDao.modificarIntercambioPorId(idIntercambio, intercambio);
        res.status(200).json(intercambioEditado);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

const intercambiosDelete = async(req, res = response) => {
    const {idIntercambio} = req.params;
    const intercambioEncontrado = await IntercambioDao.getIntercambioPorId(idIntercambio);
    if(!intercambioEncontrado){
        return res.status(404).json({message: 'Intercambio no encontrado'});
    }
    if (intercambioEncontrado.Comerciante_idComerciante != req.usuario.idUsuario){
        return res.status(401).json({message: 'No tienes permiso para eliminar este intercambio'});
    }
    try{
        const intercambio = await IntercambioDao.eliminarIntercambioPorId(idIntercambio);
        res.status(204);
    }catch(error){
        res.status(500).json( {message: error});
    }
}

module.exports = {
    intercambiosGet,
    intercambiosBusqueda,
    intercambiosGetPorComerciante,
    intercambiosGetPorId,
    intercambiosPost,
    intercambiosPatch,
    intercambiosDelete,
}