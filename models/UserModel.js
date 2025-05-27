const db = require('../db');

// 위치 저장
const updateLocation = (userNum, location1, location2) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE user SET userlocation1 = ?, userlocation2 = ? WHERE userNum = ?';
    db.query(sql, [location1, location2, userNum], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// 위치 불러오기
const getLocationFromDB = (userNum, callback) => {
  const sql = 'SELECT userlocation1, userlocation2 FROM user WHERE userNum = ?';
  db.query(sql, [userNum], callback);
};

// 비밀번호 변경 (현재 비밀번호 확인 후 업데이트)
const verifyPasswordAndUpdate = (userNum, currentPw, newPw, callback) => {
    const checkSql = 'SELECT * FROM user WHERE userNum = ? AND userPw = ?';
    db.query(checkSql, [userNum, currentPw], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) return callback(null, false);

        const updateSql = 'UPDATE user SET userPw = ? WHERE userNum = ?';
        db.query(updateSql, [newPw, userNum], (updateErr, updateResult) => {

            if (updateErr) return callback(updateErr);
            return callback(null, true);
        });
    });
};



module.exports = {
  updateLocation,
  getLocationFromDB,
  verifyPasswordAndUpdate,
};
