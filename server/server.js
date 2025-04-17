const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Để parse JSON body từ fetch()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hust_et_support_system'
});

app.use((req, res, next) => {
    console.log("Incoming request body:", req.body);
    next();
});

app.post('/register', (req, res) => {
    console.log("Request body:", req.body);  // Kiểm tra dữ liệu nhận được

    const { fullname, username, password } = req.body;
    const query = "INSERT INTO users (username, password, fullname) VALUES (?, ?, ?)";
    console.log("Query about to run:", query);
    console.log("Values:", [username, password, fullname]);

    db.query(query, [username, password, fullname], (err, result) => {
        if (err) {
            console.error("Error: ", err);  // Log chi tiết lỗi
            return res.json({ success: false, message: "Lỗi khi chèn dữ liệu: " + err.sqlMessage });
        }
        return res.json({ success: true });
    });
});



app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
