const connection = require('../config/database');

const getAllUser = async () => {
    const [results, fields] = await connection.query('select * from Users u');
    return results;
}

const getUserById = async (userId) => {
    let [results, fields] = await connection.query(
        `select * from Users u WHERE id = ?`, [userId]
    );
    let user = results && results.length > 0 ? results[0] : {}

    return user;
}

const updateUserById = async (email, city, name, userId) => {

    let [results, fields] = await connection.query(
        ` UPDATE Users SET email = ?, city = ?, name = ? WHERE id = ? `,
        [email, city, name, userId]
    );
}

const deleteUserById = async (userId) => {
    let [results, fields] = await connection.query(
        ` DELETE FROM Users WHERE id = ? `,
        [userId]
    );
}

module.exports = {
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById
}