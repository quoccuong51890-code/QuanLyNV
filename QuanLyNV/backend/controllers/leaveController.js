const db = require("../config/db");

exports.createLeave = (req, res) => {
    const { start_date, end_date, reason } = req.body;
    db.query(
        `INSERT INTO leave_requests
        (user_id,start_date,end_date,reason)
        VALUES(?,?,?,?)`,
        [
            req.user.id,
            start_date,
            end_date,
            reason
        ],
        (err) => {
            if (err)
                return res.status(500).json(err);
            res.json({
                message: "Đã gửi đơn."
            });
        }
    );
};
exports.getLeaves = (req, res) => {
    db.query(
        "SELECT * FROM leave_requests WHERE user_id=? ORDER BY id DESC",
        [req.user.id],
        (err, rows) => {
            if (err)
                return res.status(500).json(err);
            res.json(rows);
        }
    );
};
exports.deleteLeave = (req, res) => {
    db.query(
        "DELETE FROM leave_requests WHERE id=?",
        [req.params.id],
        (err) => {
            if (err)
                return res.status(500).json(err);
            res.json({
                message: "Đã hủy đơn."
            });
        }
    );
};