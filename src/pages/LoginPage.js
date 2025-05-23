import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import hustLogo from "../assets/images/logo_hust_heading.png"; 

export default function LoginPage({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formValid, setFormValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isValid = username.trim() !== "" && password.trim() !== "";
        setFormValid(isValid);
    }, [username, password]);

    const handleLogin = async (e) => {
        e.preventDefault();  // Ngừng việc gửi form mặc định

        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
    
            const data = await response.json();
            console.log("Dữ liệu nhận được từ server:", data);

            if (data.success) {
                // Lưu tất cả dữ liệu người dùng vào localStorage
                setUser(data.userData);
                navigate("/");  // Điều hướng về trang chính
            } else {
                alert("Đăng nhập thất bại: " + data.message);
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    };
    

    return(
        <div className="fullPageLogin">
            <div className="branding">
                <div className="branding-bgr"></div>
            </div>
            <div className="contentWrapper">
                <div className="content">
                    <div className="header_content">
                        <img src={hustLogo} alt="HUST Logo" className="hess-logo" height="50px" />
                    </div>

                    <div className="workArea">
                        <div className="loginArea">
                            <div className="loginMessage">Đăng nhập Hệ thống hỗ trợ Cơ sở và Cốt lõi ngành</div>
                            <form method="post" id="loginForm" onSubmit={handleLogin}>
                                <div className="formArea">
                                    <div className="usernameData">
                                        <label id="usernameDataLabel">Nhập mã số sinh viên</label>
                                        <input  id="usernameDataInput" 
                                                name="username" 
                                                placeholder="Vui lòng nhập mã số sinh viên"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required></input>
                                    </div>

                                    <div className="passwordData">
                                        <label id="passwordDataLabel">Nhập mật khẩu</label>
                                        <input  id="passwordDataInput" 
                                                name="password" 
                                                type="password" 
                                                placeholder="Vui lòng nhập mật khẩu"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required></input>
                                    </div>

                                    <div className="btn_login">
                                        <div className="form_login_btn">
                                            <button id="idBtnLogin" className="form_btn" type="submit" disabled={!formValid}>Đăng nhập</button>
                                        </div>
                                    </div>

                                    <div className="txt1">
                                        <span> Chưa có tài khoản? </span>
                                        <a onClick={() => navigate("/signin")}>Đăng ký</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}