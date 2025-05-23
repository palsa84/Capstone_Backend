const userService = require('../services/userService');

const saveLocation = (req, res) => {
    const { userNum, userlocation1, userlocation2 } = req.body;
    userService.saveLocation(userNum, userlocation1, userlocation2, (err, result) => {
        if (err) return res.status(500).json({ error: '위치 저장 실패' });
        res.json({ success: true });
    });
};

const getLocation = (req, res) => {
    const userNum = req.params.userNum;
    userService.getLocation(userNum, (err, result) => {
        if (err) return res.status(500).json({ error: 'DB 오류' });
        if (!result) return res.status(404).json({ error: '사용자 없음' });

        const { userlocation1, userlocation2 } = result;
        res.json({ userlocation1, userlocation2 });
    });
};

const deleteUser = (req, res) => {
    const userNum = req.params.userNum;
    userService.deleteUser(userNum, (err, result) => {
        if (err) {
            console.error('회원 삭제 실패:', err);
            return res.status(500).json({ success: false, error: 'DB 오류' });
        }
        res.json({ success: true });
    });
};

module.exports = {
    saveLocation,
    getLocation,
    deleteUser
};
