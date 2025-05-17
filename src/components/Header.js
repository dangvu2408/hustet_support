import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import hustLogo from "../assets/images/hust.png"; 
import Basic from "./Basic";
import Plus from "./Plus";
import Premium from "./Premium";
import Logo from '../assets/images/blank_avatar.jpg';

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
                const parsedUser = JSON.parse(storedUser);  
                setUser(parsedUser);
                console.log("User loaded:", parsedUser);
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
                <form className="search">
                    <div className="search_container">
                        <button className="search_button" tabIndex={0}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#757575" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>
                        <div className="input_wrapper">
                            <input type="text" className="form_search_control" placeholder="Tìm kiếm khóa học, người dùng"></input>
                        </div>
                    </div>
                </form>
                {user ? (
                    <div style={{height: '40px'}}>
                        <button className="user-button" onClick={toggleDropdown}>
                            <figure className="image_btn_avt">
                                <img src={Logo}></img>
                            </figure>
                        </button>
                        {dropdownVisible  && (
                            <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
                                <ul>
                                    <li className="user_setting_account">
                                        <div className="account_info">
                                            <div className="acc_avt_frame">
                                                <figure className="image_acc_avt">
                                                    <img src={Logo}></img>
                                                </figure>
                                            </div>
                                            <div className="acc_right">
                                                <p>{user.fullname}</p>
                                                <Plus/>
                                            </div>
                                        </div>
                                    </li>
                                    <div className="line_separator"></div>
                                    <li onClick={() => navigate("/profile")}>Thông tin cá nhân</li>
                                    <li onClick={() => navigate("/change-password")}>Đổi mật khẩu</li>
                                    <li onClick={() => navigate("/change-password")}>Khóa học của tôi</li>
                                    <li onClick={() => navigate("/setting")}>Cài đặt</li>
                                    <li
                                        onClick={() => {
                                            localStorage.removeItem("user");
                                            navigate("/login", { replace: true });
                                        }} >Đăng xuất</li>
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
