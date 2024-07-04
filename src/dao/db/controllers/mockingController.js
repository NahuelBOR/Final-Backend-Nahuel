const mockingService = require('../services/mockingService');

exports.getMockingProducts = (req, res) => {
    const products = mockingService.generateProducts(25);
    res.render('mocking', { products });
};