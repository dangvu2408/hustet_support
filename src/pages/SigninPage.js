import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./SigninPage.css";
import hustLogo from "../assets/images/logo_hust_heading.png"; 

export default function SigninPage() {
    const navigate = useNavigate();

    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        const isValid =
        fullname.trim() !== "" &&
        username.trim() !== "" &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        password === confirmPassword;

        setFormValid(isValid);
    }, [fullname, username, password, confirmPassword]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/login"); 
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
                            <div className="loginMessage">Đăng ký Hệ thống hỗ trợ Cơ sở và Cốt lõi ngành</div>
                            <form method="post" id="loginForm" >
                                <div className="formArea">
                                    <div className="userFullnameData">
                                        <label className="userFullnameDataLabel">Nhập họ tên đầy đủ</label>
                                        <input  id="userFullnameDataInput" 
                                                name="fullname" 
                                                placeholder="Vui lòng nhập đầy đủ họ và tên" 
                                                value={fullname}
                                                onChange={(e) => setFullname(e.target.value)}
                                                required></input>
                                    </div>

                                    <div className="usernameData">
                                        <label className="usernameDataLabel">Mã số sinh viên</label>
                                        <input  id="usernameDataInput" 
                                                name="username" 
                                                placeholder="Vui lòng nhập mã số sinh viên" 
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required></input>
                                    </div>

                                    <div className="passwordData">
                                        <label className="passwordDataLabel">Nhập mật khẩu</label>
                                        <input  id="passwordDataInput" 
                                                name="password" 
                                                type="password" 
                                                placeholder="Vui lòng nhập mật khẩu" 
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required></input>
                                    </div>

                                    <div className="confirmPasswordData">
                                        <label id="confirmPasswordDataLabel">Xác nhận mật khẩu</label>
                                        <input  id="confirmPasswordDataInput" 
                                                name="password" 
                                                type="password" 
                                                placeholder="Vui lòng nhập lại mật khẩu" 
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required></input>
                                    </div>

                                    <div className="btn_login">
                                        <div className="form_login_btn">
                                            <button id="idBtnLogin"
                                                    className="form_btn"
                                                    type="submit"
                                                    disabled={!formValid}>Đăng ký</button>
                                        </div>
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