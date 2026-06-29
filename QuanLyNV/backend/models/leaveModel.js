const db = require("../config/db");

const Leave = {
    createLeave(data, callback) {
        const sql = `
            INSERT INTO leave_requests
            (user_id, start_date, end_date, reason)
            VALUES (?, ?, ?, ?)
        `;
        db.query(sql, [
            data.user_id,
            data.start_date,
            data.end_date,
            data.reason
        ], callback);
    },
    getLeavesByUser(userId, callback) {
        db.query(
            "SELECT * FROM leave_requests WHERE user_id = ? ORDER BY id DESC",
            [userId],
            callback
        );
    },
    deleteLeave(id, callback) {
        db.query(
            "DELETE FROM leave_requests WHERE id = ?",
            [id],
            callback
        );
    },
    getAllLeaves(callback) {
        const sql = `
            SELECT
                leave_requests.*,
                users.fullname
            FROM leave_requests
            JOIN users
            ON leave_requests.user_id = users.id
            ORDER BY leave_requests.id DESC
        `;
        db.query(sql, callback);
    },
    updateStatus(id, status, note, callback) {
        const sql = `
            UPDATE leave_requests
            SET status = ?, note = ?
            WHERE id = ?
        `;
        db.query(sql, [
            status,
            note,
            id
        ], callback);
    }
};

module.exports = Leave;