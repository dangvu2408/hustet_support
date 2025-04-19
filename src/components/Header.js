import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import hustLogo from "../assets/images/hust.png"; 

function Header() {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false); // Khai báo state cho dropdown
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
      if (showDropdown) {
        setShowDropdown(false);
      } else {
        setDropdownVisible(true);
        setShowDropdown(true);
      }
    };

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);  // dòng gây lỗi nếu storedUser là undefined hoặc chuỗi sai định dạng
          setUser(parsedUser);
        } catch (error) {
          console.error("Lỗi parse JSON:", error);
        }
      }
    }, []);

    return (
        <header id="hess-header">
            <div className="left-header-section">
                <a href="/">
                    <div className="left-section">
                        <div className="logo">
                            <img src={hustLogo} alt="HUST Logo" className="hess-logo" height="100px" />
                        </div>
                        <div className="title">
                            <p className="bold-text">HỆ THỐNG HỖ TRỢ CƠ SỞ VÀ CỐT LÕI NGÀNH</p>
                            <p className="semi-bold-text">
                                ĐẠI HỌC BÁCH KHOA HÀ NỘI<br />
                                KHOA ĐIỆN TỬ - VIỄN THÔNG
                            </p>
                        </div>
                    </div>
                </a>
            </div>

            <div className="right-header-section">
                {user ? (
                  <div>
                    <button className="user-button" onClick={toggleDropdown}>
                      Xin chào, {user.fullname}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          marginLeft: "5px",
                          verticalAlign: "middle",
                          transition: "transform 0.3s ease",
                          transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)"
                        }}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    {dropdownVisible  && (
                      <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
                      <ul>
                        <li onClick={() => navigate("/profile")}>Thông tin cá nhân</li>
                        <li onClick={() => navigate("/change-password")}>Đổi mật khẩu</li>
                        <li onClick={() => navigate("/change-password")}>Khóa học của tôi</li>
                        <li
                          onClick={() => {
                            localStorage.removeItem("user");
                            navigate("/login", { replace: true });
                          }}
                        >Đăng xuất</li>
                      </ul>
                    </div>
                    )}
                  </div>
                ) : (
                    <button type="button" className="btn-login-header" onClick={() => navigate("/login")}>ĐĂNG NHẬP</button>
                )}
            </div>
        </header>
    );
}

export default Header;
