const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const iconv = require('iconv-lite');

const app = express();

const fs = require('fs');


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

// Cấu hình database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hust_et_support_system',
    charset: 'utf8mb4'
});


app.use((req, res, next) => {
    next();
});

// Đăng kí tài khoản
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
}); 

// Đăng nhập
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

app.post('/change-password', async (req, res) => {
    const { username, oldPass, newPass } = req.body;  // Chữ P hoa, trùng frontend


    // Truy vấn người dùng
    const sqlCheck = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sqlCheck, [username, oldPass], (err, results) => {
        if (err) {
            console.error("Lỗi truy vấn:", err);
            return res.status(500).json({ success: false, message: "Lỗi server" });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: "Mật khẩu cũ không đúng" });
        }

        // Nếu đúng thì cập nhật mật khẩu mới
        const sqlUpdate = "UPDATE users SET password = ? WHERE username = ?";
        db.query(sqlUpdate, [newPass, username], (err2) => {
            if (err2) {
                console.error("Lỗi cập nhật:", err2);
                return res.status(500).json({ success: false, message: "Cập nhật thất bại" });
            }

            return res.json({ success: true, message: "Đổi mật khẩu thành công" });
        });
    });
});

app.post('/update-userinfo', async (req, res) => {
    const { username, fullname, dob, gender, avatar, role, status } = req.body;

    const sqlCheck = "SELECT * FROM users WHERE username = ?";
    db.query(sqlCheck, [username], (err, results) => {
        if (err) {
            console.error("Lỗi truy vấn:", err);
            return res.status(500).json({ success: false, message: "Lỗi server" });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: "Tài khoản không tồn tại" });
        }

        const sqlUpdate = `UPDATE users SET fullname = ?, dob = ?, gender = ?, avatar = ?, role = ?, status = ? WHERE username = ?`;

        db.query(sqlUpdate, [fullname, dob, gender, avatar, role, status, username], (err2) => {
            if (err2) {
                console.error("Lỗi cập nhật:", err2);
                return res.status(500).json({ success: false, message: "Cập nhật thất bại" });
            }

            return res.json({ success: true, message: "Chỉnh sửa dữ liệu thành công" });
        });
    });
});

app.post('/delete-user', (req, res) => {
    const { username } = req.body;

    const sql = "DELETE FROM users WHERE username = ?";
    db.query(sql, [username], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Lỗi khi xóa người dùng" });
        return res.json({ success: true, message: "Đã xóa người dùng" });
    });
});

 
// Lấy toàn bộ dữ liệu user
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi server khi lấy users" });
        }
        res.json(result);
    });
});

// Tạo endpoint upload ảnh vào local
app.post("/upload-thumbnail", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Không có file nào được upload." });
    }

    // Trả về đường dẫn ảnh
    const fileUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// Thêm khóa học mới
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
    const values = [course_id, course_name, english_name, child_management, managing_department, weight, description, price, thumbnail, author];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("SERVER ERR-3:", err);
            return res.status(500).json({ error: "Lỗi khi thêm khóa học." });
        }

        const suggestPath = path.join(__dirname, "data", "search_suggest.json");
        fs.readFile(suggestPath, "utf-8", (err, data) => {
            if (err) {
                console.error("ERR-reading suggest file:", err);
                return res.status(500).json({ error: "Không đọc được file gợi ý" });
            }

            let suggestions = JSON.parse(data);
            const exists = suggestions.find(item => item.course_id === course_id);

            if (!exists) {
                suggestions.push({
                    course_id,
                    text: [course_name, course_name.toLowerCase()]
                });

                fs.writeFile(suggestPath, JSON.stringify(suggestions, null, 2), (err) => {
                    if (err) {
                        console.error("ERR-writing suggest file:", err);
                        return res.status(500).json({ error: "Lỗi khi ghi file gợi ý" });
                    }

                    return res.json({
                        success: true,
                        message: "Đã thêm học phần và cập nhật gợi ý",
                        courseId: result.insertId
                    });
                });
            } else {
                return res.json({
                    success: true,
                    message: "Đã thêm học phần (gợi ý đã tồn tại)",
                    courseId: result.insertId
                });
            }
        });
    });
});


// Lấy toàn bộ dữ liệu khóa học
app.get("/courses", (req, res) => {
    db.query("SELECT * FROM courses", (err, results) => {
        if (err) {
            console.error("SERVER ERR-4:", err);
            return res.status(500).json({ error: "Lỗi server" });
        }
        res.json(results);
    });
});

// Lấy dữ liệu người dùng cụ thể
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

app.get("/get-courseinfo", (req, res) => {
    const { course_id } = req.query;

    if (!course_id) {
        return res.status(400).json({ error: "Thiếu course_id" });
    }

    const query = "SELECT * FROM courses WHERE course_id = ?";
    db.query(query, [course_id], (err, results) => {
        if (err) {
            console.error("SERVER ERR-COURSE:", err);
            return res.status(500).json({ error: "Lỗi server" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Không tìm thấy khóa học" });
        }

        const course = results[0];
        return res.json({
            course_id: course.course_id,
            course_name: course.course_name,
            english_name: course.english_name,
            child_management: course.child_management,
            managing_department: course.managing_department,
            weight: course.weight,
            description: course.description,
            price: course.price,
            thumbnail: course.thumbnail,
            author: course.author
        });
    });
});


// Lấy dữ liệu khóa học theo id người tạo 
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


// Kiểm tra đã đăng ký hay chưa
app.get("/check-registration", (req, res) => {
    const { username, course_id } = req.query;
    const query = "SELECT * FROM user_courses WHERE username = ? AND course_id = ?";
    db.query(query, [username, course_id], (err, results) => {
        if (err) return res.status(500).json({ error: "Lỗi server" });
        return res.json({ registered: results.length > 0 });
    });
});

// Đăng ký khóa học
app.post("/register-course", (req, res) => {
    const { username, course_id } = req.body;
    const query = "INSERT INTO user_courses (username, course_id) VALUES (?, ?)";
    db.query(query, [username, course_id], (err) => {
        if (err) return res.status(500).json({ error: "Lỗi khi đăng ký khóa học" });
        res.json({ success: true });
    });
});

// Hủy khóa học
app.post("/unregister-course", (req, res) => {
    const { username, course_id } = req.body;
    const query = "DELETE FROM user_courses WHERE username = ? AND course_id = ?";
    db.query(query, [username, course_id], (err) => {
        if (err) return res.status(500).json({ error: "Lỗi khi hủy khóa học" });
        res.json({ success: true });
    });
});


// Lấy thông tin khóa học và time đăng kí theo id người đăng kí 
app.get("/get-course-subscriber", (req, res) => {
    const { username } = req.query;

    if (!username) return res.status(400).json({ error: "Thiếu username" });

    const query = "SELECT courses.*, user_courses.registered_at FROM user_courses JOIN courses ON user_courses.course_id = courses.course_id WHERE user_courses.username = ?";
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error("SERVER ERR-7:", err);
            return res.status(500).json({ error: "Lỗi server" });
        }
        res.json(results);
    });
});

app.get("/count-course-registrations", (req, res) => {
    const { course_id } = req.query;
    const sql = "SELECT COUNT(*) AS count FROM user_courses WHERE course_id = ?";
    db.query(sql, [course_id], (err, result) => {
        if (err) {
            console.error("Lỗi truy vấn đếm số đăng ký:", err);
            return res.status(500).json({ error: "Lỗi server" });
        }
        res.json({ count: result[0].count }); // Chỗ này rất quan trọng
    });
});


// Kiểm tra đã like hay chưa
app.get("/check-like", (req, res) => {
    const { username, course_id } = req.query;
    const query = "SELECT * FROM user_like_courses WHERE username = ? AND course_id = ?";
    db.query(query, [username, course_id], (err, results) => {
        if (err) return res.status(500).json({ error: "Lỗi server" });
        return res.json({ registered: results.length > 0 });
    });
});

// Like khóa học
app.post("/like-course", (req, res) => {
    const { username, course_id } = req.body;
    const query = "INSERT INTO user_like_courses (username, course_id) VALUES (?, ?)";
    db.query(query, [username, course_id], (err) => {
        if (err) return res.status(500).json({ error: "Lỗi khi thích khóa học" });
        res.json({ success: true });
    });
});

// Unlike khóa học
app.post("/unlike-course", (req, res) => {
    const { username, course_id } = req.body;
    const query = "DELETE FROM user_like_courses WHERE username = ? AND course_id = ?";
    db.query(query, [username, course_id], (err) => {
        if (err) return res.status(500).json({ error: "Lỗi khi hủy thích khóa học" });
        res.json({ success: true });
    });
});
 
app.get("/count-course-like", (req, res) => {
    const { course_id } = req.query;
    const sql = "SELECT COUNT(*) AS count FROM user_like_courses WHERE course_id = ?";
    db.query(sql, [course_id], (err, result) => {
        if (err) {
            console.error("Lỗi truy vấn đếm số đăng ký:", err);
            return res.status(500).json({ error: "Lỗi server" });
        }
        res.json({ count: result[0].count }); // Chỗ này rất quan trọng
    });
});

// Upload tài liệu và lưu vào bảng `documents`
app.post("/upload-document", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Không có file nào được upload." });
    }

    const fileUrl = `http://localhost:3001/uploads/${req.file.filename}`;

    // Chuyển tên file từ latin1 sang utf8
    const originalNameBuffer = Buffer.from(req.file.originalname, 'latin1');
    const originalName = iconv.decode(originalNameBuffer, 'utf8');

    const extension = path.extname(originalName).replace(".", ""); // ex: pdf

    // Nhận thông tin bổ sung từ req.body
    const { course, doc_author } = req.body;

    const sql = `INSERT INTO documents (course, title, file_url, upload_date, type_doc, doc_author) VALUES (?, ?, ?, NOW(), ?, ?)`;
    const values = [course, originalName, fileUrl, extension, doc_author || "admin"];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi chèn vào bảng documents:", err);
            return res.status(500).json({ error: "Lỗi server khi lưu thông tin tài liệu." });
        }

        res.json({
            message: "Upload và lưu tài liệu thành công!",
            file_url: fileUrl,
            doc_id: result.insertId
        });
    });
});

app.get("/documents/:course_id", (req, res) => {
    const courseId = req.params.course_id;

    const query = `SELECT doc_id, title, file_url, upload_date, type_doc, doc_author FROM documents WHERE course = ?`;
    db.query(query, [courseId], (err, result) => {
        if (err) {
            console.error("Lỗi truy vấn:", err);
            return res.status(500).json({ error: "Lỗi server" });
        }
        res.json(result);
    });
});

// file JSON suggest data
app.get("/search-suggestions", (req, res) => {
    const filePath = path.join(__dirname, "data", "search_suggest.json");

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            console.error("ERR-reading JSON:", err);
            return res.status(500).json({ error: "Không đọc được file gợi ý" });
        }

        const suggestions = JSON.parse(data);
        res.json(suggestions);
    });
});

app.get("/search-match", (req, res) => {
    const { q } = req.query;
    const query = q?.toLowerCase();

    const filePath = path.join(__dirname, "data", "search_suggest.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) return res.status(500).json({ error: "Không đọc được gợi ý" });

        const suggestions = JSON.parse(data);
        const filtered = suggestions.filter(item =>
            item.text.some(t => t.toLowerCase().includes(query))
        );

        res.json(filtered);
    });
});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});