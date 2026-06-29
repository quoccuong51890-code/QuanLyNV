const Attendance = require("../models/attendanceModel");


exports.checkIn = (req, res) => {

    const userId = req.user.id;

    Attendance.checkIn(userId, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Check In thất bại.",
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Check In thành công."
        });

    });

};


exports.checkOut = (req, res) => {
    const userId = req.user.id;
    Attendance.checkOut(userId, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Check Out thất bại.",
                error: err.message
            });
        }
        res.status(200).json({
            success: true,
            message: "Check Out thành công."
        });
    });
};

exports.getHistory = (req, res) => {
    const userId = req.user.id;
    Attendance.getHistory(userId, (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Không lấy được lịch sử chấm công.",
                error: err.message
            });
        }
        res.status(200).json({
            success: true,
            total: rows.length,
            attendance: rows
        });
    });
};