const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// 장바구니 조회
router.get('/:userId', cartController.getCartByUser); 

// 장바구니 추가      
router.post('/', cartController.addToCart);

// 장바구니 삭제                 
router.delete('/:cartId', cartController.removeFromCart);   

module.exports = router;
