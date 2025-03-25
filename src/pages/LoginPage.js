import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import hustLogo from "../assets/images/logo_hust_heading.png"; 

export default function LoginPage() {
    const navigate = useNavigate();

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
                            <div className="loginMessage">Đăng nhập vào Hệ thống hỗ trợ Cơ sở và Cốt lõi ngành</div>
                            <form method="post" id="loginForm" >
                                <div className="formArea">
                                    <div className="usernameData">
                                        <label id="usernameDataLabel">Nhập tên người dùng</label>
                                        <input id="usernameDataInput" name="username" type="email" placeholder="xyz@example.com"></input>
                                    </div>

                                    <div className="passwordData">
                                        <label id="passwordDataLabel">Nhập mật khẩu</label>
                                        <input id="passwordDataInput" name="password" type="password" placeholder="Vui lòng nhập mật khẩu"></input>
                                    </div>

                                    <div className="btn_login">
                                        <div className="form_login_btn">
                                            <button id="idBtnLogin" className="form_btn" disabled>Đăng nhập</button>
                                        </div>
                                    </div>

                                    <div className="txt1">
                                        <span> Hoặc đăng nhập bằng tài khoản Email của Đại học</span>
                                    </div>

                                    <div className="microsoft365">
                                        <a href=""></a>
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