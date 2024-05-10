const OrderService = require('../services/order-service')
exports.order = (app) => {
    const service = new OrderService();

    app.get('/', async(req, res, next) => {
        try {
            const data = await service.getOrders()
            console.log(data)
            return res.status(200).json(data)
        } catch (error) {
            return res.status(404).json({ error });
        }
    })
    app.post('/checkout-order', async(req, res, next) => {
        try {
            
        } catch (error) {
            
        }
    }) 
}