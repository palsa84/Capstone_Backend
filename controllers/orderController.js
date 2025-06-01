const OrderModel = require('../models/OrderModel');

const createOrder = (req, res) => {
    const { userId, lessonId } = req.body;

    if (!userId || !lessonId) {
        return res.status(400).json({ error: 'userId 또는 lessonId 누락' });
    }

    OrderModel.addOrder(userId, lessonId, (err, result) => {
        if (err) {
            console.error('주문 실패:', err);
            return res.status(500).json({ error: '주문 실패' });
        }
        res.status(201).json({ success: true, orderId: result.insertId });
    });
};

const getOrdersByUser = (req, res) => {
    const { userId } = req.params;

    OrderModel.getOrdersByUserId(userId, (err, orders) => {
        if (err) {
            console.error('주문 조회 실패:', err);
            return res.status(500).json({ error: '주문 조회 실패' });
        }
        res.json(orders);
    });
};

module.exports = {
    createOrder,
    getOrdersByUser
};
