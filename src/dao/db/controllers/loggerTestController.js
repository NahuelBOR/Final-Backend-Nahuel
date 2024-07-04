const loggerMiddleware  = require('../../../config/logger');

exports.loggerTest = async (req, res) => {
    try {
        req.logger.debug('Mensaje de debug');
        req.logger.info('Mensaje de informacion');
        req.logger.warning('Mensaje de peligro');
        req.logger.fatal('Mensaje fatal');
        req.logger.error('Mensaje de error');
        

        res.status(200).json({ message: 'Los logs se probaron correctamente' });
    } catch (error) {
        req.logger.error('Error probando los logs:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
