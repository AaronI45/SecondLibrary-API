const {Router} = require('express');

const{
    intercambiosGet,
    intercambiosBusqueda,
    intercambiosGetPorComerciante,
    intercambiosGetPorId,
    intercambiosPost,
    intercambiosPatch,
    intercambiosDelete,
} = require ('../controllers/intercambios');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', intercambiosGet);
router.get('/busqueda', intercambiosBusqueda);
router.get('/comerciante/:idUsuario', intercambiosGetPorComerciante);
router.get('/:idIntercambio', intercambiosGetPorId);
router.post('/', [validarJWT], intercambiosPost);
router.patch('/:idIntercambio',[validarJWT], intercambiosPatch);
router.delete('/:idIntercambio',[validarJWT], intercambiosDelete);

module.exports = router;

