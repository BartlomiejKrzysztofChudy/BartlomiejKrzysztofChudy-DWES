import bcrypt from 'bcrypt';

const hashGuardado = '$2b$10$S.Fa8MOX.nSOe20zp7eAn.N1t6QxSkh9SYwAWFju9bMe37OOD.3xC';

export default async function validateSecret(req, res, next) {

    const authorization = req.headers.authorization;
    if(!authorization){

        return res.status(401).json({
            statusCode: 401,
            error: "Acceso denegado"
        });
    }else{
        const token = authorization.slice(7);
        const esValido = await bcrypt.compare(token, hashGuardado);

        if(!esValido){
            return res.status(401).json({
            statusCode: 401,
            error: "Acceso denegado"
            });

        }else{
            next();
        }
    }
}



