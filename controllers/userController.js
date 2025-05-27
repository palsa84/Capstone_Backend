const db = require('../db');
const userService = require('../services/userService');

const saveLocation = async (req, res) => {
    const { userNum, userlocation1, userlocation2 } = req.body;
    try {
        await userService.saveLocation(userNum, userlocation1, userlocation2);
        res.json({ success: true });  
    } catch (err) {
        console.error('위치 저장 실패:', err);
        res.status(500).json({ error: '위치 저장 실패' });
    }
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

const updateUserName = (req, res) => {
    const { userNum, userName } = req.body;
    const sql = 'UPDATE user SET userName = ? WHERE userNum = ?';

    db.query(sql, [userName, userNum], (err, result) => {
        if (err) {
            console.error('이름 수정 실패:', err);
            return res.status(500).json({ error: '이름 수정 실패' });
        }
        res.json({ success: true });
    });
};

const updatePassword = (req, res) => {
    const { userNum, currentPw, newPw } = req.body;

    userService.changePassword(userNum, currentPw, newPw, (err, success) => {
        if (err) {
            console.error('비밀번호 변경 실패:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        if (!success) {
            return res.status(401).json({ error: '현재 비밀번호가 올바르지 않습니다.' });
        }
        res.json({ success: true });
    });
};



module.exports = {
    saveLocation,
    getLocation,
    deleteUser,
    updateUserName,
    updatePassword, 
};
