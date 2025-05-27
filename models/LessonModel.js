const db = require('../db');

const findByFilters = (place, level, callback) => {
    let sql = `
        SELECT 
            l.lesNum,
            l.lesName,
            l.lesPrice,
            l.rating,
            l.lesinfo,
            l.lesPlace,
            l.lesDetailPlace,
            l.lesThumbImg,
            l.lesBackgroundImg,
            l.lesTime,
            l.lesLevel,
            u.userName AS instName,
            u.userImg,
            u.userinfo
        FROM lesson l
        JOIN user u ON l.instNum = u.userNum
        WHERE 1=1
    `;
    const params = [];

    if (place) {
        sql += ' AND l.lesPlace = ?';
        params.push(place);
    }

    if (level) {
        sql += ' AND l.lesLevel = ?';
        params.push(level);
    }

    db.query(sql, params, callback);
};

module.exports = {
    findByFilters,
};
