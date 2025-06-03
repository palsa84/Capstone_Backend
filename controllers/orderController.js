const OrderModel = require('../models/OrderModel');
const notificationModel = require('../models/notificationModel');
const lessonModel = require('../models/lessonModel');

const createOrder = (req, res) => {
    const { userId, lessonId } = req.body;

    if (!userId || !lessonId) {
        return res.status(400).json({ error: 'userId 또는 lessonId 누락' });
    }

    OrderModel.addOrder(userId, lessonId, async (err, result) => {
        if (err) {
            console.error('주문 실패:', err);
            return res.status(500).json({ error: '주문 실패' });
        }

        try {
            const [lesson] = await lessonModel.getLessonByIdAsync(lessonId);
            const instNum = lesson.instNum;
            const lesName = lesson.lesName;

            await notificationModel.createNotification({
                userNum: instNum,
                type: '결제완료',
                message: `'${lesName}' 수강생이 결제를 완료했습니다.`
            });

            res.status(201).json({ success: true, orderId: result.insertId });
        } catch (err) {
            console.error('알림 생성 실패:', err);
            res.status(201).json({
                success: true,
                orderId: result.insertId,
                warning: '알림 전송 실패'
            });
        }
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