const jwt = require('jsonwebtoken');

const generarJWT = (usuario) => {
    return new Promise((resolve, reject) => {
        const payload = {usuario};
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}