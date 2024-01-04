const {Router} = require('express');

const {
    comentariosComercianteGet,
    comentarioGet,
    comentariosGet,
    comentariosUsuarioGet,
    comentariosComercianteGetCalificacion,
    comentariosPost,
    comentariosPatch,
    comentariosDelete
} = require('../controllers/comentarios');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

router.get('/comerciantes/:idComerciante', comentariosComercianteGet);
router.get('/:idComentario', comentarioGet);
router.get('/', comentariosGet);
router.get('/usuarios/:idUsuario', comentariosUsuarioGet);
router.get('/comerciantes/calificacion/:idComerciante', comentariosComercianteGetCalificacion);
router.post('/', [validarJWT], comentariosPost);
router.patch('/:idComentario',[validarJWT], comentariosPatch);
router.delete('/:idComentario',[validarJWT], comentariosDelete);

module.exports = router;
