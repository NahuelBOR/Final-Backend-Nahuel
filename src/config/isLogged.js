const isLogged = async (req, res, next) => {
    try {
        if (req.session.user) {
            return res.status(401).json({ message: 'Ya estas logueado' });
        } else {
            return next();
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = isLogged;