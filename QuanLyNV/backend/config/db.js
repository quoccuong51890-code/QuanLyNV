const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",          
    database: "employee_management"
});
db.connect((err) => {
    if (err) {
        console.error("❌ Kết nối MySQL thất bại!");
        console.error(err.message);
        return;
    }

    console.log("✅ Kết nối MySQL thành công!");
});
module.exports = db;