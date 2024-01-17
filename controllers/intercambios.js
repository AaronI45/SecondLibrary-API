const {response} = require('express');
const IntercambioDao = require('../dao/intercambio-dao');
const {use} = require('../routes/intercambios');
const OfertaIntercambioDao = require('../dao/ofertaIntercambio-dao');

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

const intercambiosGetPorIdUsuario = async(req, res = response) => {
    const {idUsuario} = req.params;
    try{
        const intercambios = await IntercambioDao.getIntercambiosPorIdUsuario(idUsuario);
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
    try{
        const nuevoIntercambio = await IntercambioDao.crearIntercambio(req.body, req.usuario.idUsuario);
        if (nuevoIntercambio){
            await OfertaIntercambioDao.actualizarOfertaIntercambio(req.body.Oferta_Intercambio_idOferta_Intercambio, {estadoIntercambio: 'Finalizado'});
        }
        res.status(201).json(nuevoIntercambio);
    }catch(error){
        res.status(500).json( {message: error.toString()});
    }
}

const intercambiosPatch = async(req, res = response) => {
    const {idIntercambio} = req.params;
    const intercambioEncontrado = await IntercambioDao.getIntercambioPorId(idIntercambio);
    if(!intercambioEncontrado){
        return res.status(404).json({message: 'Intercambio no encontrado'});
    }
    if (intercambioEncontrado.estadoIntercambio == 'finalizado'){
        return res.status(401).json({message: 'No puedes editar un intercambio finalizado'});
    }
    if (Usuario_idUsuario == intercambioEncontrado.Comerciante_idComerciante){
        return res.status(401).json({message: 'No puedes intercambiar un libro contigo mismo'});
    }
    try{
        const intercambioEditado = await IntercambioDao.modificarIntercambioPorId(idIntercambio, req.body);
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
    intercambiosGetPorIdUsuario,
    intercambiosGetPorId,
    intercambiosPost,
    intercambiosPatch,
    intercambiosDelete,
}