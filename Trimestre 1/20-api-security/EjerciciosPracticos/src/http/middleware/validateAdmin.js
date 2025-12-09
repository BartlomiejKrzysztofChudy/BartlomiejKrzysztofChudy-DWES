export default function validateRol(req, res, next) {

    const role = req.headers.role

    if(role === 'admin'){
        next();
    }else{
        return res.status(403).json({
            statusCode: 403,
            error: "Acceso denegado"
        })
    }
}
