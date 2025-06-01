import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import hustLogo from "../assets/images/hust.png"; 
import Basic from "./Basic";
import Plus from "./Plus";
import Premium from "./Premium";
import Logo from '../assets/images/blank_avatar.jpg';
import Dialog from './dialog/CourseDialog';


function Header() {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false); // Khai báo state cho dropdown
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const[showDialog, setShowDialog] = useState(false);
    const openDialog = () => setShowDialog(true);
    const closeDialog = () => setShowDialog(false);

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        const isValid = oldPass.trim() !== "" && newPass.trim() !== "";
        setFormValid(isValid);
    }, [oldPass, newPass]);

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
            } catch (error) {
                console.error("ERR-3:", error);
            }
        }
    }, []);

    const handleChangePassword = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        try {
            const response = await fetch("http://localhost:3001/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: user.username,
                    oldPass,
                    newPass
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Đổi mật khẩu thành công. Vui lòng đăng nhập lại.");
                localStorage.removeItem("user");
                navigate("/login", { replace: true });
            } else {
                alert("Mật khẩu cũ sai. Vui lòng nhập lại.");
            }
        } catch (err) {
            console.error("Lỗi đổi mật khẩu:", err);
        }
    };


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
                                <img src={user?.avatar ? user.avatar : Logo}></img>
                            </figure>
                        </button>
                        {dropdownVisible  && (
                            <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
                                <ul>
                                    <li className="user_setting_account">
                                        <div className="account_info">
                                            <div className="acc_avt_frame">
                                                <figure className="image_acc_avt">
                                                    <img src={user?.avatar ? user.avatar : Logo} alt="User Avatar" />
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
                                    
                                    <li onClick={openDialog}>Đổi mật khẩu</li>
                                    
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
            <Dialog show={showDialog} onClose={closeDialog} title="Đổi mật khẩu">
                <div className="group_items_info">
                    <form method="post" id="loginForm" onSubmit={handleChangePassword}>
                        <div className="form_area__">
                            <div className="pass_update_field">
                                <label id="pass_label">Nhập mật khẩu cũ</label>
                                <input id="oldpass_input" name="password" type="password" placeholder="Nhập mật khẩu cũ" value={oldPass} onChange={(e) => setOldPass(e.target.value)} required></input>
                            </div>

                            <div className="pass_update_field">
                                <label id="pass_label">Nhập mật khẩu mới</label>
                                <input id="newpass_input" name="password" type="password" placeholder="Nhập mật khẩu mới" value={newPass} onChange={(e) => setNewPass(e.target.value)} required></input>
                            </div>

                            <div className="info_box_container update_box">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                <span>Đổi mật khẩu và đăng nhập lại</span>
                            </div>

                            <div className="btnupdate">
                                <div className="form_update_btn">
                                    <button id="idBtnUpdate" className="updateform_btn" type="submit" disabled={!formValid}>Đổi mật khẩu</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Dialog>
        </header>

        
    );
}

export default Header;
