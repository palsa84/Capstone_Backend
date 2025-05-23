const QuitModel = require('../models/QuitModel');
const UserModel = require('../models/UserModel');

const saveLocation = async (userNum, userlocation1, userlocation2, callback) => {
    try {
        const result = await UserModel.updateLocation(userNum, userlocation1, userlocation2);
        callback(null, result);
    } catch (err) {
        callback(err);
    }
};

const getLocation = (userNum, callback) => {
    UserModel.getLocationFromDB(userNum, callback);
};

const deleteUser = (userNum, callback) => {
    QuitModel.deleteUserFromDB(userNum, callback);
};

module.exports = {
    saveLocation,
    getLocation,
    deleteUser
};
