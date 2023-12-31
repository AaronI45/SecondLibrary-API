const { Router } = require('express');

const {
    usuariosGet,
    usuariosPost,
    usuariosLogin,
    usuariosPatchEstadoUsuario,
    usuariosPutActualizar
    // desbanearUsuario,
    // usuariosUpdate,
    // editarUsuario,
    // eliminarUsuario,
    // reseniarComerciante,
    // librosGet,
    // publicarLibro,
    //mensaje
} = require ('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);
router.post('/', usuariosPost);
router.post('/login', usuariosLogin);
router.patch('/:idUsuario', usuariosPatchEstadoUsuario);
router.put('/:idUsuario', usuariosPutActualizar);

module.exports = router;