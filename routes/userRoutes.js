const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/location', userController.saveLocation);
router.get('/location/:userNum', userController.getLocation);
router.delete('/delete/:userNum', userController.deleteUser); 
router.post('/update-name', userController.updateUserName);
router.post('/update-password', userController.updatePassword);

module.exports = router;
