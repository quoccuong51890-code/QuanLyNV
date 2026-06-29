const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const managerRoutes = require("./routes/managerRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/manager", managerRoutes);
app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Employee Management API đang hoạt động.",
        version: "1.0.0"
    });

});

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "API không tồn tại."
    });

});

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Lỗi Server.",
        error: err.message
    });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("=================================");
    console.log(" Employee Management Server");
    console.log("=================================");
    console.log(` Server running: http://localhost:${PORT}`);
    console.log(" Database Connected");
    console.log("=================================");
});