const {Router} = require('express');

const {
    ofertasIntercambiosGet,
    ofertasIntercambiosBusqueda,
    ofertasIntercambiosGetPorId,
    ofertasIntercambioGetPorComerciante,
    ofertasIntercambiosPost,
    ofertasIntercambiosPatch,
    ofertasIntercambiosDelete,
} = require ('../controllers/ofertaIntercambios');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', ofertasIntercambiosGet);
router.get('/busqueda', ofertasIntercambiosBusqueda);
router.get('/:idOfertaIntercambio', ofertasIntercambiosGetPorId);
router.get('/comerciante/:idComerciante', ofertasIntercambioGetPorComerciante);
router.post('/', [validarJWT], ofertasIntercambiosPost);
router.patch('/:idOfertaIntercambio',[validarJWT], ofertasIntercambiosPatch);
router.delete('/:idOfertaIntercambio',[validarJWT], ofertasIntercambiosDelete);

module.exports = router;