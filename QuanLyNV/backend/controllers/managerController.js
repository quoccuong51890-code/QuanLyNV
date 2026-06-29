const db = require("../config/db");

exports.getAllLeaves = (req, res) => {
    db.query(
        `SELECT
        leave_requests.*,
        users.fullname
        FROM leave_requests
        JOIN users
        ON leave_requests.user_id=users.id
        ORDER BY leave_requests.id DESC`,
        (err, rows) => {
            if (err)
                return res.status(500).json(err);
            res.json(rows);
        }
    );
};
exports.approveLeave = (req, res) => {
    const { status, note } = req.body;
    db.query(
        `UPDATE leave_requests
        SET
        status=?,
        note=?
        WHERE id=?`,
        [
            status,
            note,
            req.params.id
        ],
        (err) => {
            if (err)
                return res.status(500).json(err);
            res.json({
                message: "Đã cập nhật."
            });
        }
    );
};