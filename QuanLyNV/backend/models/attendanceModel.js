const db = require("../config/db");

const Attendance = {
    checkIn(userId, callback) {
        const checkSql = `
            SELECT *
            FROM attendance
            WHERE user_id = ?
            AND date = CURDATE()
        `;
        db.query(checkSql, [userId], (err, rows) => {
            if (err) return callback(err);
            if (rows.length > 0) {
                return callback({
                    message: "Bạn đã Check In hôm nay."
                });
            }
            const sql = `
                INSERT INTO attendance
                (user_id, date, check_in)
                VALUES (?, CURDATE(), CURTIME())
            `;
            db.query(sql, [userId], callback);

        });
    },
    checkOut(userId, callback) {
        const sql = `
            UPDATE attendance
            SET check_out = CURTIME()
            WHERE user_id = ?
            AND date = CURDATE()
            AND check_out IS NULL
        `;
        db.query(sql, [userId], callback);
    },
    getHistory(userId, callback) {
        const sql = `
            SELECT
                id,
                date,
                check_in,
                check_out
            FROM attendance
            WHERE user_id = ?
            ORDER BY date DESC
        `;
        db.query(sql, [userId], callback);
    }
};

module.exports = Attendance;