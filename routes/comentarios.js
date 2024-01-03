const {Router} = require('express');

const {
    comentariosComercianteGet,
    comentariosUsuarioGet,
    comentariosPost,
    comentariosPatch,
    comentariosDelete
} = require('../controllers/comentarios');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:idComerciante', comentariosComercianteGet);
router.get('/', [validarJWT], comentariosUsuarioGet);
router.post('/', [validarJWT], comentariosPost);
router.patch('/:idComentario',[validarJWT], comentariosPatch);
router.delete('/:idComentario',[validarJWT], comentariosDelete);

module.exports = router;
