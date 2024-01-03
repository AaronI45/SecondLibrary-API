const { Router } = require('express');

const {
    usuariosGet,
    usuariosGetPorId,
    usuariosPost,
    usuariosLogin,
    usuariosPatchEstadoUsuario,
    usuariosPutActualizar,
    usuariosDelete
    // eliminarUsuario,
    // reseniarComerciante,
    //mensaje
} = require ('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { validarCamposUsuario } = require('../middlewares/validar-campos-usuario.js');



const router = Router();

router.get('/', usuariosGet);
router.get('/:idUsuario', usuariosGetPorId);
router.post('/',[validarCamposUsuario], usuariosPost);
router.post('/login', usuariosLogin);
router.patch('/:idUsuario', usuariosPatchEstadoUsuario);
router.put('/:idUsuario',[validarJWT], usuariosPutActualizar);
router.delete('/', [validarJWT], usuariosDelete);



module.exports = router;