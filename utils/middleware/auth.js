import { validaToken } from "../../path.js"


export const auth = (req, res, next) => {
    //Bearer Auth
    if (!req.headers['authorization']) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(401).json({ error: 'Usuario no autenticado' })
    }

    let token = req.headers['authorization'].split(' ')[1]

    try {
        let ususario = validaToken(token)
        req.user = ususario
    } catch (error) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(401).json({ error: 'Token invalido' })
    }

    if (!validaToken(token)) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(401).json({ error: 'Token invalido' })
    }

    next()
}

export function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        return res.status(401).json({ message: 'No autorizado' });
    }
}

export function isAdmin(req, res, next) {
    if (req.session.admin) {
        return next();
    } else {
        return res.status(403).json({ message: 'Acceso denegado. Solo administradores pueden acceder.' });
    }
}

export function isLogged(req, res, next) {
    if (req.session.userId) {
        return res.status(401).json({ message: 'Ya estas logueado' });
    } else {
        return next();
    }
}



