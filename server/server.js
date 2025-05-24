const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json()); // Để parse JSON body từ fetch()

// Cho phép truy cập ảnh tĩnh
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Thư mục đích
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
});
const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hust_et_support_system'
});


app.use((req, res, next) => {
    next();
});

app.post('/register', (req, res) => {

    const { fullname, username, password } = req.body;
    const query = "INSERT INTO users (username, password, fullname) VALUES (?, ?, ?)";

    db.query(query, [username, password, fullname], (err, result) => {
        if (err) {
            console.error("SERVER ERR-1: ", err);  // Log chi tiết lỗi
            return res.json({ success: false, message: "Lỗi khi chèn dữ liệu: " + err.sqlMessage });
        }
        return res.json({ success: true });
    });
}); //signin properties

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error("SERVER ERR-2:", err);
            return res.status(500).json({ success: false, message: "Lỗi server" });
        }

        if (results.length > 0) {
            const user = results[0];
            const userData = {
                username: user.username,
                password: user.password,
                fullname: user.fullname,
                dob: user.dob,
                gender: user.gender,
                role: user.role,
                status: user.status,
                avatar: user.avatar
            };
            return res.json({ success: true, userData });
        } else {
            return res.json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
        }
    });
});
 //login properties

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi server khi lấy users" });
        }
        res.json(result);
    });
});
//get full user info

// Endpoint upload-thumbnail
app.post("/upload-thumbnail", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Không có file nào được upload." });
    }

    // Trả về đường dẫn ảnh
    const fileUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// API thêm khóa học
app.post("/add-course", (req, res) => {
    const {
        course_id,
        course_name,
        english_name,
        child_management,
        managing_department,
        weight,
        description,
        price,
        thumbnail,
        author
    } = req.body;

    const query = `INSERT INTO courses (course_id, course_name, english_name, child_management, managing_department, weight, description, price, thumbnail, author) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        course_id,
        course_name,
        english_name,
        child_management,
        managing_department,
        weight,
        description,
        price,
        thumbnail,
        author
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("SERVER ERR-3:", err);
            return res.status(500).json({ error: "Lỗi khi thêm khóa học." });
        }
        res.json({ success: true, message: "Đã thêm học phần thành công!", courseId: result.insertId });
    });
});

app.get("/courses", (req, res) => {
    db.query("SELECT * FROM courses", (err, results) => {
        if (err) {
            console.error("SERVER ERR-4:", err);
            return res.status(500).json({ error: "Lỗi server" });
        }
        res.json(results);
    });
});

app.get("/get-userinfo", (req, res) => {
    const { username } = req.query;

    if (!username) return res.status(400).json({ error: "Thiếu username" });

    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
        if (err) return res.status(500).json({ error: "Lỗi server" });
        if (results.length === 0) return res.status(404).json({ error: "Không tìm thấy user" });

        const user = results[0];
        return res.json({
            username: user.username,
            fullname: user.fullname,
            dob: user.dob,
            gender: user.gender,
            avatar: user.avatar,
            role: user.role,
            status: user.status
        });
    });
});

app.get("/get-course-author", (req, res) => {
    const { username } = req.query;

    if (!username) return res.status(400).json({ error: "Thiếu username" });

    const query = "SELECT * FROM courses WHERE author = ?";
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error("SERVER ERR-5:", err);
            return res.status(500).json({ error: "Lỗi server" });
        }
        res.json(results);
    });
});






app.listen(3001, () => {
    console.log("Server is running on port 3001");
});