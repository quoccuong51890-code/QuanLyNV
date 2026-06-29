const db = require("../config/db");

const User = {
    createUser(data, callback) {
        const sql = `
            INSERT INTO users
            (fullname, username, email, password, role)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(sql, [
            data.fullname,
            data.username,
            data.email,
            data.password,
            data.role
        ], callback);
    },
    findByUsername(username, callback) {
        db.query(
            "SELECT * FROM users WHERE username = ?",
            [username],
            callback
        );
    },
    findById(id, callback) {
        db.query(
            "SELECT * FROM users WHERE id = ?",
            [id],
            callback
        );
    }
};

module.exports = User;